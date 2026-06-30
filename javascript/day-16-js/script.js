const voterNameInput = document.getElementById('voter-name');
const candidatesEl   = document.getElementById('candidates');
const voterCountEl   = document.getElementById('voter-count');
const resetBtn       = document.getElementById('reset-btn');
const logEl          = document.getElementById('log');

/* ==========================================
   SET — tracks WHO has already voted
   Fast .has() check — no duplicates possible
   ========================================== */
const votedNames = new Set();

/* ==========================================
   MAP — tracks vote COUNT per candidate
   Keys are candidate names, values are numbers
   ========================================== */
const voteCounts = new Map([
  ['JavaScript', 0],
  ['Python', 0],
  ['MongoDB', 0],
  ['Lua', 0]
]);

function log(message, type = '') {
  const p = document.createElement('p');
  p.className = type;
  p.textContent = `> ${message}`;
  logEl.prepend(p);
}

function getTotalVotes() {
  // spread Map values into array, sum them
  return [...voteCounts.values()].reduce((sum, count) => sum + count, 0);
}

function renderCandidates() {
  candidatesEl.innerHTML = '';
  const total = getTotalVotes();

  // Map keeps insertion order — loop with for...of
  for (const [name, count] of voteCounts) {
    const percent = total === 0 ? 0 : Math.round((count / total) * 100);

    const card = document.createElement('div');
    card.className = 'candidate';
    card.innerHTML = `
      <div class="candidate-top">
        <span class="candidate-name">${name}</span>
        <span class="candidate-count">${count} votes (${percent}%)</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${percent}%"></div>
      </div>
      <button class="vote-btn" data-name="${name}">Vote</button>
    `;
    candidatesEl.appendChild(card);
  }

  voterCountEl.textContent = votedNames.size; // Set.size — like array.length
}

candidatesEl.addEventListener('click', (e) => {
  if (!e.target.classList.contains('vote-btn')) return;

  const voterName = voterNameInput.value.trim();
  const candidate  = e.target.dataset.name;

  if (!voterName) {
    log('Enter your name before voting.', 'error');
    return;
  }

  // SET.has() — O(1) check if this person already voted
  if (votedNames.has(voterName)) {
    log(`${voterName} has already voted! One vote per person.`, 'error');
    return;
  }

  // Record this voter — SET.add()
  votedNames.add(voterName);

  // Update vote count — MAP.get() then MAP.set()
  const currentCount = voteCounts.get(candidate);
  voteCounts.set(candidate, currentCount + 1);

  log(`${voterName} voted for ${candidate}!`, 'success');
  voterNameInput.value = '';
  renderCandidates();
});

resetBtn.addEventListener('click', () => {
  votedNames.clear(); // Set.clear()

  for (const name of voteCounts.keys()) {
    voteCounts.set(name, 0); // reset every count to 0
  }

  logEl.innerHTML = '';
  log('Vote booth has been reset.', 'success');
  renderCandidates();
});

renderCandidates();