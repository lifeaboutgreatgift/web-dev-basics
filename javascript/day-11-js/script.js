// ── Scoreboard State ──
let totalWins = 0;
let totalLosses = 0;
let vaultCount = 0;

const winCountEl  = document.getElementById('win-count');
const lossCountEl = document.getElementById('loss-count');
const container   = document.getElementById('vaults-container');
const addVaultBtn = document.getElementById('add-vault-btn');

function updateScoreboard() {
  winCountEl.textContent  = totalWins;
  lossCountEl.textContent = totalLosses;
}

/* ==========================================
   CLOSURE FACTORY — makeVault()
   Each call creates one completely private vault.
   secret, attemptsLeft, solved are trapped inside.
   Nobody outside can touch them — that's a closure.
   ========================================== */
function makeVault(id) {

  // ── Private state ──
  const secret     = Math.floor(Math.random() * 100) + 1;
  let attemptsLeft = 5;
  let solved       = false;

  // ── Build the DOM ──
  const card = document.createElement('div');
  card.className = 'vault-card';
  card.innerHTML = `
    <div class="vault-id">VAULT #${String(id).padStart(3, '0')}</div>
    <div class="vault-dial">🔒</div>
    <div class="attempts-bar">
      ${Array(5).fill('<span class="attempt-pip"></span>').join('')}
    </div>
    <div class="vault-feedback">Enter a number between 1 and 100</div>
    <div class="vault-input-row">
      <input class="vault-input" type="number" min="1" max="100" placeholder="Your guess..." />
      <button class="vault-guess-btn">TRY</button>
    </div>
    <div class="vault-result"></div>
  `;

  const dialEl     = card.querySelector('.vault-dial');
  const feedbackEl = card.querySelector('.vault-feedback');
  const inputEl    = card.querySelector('.vault-input');
  const guessBtn   = card.querySelector('.vault-guess-btn');
  const pips       = card.querySelectorAll('.attempt-pip');
  const resultEl   = card.querySelector('.vault-result');

  function renderPips() {
    pips.forEach((pip, i) => {
      pip.classList.toggle('used', i >= attemptsLeft);
    });
  }

  function lockVault() {
    inputEl.disabled  = true;
    guessBtn.disabled = true;
  }

  // handleGuess closes over: secret, attemptsLeft, solved
  // Every click remembers those variables — that's the closure!
  function handleGuess() {
    const guess = parseInt(inputEl.value);

    if (!guess || guess < 1 || guess > 100) {
      feedbackEl.textContent = 'Enter a number between 1 and 100.';
      feedbackEl.className   = 'vault-feedback';
      return;
    }

    if (guess !== secret) {
      attemptsLeft--;
      renderPips();

      card.classList.add('shake');
      card.addEventListener('animationend', () => card.classList.remove('shake'), { once: true });

      if (guess > secret) {
        feedbackEl.textContent = `⬇ Too high. ${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} left.`;
        feedbackEl.className   = 'vault-feedback high';
      } else {
        feedbackEl.textContent = `⬆ Too low. ${attemptsLeft} attempt${attemptsLeft !== 1 ? 's' : ''} left.`;
        feedbackEl.className   = 'vault-feedback low';
      }

      if (attemptsLeft === 0) {
        solved = true;
        lockVault();
        dialEl.textContent     = '💥';
        feedbackEl.textContent = `VAULT SEALED. The code was ${secret}.`;
        feedbackEl.className   = 'vault-feedback loss';
        card.classList.add('lost');
        totalLosses++;
        updateScoreboard();
      }

    } else {
      solved = true;
      lockVault();
      dialEl.textContent     = '🔓';
      feedbackEl.textContent = `CRACKED! The code was ${secret}.`;
      feedbackEl.className   = 'vault-feedback win';
      card.classList.add('won');
      resultEl.textContent   = `Solved in ${6 - attemptsLeft} guess${6 - attemptsLeft !== 1 ? 'es' : ''}.`;
      totalWins++;
      updateScoreboard();
    }

    inputEl.value = '';
  }

  guessBtn.addEventListener('click', handleGuess);
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleGuess();
  });

  return card;
}

// ── Add Vault Button ──
addVaultBtn.addEventListener('click', () => {
  vaultCount++;
  const newVault = makeVault(vaultCount);
  container.appendChild(newVault);
  newVault.querySelector('.vault-input').focus();
});