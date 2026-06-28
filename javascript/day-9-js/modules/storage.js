const KEY = "movieFavorites";

export function loadFavorites() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(KEY, JSON.stringify(favorites));
}