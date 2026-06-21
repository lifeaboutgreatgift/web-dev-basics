const station = document.getElementById('station');

/* ==========================================
   CLOSURE FACTORY — makePowerBar()
   Each call creates one independent power bar.
   'power' is private — lives inside the closure.
   ========================================== */
function makePowerBar(name, color) {

  // Private state — trapped inside this closure
  let power = 0;

  // Build the DOM
  const card = document.createElement('div');
  card.className = 'power-card';
  card.innerHTML = `
    <div class="power-name">${name}</div>
    <div class="bar-track">
      <div class="bar-fill"></div>
    </div>
    <div class="bar-label">Power: <span class="power-value">0</span> / 100</div>
    <div class="btn-row">
      <button class="btn-charge">+ Charge</button>
      <button class="btn-drain">− Drain</button>
    </div>
  `;

  const fillEl      = card.querySelector('.bar-fill');
  const valueEl     = card.querySelector('.power-value');
  const chargeBtn   = card.querySelector('.btn-charge');
  const drainBtn    = card.querySelector('.btn-drain');

  // Set the bar color
  fillEl.style.background = color;

  // Update the UI to match current power
  // Closes over: power, fillEl, valueEl, chargeBtn, drainBtn
  function render() {
    fillEl.style.width        = `${power}%`;
    valueEl.textContent       = power;
    chargeBtn.disabled        = power >= 100;
    drainBtn.disabled         = power <= 0;
  }

  // Charge — closes over 'power'
  chargeBtn.addEventListener('click', () => {
    if (power < 100) {
      power += 10;
      render();
    }
  });

  // Drain — closes over 'power'
  drainBtn.addEventListener('click', () => {
    if (power > 0) {
      power -= 10;
      render();
    }
  });

  render(); // initial render

  return card;
}

/* ==========================================
   CREATE THREE INDEPENDENT BARS
   Each call = its own private 'power' variable
   Charging Shield does NOTHING to Speed or Attack
   ========================================== */
station.appendChild(makePowerBar("⚔️  Attack", "#ef4444"));
station.appendChild(makePowerBar("🛡️  Shield", "#3b82f6"));
station.appendChild(makePowerBar("⚡ Speed",  "#f5c842"));