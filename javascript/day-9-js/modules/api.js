const API_KEY = "ec3b786f";

export async function fetchMovies(searchTerm) {
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`
  );
  const data = await response.json();
  return data;
}