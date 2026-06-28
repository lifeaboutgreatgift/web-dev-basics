import { fetchMovies }                    from './modules/api.js';
import { loadFavorites, saveFavorites }   from './modules/storage.js';
import { showLoading, hideLoading,
         showError, renderMovies,
         renderFavorites }                from './modules/ui.js';

const searchInput = document.getElementById("searchInput");
const searchBtn   = document.getElementById("searchBtn");

let favorites = loadFavorites();

// ── Handle fav button click ──
function handleFavClick(e) {
  if (!e.target.classList.contains("fav-btn")) return;

  const movieId      = e.target.dataset.id;
  const alreadyFaved = favorites.find(fav => fav.imdbID === movieId);

  if (alreadyFaved) {
    favorites = favorites.filter(fav => fav.imdbID !== movieId);
    e.target.textContent = "🤍";
  } else {
    const card  = e.target.closest(".movie-card");
    const title = card.querySelector("h3").textContent;
    const year  = card.querySelector("p").textContent;
    const poster = card.querySelector("img").src;

    favorites.push({ imdbID: movieId, Title: title, Year: year, Poster: poster });
    e.target.textContent = "❤️ Added!";
  }

  saveFavorites(favorites);
  renderFavorites(favorites, handleRemoveClick);
}

// ── Handle remove button click ──
function handleRemoveClick(e) {
  if (!e.target.classList.contains("remove-fav-btn")) return;

  const movieId = e.target.dataset.id;
  favorites     = favorites.filter(fav => fav.imdbID !== movieId);
  saveFavorites(favorites);
  renderFavorites(favorites, handleRemoveClick);
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
      renderMovies(data.Search, handleFavClick);
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

// ── Initial render ──
renderFavorites(favorites, handleRemoveClick);