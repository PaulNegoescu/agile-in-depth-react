import { StarWarsCard } from './StarWarsCard';

export default function MovieGrid({ movieResource }) {
  const movies = movieResource.read();

  return (
    <section className="grid grid-cols-3 gap-3">
      {movies?.map((movie) => (
        <StarWarsCard key={movie.title} data={movie} />
      ))}
    </section>
  );
}
