// ── House scoreboard state ──
const housePoints = {
  Gryffindor: 0,
  Slytherin:  0,
  Hufflepuff: 0,
  Ravenclaw:  0
};

function updateHouseScoreboard() {
  document.getElementById('gryffindor-score').textContent = `🦁 Gryffindor: ${housePoints.Gryffindor}`;
  document.getElementById('slytherin-score').textContent  = `🐍 Slytherin: ${housePoints.Slytherin}`;
  document.getElementById('hufflepuff-score').textContent = `🦡 Hufflepuff: ${housePoints.Hufflepuff}`;
  document.getElementById('ravenclaw-score').textContent  = `🦅 Ravenclaw: ${housePoints.Ravenclaw}`;
}

/* ==========================================
   BASE CLASS — Student
   Blueprint for every student enrolled
   ========================================== */
class Student {
  constructor(name, house) {
    this.name   = name;
    this.house  = house;
    this.points = 0;
  }

  addPoints(amount) {
    this.points          += amount;
    housePoints[this.house] += amount;
    updateHouseScoreboard();
    this.updateCard();
  }

  removePoints(amount) {
    this.points             = Math.max(0, this.points - amount);
    housePoints[this.house] = Math.max(0, housePoints[this.house] - amount);
    updateHouseScoreboard();
    this.updateCard();
  }

  updateCard() {
    if (this.pointsEl) {
      this.pointsEl.innerHTML = `${this.points} <span>pts</span>`;
    }
  }

  // Build and return the DOM card
  render() {
    const card = document.createElement('div');
    card.className = `student-card ${this.house}`;

    card.innerHTML = `
      <div class="student-name">${this.name}</div>
      <div class="student-meta">${this.house} · Student</div>
      <div class="student-points">0 <span>pts</span></div>
      <div class="card-btns">
        <button class="btn-add">+ 10 pts</button>
        <button class="btn-remove">− 10 pts</button>
      </div>
    `;

    this.pointsEl = card.querySelector('.student-points');

    card.querySelector('.btn-add').addEventListener('click', () => this.addPoints(10));
    card.querySelector('.btn-remove').addEventListener('click', () => this.removePoints(10));

    return card;
  }
}

/* ==========================================
   CHILD CLASS — Prefect (extends Student)
   Inherits everything from Student
   PLUS: badge + ability to give detention
   ========================================== */
class Prefect extends Student {
  constructor(name, house) {
    super(name, house); // call Student's constructor first
    this.detentionsGiven = 0;
  }

  giveDetention() {
    this.detentionsGiven++;
    alert(`${this.name} issued detention #${this.detentionsGiven}! ⚡`);
  }

  // Override render() to add prefect-specific UI
  render() {
    const card = document.createElement('div');
    card.className = `student-card ${this.house}`;

    card.innerHTML = `
      <div class="prefect-badge">PREFECT</div>
      <div class="student-name">${this.name}</div>
      <div class="student-meta">${this.house} · Prefect</div>
      <div class="student-points">0 <span>pts</span></div>
      <div class="card-btns">
        <button class="btn-add">+ 10 pts</button>
        <button class="btn-remove">− 10 pts</button>
        <button class="btn-detention">Give Detention</button>
      </div>
    `;

    this.pointsEl = card.querySelector('.student-points');

    card.querySelector('.btn-add').addEventListener('click', () => this.addPoints(10));
    card.querySelector('.btn-remove').addEventListener('click', () => this.removePoints(10));
    card.querySelector('.btn-detention').addEventListener('click', () => this.giveDetention());

    return card;
  }
}

/* ==========================================
   ENROLL BUTTON
   ========================================== */
const registry   = document.getElementById('registry');
const nameInput  = document.getElementById('name-input');
const houseSelect = document.getElementById('house-select');
const roleSelect  = document.getElementById('role-select');
const enrollBtn   = document.getElementById('enroll-btn');

enrollBtn.addEventListener('click', () => {
  const name  = nameInput.value.trim();
  const house = houseSelect.value;
  const role  = roleSelect.value;

  if (!name) {
    alert('Enter a student name!');
    return;
  }

  // Create the right class based on role
  const student = role === 'prefect'
    ? new Prefect(name, house)
    : new Student(name, house);

  registry.appendChild(student.render());
  nameInput.value = '';
  nameInput.focus();
});