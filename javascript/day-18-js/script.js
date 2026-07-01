/* ==========================================
   DEBOUNCE — waits until user stops
   Returns a new function that delays calling fn
   ========================================== */
function debounce(fn, delay) {
  let timer; // private — closed over

  return function(...args) {
    clearTimeout(timer);          // cancel previous timer
    timer = setTimeout(() => {    // start fresh timer
      fn(...args);                // only fires after delay
    }, delay);
  };
}

/* ==========================================
   THROTTLE — fires at most once per limit
   ========================================== */
function throttle(fn, limit) {
  let lastCall = 0; // private — closed over

  return function(...args) {
    const now = Date.now();

    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

/* ==========================================
   DEMO 1 — DEBOUNCE — Live Search
   ========================================== */
const searchInput    = document.getElementById('search-input');
const searchStatus   = document.getElementById('search-status');
const resultsEl      = document.getElementById('results');
const keystrokeCount = document.getElementById('keystroke-count');
const apiCount       = document.getElementById('api-count');

// fake user database
const users = [
  'Afroj Khan', 'Aryan Sharma', 'Priya Patel',
  'Mohammed Ali', 'Sneha Reddy', 'Rahul Gupta',
  'Anjali Singh', 'Dev Mehta', 'Kavya Nair',
  'Rohan Verma', 'Zara Ahmed', 'Vikram Joshi'
];

let keystrokes = 0;
let apiCalls   = 0;

// the actual search function — expensive, should not fire on every keystroke
function searchUsers(query) {
  apiCalls++;
  apiCount.textContent = apiCalls;
  searchStatus.textContent = `> API called with: "${query}"`;

  resultsEl.innerHTML = '';

  if (!query) return;

  const matches = users.filter(user =>
    user.toLowerCase().includes(query.toLowerCase())
  );

  if (matches.length === 0) {
    resultsEl.innerHTML = '<p style="color:#64748b;font-size:0.85rem">No users found</p>';
    return;
  }

  matches.forEach(user => {
    const item = document.createElement('div');
    item.className = 'result-item';
    item.innerHTML = `
      <div class="result-avatar">${user[0]}</div>
      <span>${user}</span>
    `;
    resultsEl.appendChild(item);
  });
}

// wrap searchUsers in debounce — now it only fires 500ms after typing stops
const debouncedSearch = debounce(searchUsers, 500);

searchInput.addEventListener('input', () => {
  keystrokes++;
  keystrokeCount.textContent = keystrokes;
  searchStatus.textContent = '> Waiting for you to stop typing...';

  debouncedSearch(searchInput.value);
});

/* ==========================================
   DEMO 2 — THROTTLE — Scroll progress bar
   ========================================== */
const progressBar     = document.getElementById('progress-bar');
const scrollRawEl     = document.getElementById('scroll-raw');
const scrollThrottled = document.getElementById('scroll-throttled');

let scrollRaw       = 0;
let scrollThrottles = 0;

function updateProgress() {
  scrollThrottles++;
  scrollThrottled.textContent = scrollThrottles;

  const scrollTop    = window.scrollY;
  const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;

  progressBar.style.width = scrollPercent + '%';
}

const throttledScroll = throttle(updateProgress, 200);

window.addEventListener('scroll', () => {
  scrollRaw++;
  scrollRawEl.textContent = scrollRaw;
  throttledScroll();
});

/* ==========================================
   DEMO 3 — THROTTLE — Mouse tracker
   ========================================== */
const trackerBox      = document.getElementById('tracker-box');
const cursorDot       = document.getElementById('cursor-dot');
const mouseRawEl      = document.getElementById('mouse-raw');
const mouseThrottledEl = document.getElementById('mouse-throttled');

let mouseRaw       = 0;
let mouseThrottles = 0;

function updateCursor(e) {
  mouseThrottles++;
  mouseThrottledEl.textContent = mouseThrottles;

  const rect = trackerBox.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  cursorDot.style.left    = x + 'px';
  cursorDot.style.top     = y + 'px';
  cursorDot.style.opacity = '1';
}

const throttledMouse = throttle(updateCursor, 200);

trackerBox.addEventListener('mousemove', (e) => {
  mouseRaw++;
  mouseRawEl.textContent = mouseRaw;
  throttledMouse(e);
});

trackerBox.addEventListener('mouseleave', () => {
  cursorDot.style.opacity = '0';
});