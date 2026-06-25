const KEY = 'spaceMissions';

// ── Save missions to localStorage ──
export function saveMissions(missions) {
  localStorage.setItem(KEY, JSON.stringify(missions));
}

// ── Load missions from localStorage ──
export function loadMissions() {
  return JSON.parse(localStorage.getItem(KEY)) || [];
}

// ── Save leaderboard ──
export function saveLeaderboard(data) {
  localStorage.setItem('spaceLeaderboard', JSON.stringify(data));
}

// ── Load leaderboard ──
export function loadLeaderboard() {
  return JSON.parse(localStorage.getItem('spaceLeaderboard')) || {};
}