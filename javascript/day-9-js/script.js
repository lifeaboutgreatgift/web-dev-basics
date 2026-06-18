const API_KEY = "ec3b786f"; // ← put your real key!

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("resultsContainer");
const loadingSpinner = document.getElementById("loadingSpinner");
const errorMessage = document.getElementById("errorMessage");

async function searchMovies(searchTerm) {
    // show loading, hide error
    loadingSpinner.classList.remove("hidden");
    errorMessage.classList.add("hidden");
    resultsContainer.innerHTML = "";

    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
        const data = await response.json();

        loadingSpinner.classList.add("hidden");

        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            errorMessage.textContent = data.Error || "No movies found!";
            errorMessage.classList.remove("hidden");
        }
    } catch (error) {
        loadingSpinner.classList.add("hidden");
        errorMessage.textContent = "Something went wrong. Check your internet connection!";
        errorMessage.classList.remove("hidden");
        console.error("Fetch error:", error);
    }
}

function displayMovies(movies) {
    resultsContainer.innerHTML = "";

    movies.forEach(movie => {
        const card = document.createElement("div");
        card.classList.add("movie-card");

        const posterUrl = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200x280?text=No+Image";

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
}

searchBtn.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === "") return;
    searchMovies(searchTerm);
});

searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") searchBtn.click();
});

// Load existing favorites from localStorage (or empty array if none)
let favorites = JSON.parse(localStorage.getItem("movieFavorites")) || [];

resultsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("fav-btn")) {
        const movieId = e.target.dataset.id;

        // Check if this movie is ALREADY in favorites
        const alreadyFavorited = favorites.find(fav => fav.imdbID === movieId);

        if (alreadyFavorited) {
            // Remove it (toggle OFF)
            favorites = favorites.filter(fav => fav.imdbID !== movieId);
            e.target.textContent = "🤍 Add to Favorites";
        } else {
            // Find the FULL movie object from the last search results
            // We need to find it from the card's data!
            const card = e.target.closest(".movie-card");
            const title = card.querySelector("h3").textContent;
            const year = card.querySelector("p").textContent;
            const poster = card.querySelector("img").src;

            favorites.push({
                imdbID: movieId,
                Title: title,
                Year: year,
                Poster: poster
            });
            e.target.textContent = "❤️ Added!";
        }

        // Save updated favorites to localStorage
        localStorage.setItem("movieFavorites", JSON.stringify(favorites));
    }
});

// a function to render favorites: 

const favoritesContainer = document.getElementById("favoritesContainer");

function renderFavorites() {
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
}

// Call this once when page loads, to show saved favorites!
renderFavorites();