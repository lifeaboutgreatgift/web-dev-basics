/* ==========================================
   1. SETINTERVAL — Live Clock + Countdown
   ========================================== */

function updateClock() {
  const now  = new Date();

  // Live clock
  document.getElementById('clock').textContent =
    now.toLocaleTimeString('en-IN', { hour12: false });

  document.getElementById('clock-date').textContent =
    now.toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric',
      month: 'long', day: 'numeric'
    });

  // Countdown to midnight (next day = "next event")
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);

  const diff    = midnight - now;
  const hours   = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-hours').textContent   = String(hours).padStart(2, '0');
  document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}

// run once immediately then every second
updateClock();
setInterval(updateClock, 1000);

/* ==========================================
   2. INTERSECTIONOBSERVER — Scroll animations
   ========================================== */

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger animation — each card slightly delayed
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);

      // unobserve after animation — no need to watch anymore
      cardObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15 // fire when 15% of card is visible
});

// observe all cards
document.querySelectorAll('.animate-card').forEach(card => {
  cardObserver.observe(card);
});

/* ==========================================
   3. INTERSECTIONOBSERVER — Lazy loading images
   ========================================== */

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      const src = img.dataset.src; // get real URL from data-src

      img.src = src; // trigger actual load

      img.onload = () => {
        img.classList.add('loaded'); // fade in
        // hide placeholder
        img.previousElementSibling.style.opacity = '0';
      };

      imageObserver.unobserve(img); // stop watching — already loaded
    }
  });
}, {
  rootMargin: '200px' // start loading 200px before entering viewport
});

document.querySelectorAll('.lazy-img').forEach(img => {
  imageObserver.observe(img);
});

/* ==========================================
   4. INTERSECTIONOBSERVER — Infinite scroll
   ========================================== */

const feedNames = [
  'Aditi Sharma', 'Priya Patel', 'Rahul Gupta',
  'Sneha Reddy', 'Mohammed Ali', 'Anjali Singh',
  'Dev Mehta', 'Kavya Nair', 'Rohan Verma',
  'Zara Ahmed', 'Vikram Joshi', 'Aryan Sharma'
];

const feedActions = [
  'pushed a new commit', 'opened a pull request',
  'merged a branch', 'closed an issue',
  'starred a repo', 'forked a project',
  'reviewed some code', 'deployed to production'
];

let feedPage = 0;
let isLoading = false;

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function loadFeedItems() {
  if (isLoading) return;
  isLoading = true;

  // simulate network delay
  setTimeout(() => {
    const feed = document.getElementById('feed');

    for (let i = 0; i < 5; i++) {
      const name   = getRandomItem(feedNames);
      const action = getRandomItem(feedActions);
      const mins   = Math.floor(Math.random() * 60) + 1;

      const item = document.createElement('div');
      item.className = 'feed-item';
      item.innerHTML = `
        <div class="feed-avatar">${name[0]}</div>
        <div class="feed-text">
          <div class="feed-name">${name}</div>
          <div class="feed-meta">${action} · ${mins}m ago</div>
        </div>
      `;
      feed.appendChild(item);
    }

    feedPage++;
    isLoading = false;

    // stop after 5 pages
    if (feedPage >= 5) {
      sentinelObserver.unobserve(sentinel);
      document.getElementById('sentinel').style.display = 'none';
    }
  }, 800);
}

const sentinel = document.getElementById('sentinel');

const sentinelObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadFeedItems();
  }
}, {
  threshold: 1.0 // fire only when sentinel is fully visible
});

sentinelObserver.observe(sentinel);

// load first batch immediately
loadFeedItems();