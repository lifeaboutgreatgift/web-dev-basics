import { getSuccessRate } from './planets.js';

let missions = [];
let missionCounter = 1;

// ── Create a new mission ──
export function createMission(planet) {
  const mission = {
    id:        missionCounter++,
    name:      `Mission ${String(missionCounter).padStart(3, '0')}`,
    planetId:  planet.id,
    planetName: planet.name,
    planetEmoji: planet.emoji,
    status:    'active',
    launchedAt: new Date().toLocaleTimeString(),
    successRate: getSuccessRate(planet.difficulty)
  };

  missions.push(mission);
  return mission;
}

// ── Complete a mission (success or fail based on difficulty) ──
export function completeMission(id) {
  const mission = missions.find(m => m.id === id);
  if (!mission) return null;

  const succeeded = Math.random() < mission.successRate;
  mission.status  = succeeded ? 'success' : 'failed';
  return mission;
}

// ── Abort a mission ──
export function abortMission(id) {
  const mission = missions.find(m => m.id === id);
  if (!mission) return null;
  mission.status = 'failed';
  return mission;
}

// ── Getters ──
export function getAllMissions()    { return missions; }
export function getActiveMissions(){ return missions.filter(m => m.status === 'active'); }
export function getSuccessfulMissions() { return missions.filter(m => m.status === 'success'); }
export function getFailedMissions() { return missions.filter(m => m.status === 'failed'); }