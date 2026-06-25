// ── Planet Data ──
// exported as named export — other files can import this array
export const planets = [
  {
    id: 'mars',
    name: 'Mars',
    emoji: '🔴',
    distance: '54.6M km',
    temperature: '-60°C',
    difficulty: 'MEDIUM',
    crew: 4
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    emoji: '🟠',
    distance: '628M km',
    temperature: '-110°C',
    difficulty: 'HARD',
    crew: 6
  },
  {
    id: 'saturn',
    name: 'Saturn',
    emoji: '🪐',
    distance: '1.2B km',
    temperature: '-140°C',
    difficulty: 'HARD',
    crew: 8
  },
  {
    id: 'venus',
    name: 'Venus',
    emoji: '🟡',
    distance: '38.2M km',
    temperature: '465°C',
    difficulty: 'EASY',
    crew: 2
  },
  {
    id: 'neptune',
    name: 'Neptune',
    emoji: '🔵',
    distance: '4.3B km',
    temperature: '-200°C',
    difficulty: 'EXTREME',
    crew: 10
  },
  {
    id: 'mercury',
    name: 'Mercury',
    emoji: '⚫',
    distance: '77M km',
    temperature: '430°C',
    difficulty: 'MEDIUM',
    crew: 3
  }
];

// ── Helper functions ──
export function getPlanetById(id) {
  return planets.find(p => p.id === id);
}

export function getSuccessRate(difficulty) {
  const rates = {
    EASY:    0.9,
    MEDIUM:  0.7,
    HARD:    0.5,
    EXTREME: 0.3
  };
  return rates[difficulty] || 0.5;
}