// ── main.js — pulls everything together ──
// This is the ONLY file index.html loads
// It imports from all 4 modules

import { planets, getPlanetById }          from './modules/planets.js';
import { createMission, completeMission,
         abortMission, getAllMissions,
         getActiveMissions, getSuccessfulMissions,
         getFailedMissions }               from './modules/missions.js';
import { saveLeaderboard, loadLeaderboard } from './modules/storage.js';
import { renderPlanets, renderMissions,
         renderLeaderboard, updateStats }  from './modules/ui.js';

// ── Leaderboard state ──
let leaderboard = loadLeaderboard();

// ── Re-render everything ──
function refresh() {
  const all      = getAllMissions();
  const active   = getActiveMissions();
  const success  = getSuccessfulMissions();
  const failed   = getFailedMissions();

  renderMissions(all, handleComplete, handleAbort);
  renderLeaderboard(leaderboard);
  updateStats(active.length, success.length, failed.length);
}

// ── Launch a mission ──
function handleLaunch(planet) {
  createMission(planet);
  refresh();
}

// ── Complete a mission ──
function handleComplete(id) {
  const mission = completeMission(id);
  if (!mission) return;

  if (mission.status === 'success') {
    leaderboard[mission.planetName] = (leaderboard[mission.planetName] || 0) + 1;
    saveLeaderboard(leaderboard);
  }

  refresh();
}

// ── Abort a mission ──
function handleAbort(id) {
  abortMission(id);
  refresh();
}

// ── Initial render ──
renderPlanets(planets, handleLaunch);
refresh();