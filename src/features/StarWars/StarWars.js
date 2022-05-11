import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { H1 } from '../../components/styled-components';
import { createResource } from '../../utils/createResource';

const MovieGrid = lazy(() => import('./MovieGrid'));

const promise = fetch('https://swapi.dev/api/films')
  .then((res) => {
    if (!res.ok) {
      throw new Error('API error');
    }
    return res.json();
  })
  .then((data) => data.results);

const movieResource = createResource(promise);

export default function StarWars() {
  return (
    <main>
      <H1>Star Wars Movies</H1>
      <ErrorBoundary
        fallback={
          <strong>
            Ooops! Something bad happened! Please try again later!
          </strong>
        }
      >
        <Suspense fallback={<strong>Loading ... from suspense ...</strong>}>
          <MovieGrid movieResource={movieResource} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
