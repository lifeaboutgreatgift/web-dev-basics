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

export function renderMovies(movies) {
  resultsContainer.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const hasPoster = movie.Poster !== "N/A";
    const posterUrl = hasPoster
      ? movie.Poster
      : "https://placehold.co/200x280?text=No+Image";

    // ← add poster button only when no poster
    const changePosterBtn = !hasPoster
      ? `<button class="change-poster-btn" data-id="${movie.imdbID}">🖼️ Add Poster</button>`
      : "";

    card.innerHTML = `
      <img src="${posterUrl}" alt="${movie.Title}"
           onerror="this.onerror=null; this.src='https://placehold.co/200x280?text=No+Image'">
      <div class="movie-card-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        ${changePosterBtn}
        <button class="fav-btn" data-id="${movie.imdbID}">🤍</button>
      </div>
    `;

    resultsContainer.appendChild(card);
  });
}

export function renderFavorites(favorites) {
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
           onerror="this.onerror=null; this.src='https://placehold.com/200x280?text=No+Image'">
      <div class="movie-card-info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button class="remove-fav-btn" data-id="${movie.imdbID}">🗑️ Remove</button>
      </div>
    `;

    favoritesContainer.appendChild(card);
  });

  
}