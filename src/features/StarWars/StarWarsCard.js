import { H1, Link, Paragraph } from '../../components/styled-components';

export function StarWarsCard({ data: movie }) {
  return (
    <article className="border-2 border-gray-200 rounded-sm pb-2">
      <img
        className="w-full rounded-t-sm"
        src="https://picsum.photos/300/200"
        alt={`${movie.title} Poster`}
      />
      <H1 type="secondary" className="mx-2">
        {movie.title}
      </H1>
      <Paragraph className="p-2">{movie.opening_crawl}</Paragraph>
      <Link to="/details" className="ml-2">
        More Details
      </Link>
    </article>
  );
}
