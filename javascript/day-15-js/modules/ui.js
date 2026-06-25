// ── UI rendering functions ──
// This file only handles DOM — no logic here

export function renderPlanets(planets, onLaunch) {
  const grid = document.getElementById('planets-grid');
  grid.innerHTML = '';

  planets.forEach(planet => {
    const card = document.createElement('div');
    card.className = 'planet-card';
    card.innerHTML = `
      <div class="planet-emoji">${planet.emoji}</div>
      <div class="planet-name">${planet.name}</div>
      <div class="planet-stats">
        📍 ${planet.distance}<br/>
        🌡️ ${planet.temperature}<br/>
        👥 Crew: ${planet.crew}<br/>
        ⚠️ ${planet.difficulty}
      </div>
      <button class="launch-btn">🚀 Launch Mission</button>
    `;

    card.querySelector('.launch-btn').addEventListener('click', () => {
      onLaunch(planet);
    });

    grid.appendChild(card);
  });
}

export function renderMissions(missions, onComplete, onAbort) {
  const list = document.getElementById('missions-list');
  list.innerHTML = '';

  if (missions.length === 0) {
    list.innerHTML = '<p class="empty-msg">No active missions. Launch one above.</p>';
    return;
  }

  missions.forEach(mission => {
    const item = document.createElement('div');
    item.className = `mission-item ${mission.status}`;
    item.innerHTML = `
      <div class="mission-info">
        <div class="mission-name">${mission.planetEmoji} ${mission.name} → ${mission.planetName}</div>
        <div class="mission-status">Launched: ${mission.launchedAt} · Status: ${mission.status.toUpperCase()}</div>
      </div>
      ${mission.status === 'active' ? `
        <div class="mission-btns">
          <button class="btn-complete">✅ Complete</button>
          <button class="btn-abort">❌ Abort</button>
        </div>
      ` : ''}
    `;

    if (mission.status === 'active') {
      item.querySelector('.btn-complete').addEventListener('click', () => onComplete(mission.id));
      item.querySelector('.btn-abort').addEventListener('click', () => onAbort(mission.id));
    }

    list.appendChild(item);
  });
}

export function renderLeaderboard(leaderboard) {
  const lb = document.getElementById('leaderboard');
  lb.innerHTML = '';

  const sorted = Object.entries(leaderboard)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (sorted.length === 0) {
    lb.innerHTML = '<p class="empty-msg">No successful missions yet.</p>';
    return;
  }

  const medals = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣'];

  sorted.forEach(([planet, count], index) => {
    const item = document.createElement('div');
    item.className = 'leaderboard-item';
    item.innerHTML = `
      <span class="lb-rank">${medals[index]}</span>
      <span class="lb-planet">${planet}</span>
      <span class="lb-count">${count} successful mission${count !== 1 ? 's' : ''}</span>
    `;
    lb.appendChild(item);
  });
}

export function updateStats(active, success, failed) {
  document.getElementById('active-count').textContent  = active;
  document.getElementById('success-count').textContent = success;
  document.getElementById('fail-count').textContent    = failed;
}