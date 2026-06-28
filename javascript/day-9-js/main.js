import { fetchMovies }                    from './modules/api.js';
import { loadFavorites, saveFavorites }   from './modules/storage.js';
import { showLoading, hideLoading,
         showError, renderMovies,
         renderFavorites }                from './modules/ui.js';

const searchInput = document.getElementById("searchInput");
const searchBtn   = document.getElementById("searchBtn");
const resultsContainer   = document.getElementById("resultsContainer");  
const favoritesContainer = document.getElementById("favoritesContainer");

let favorites = loadFavorites();
let lastSearchResults = []; // ← add this at top


// ── Handle fav button click ──
function handleFavClick(e) {

  // ── Handle change poster click ──
  if (e.target.classList.contains("change-poster-btn")) {
    const card   = e.target.closest(".movie-card");
    const imgEl  = card.querySelector("img");
    const newUrl = prompt("Enter image URL for this movie:");

    if (newUrl) {
      imgEl.src = newUrl;

      // update in lastSearchResults too
      const movieId = e.target.dataset.id;
      const movie   = lastSearchResults.find(m => m.imdbID === movieId);
      if (movie) movie.Poster = newUrl;
    }
    return; // stop here — don't run fav logic
  }

  // ── Handle fav button click ──
  if (!e.target.classList.contains("fav-btn")) return;

  const movieId      = e.target.dataset.id;
  const alreadyFaved = favorites.find(fav => fav.imdbID === movieId);

  if (alreadyFaved) {
    favorites = favorites.filter(fav => fav.imdbID !== movieId);
    e.target.textContent = "🤍";
  } else {
    const movie = lastSearchResults.find(m => m.imdbID === movieId);

    favorites.push({
      imdbID: movie.imdbID,
      Title:  movie.Title,
      Year:   movie.Year,
      Poster: movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/200x280?text=No+Image"
    });
    e.target.textContent = "❤️ Added!";
  }

  saveFavorites(favorites);
  renderFavorites(favorites);
}

// ── Handle remove button click ──
function handleRemoveClick(e) {
  if (!e.target.classList.contains("remove-fav-btn")) return;

  const movieId = e.target.dataset.id;
  favorites     = favorites.filter(fav => fav.imdbID !== movieId);
  saveFavorites(favorites);
  renderFavorites(favorites);
}

// ── Search ──
async function handleSearch() {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) return;

  showLoading();

  try {
    const data = await fetchMovies(searchTerm);
    hideLoading();

    if (data.Response === "True") {
      lastSearchResults = data.Search;
      renderMovies(data.Search);
    } else {
      showError(data.Error || "No movies found!");
    }
  } catch (err) {
    hideLoading();
    showError("Something went wrong. Check your connection!");
  }
}

// ── Events ──
searchBtn.addEventListener("click", handleSearch);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleSearch();
});

resultsContainer.addEventListener("click", handleFavClick);
favoritesContainer.addEventListener("click", handleRemoveClick);

// ── Initial render ──
renderFavorites(favorites);