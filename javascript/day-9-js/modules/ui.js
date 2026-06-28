const resultsContainer  = document.getElementById("resultsContainer");
const favoritesContainer = document.getElementById("favoritesContainer");
const loadingSpinner    = document.getElementById("loadingSpinner");
const errorMessage      = document.getElementById("errorMessage");

export function showLoading() {
  loadingSpinner.classList.remove("hidden");
  errorMessage.classList.add("hidden");
  resultsContainer.innerHTML = "";
}

export function hideLoading() {
  loadingSpinner.classList.add("hidden");
}

export function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

export function renderMovies(movies, onFavClick) {
  resultsContainer.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const posterUrl = movie.Poster !== "N/A"
      ? movie.Poster
      : "https://via.placeholder.com/200x280?text=No+Image";

    card.innerHTML = `
      <img src="${posterUrl}" alt="${movie.Title}"
           onerror="this.src='https://via.placeholder.com/200x280?text=No+Image'">
      <div class="movie-card-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button class="fav-btn" data-id="${movie.imdbID}">🤍</button>
      </div>
    `;

    resultsContainer.appendChild(card);
  });

  resultsContainer.addEventListener("click", onFavClick);
}

export function renderFavorites(favorites, onRemoveClick) {
  favoritesContainer.innerHTML = "";

  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>No favorites yet! Search and add some 🤍</p>";
    return;
  }

  favorites.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}"
           onerror="this.src='https://via.placeholder.com/200x280?text=No+Image'">
      <div class="movie-card-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button class="remove-fav-btn" data-id="${movie.imdbID}">🗑️ Remove</button>
      </div>
    `;

    favoritesContainer.appendChild(card);
  });

  favoritesContainer.addEventListener("click", onRemoveClick);
}