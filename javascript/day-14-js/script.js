// ── Terminal Logger ──
const terminal    = document.getElementById('terminal');
const statusBadge = document.getElementById('status-badge');

function log(message, type = 'default') {
  const line = document.createElement('p');
  line.className = `terminal-line ${type}`;
  line.textContent = `> ${message}`;
  terminal.appendChild(line);
  terminal.scrollTop = terminal.scrollHeight;
}

function setStatus(text, type) {
  statusBadge.textContent = text;
  statusBadge.className   = `status-badge ${type}`;
}

/* ==========================================
   CUSTOM ERROR CLASSES
   These extend the built-in Error class
   ========================================== */
class NetworkError extends Error {
  constructor(message) {
    super(message);          // call Error's constructor
    this.name = 'NetworkError';
    this.severity = 'HIGH';
  }
}

class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    this.severity = 'CRITICAL';
  }
}

class DataError extends Error {
  constructor(message) {
    super(message);
    this.name = 'DataError';
    this.severity = 'MEDIUM';
  }
}

/* ==========================================
   MISSION 01 — Safe Crack (try/catch)
   ========================================== */
document.getElementById('btn-safe').addEventListener('click', () => {
  const code = parseInt(document.getElementById('safe-code').value);

  try {
    log('Attempting to crack safe...', 'info');

    if (!code || code < 1 || code > 10) {
      throw new Error('Invalid code. Must be between 1 and 10.');
    }

    const secretCode = Math.floor(Math.random() * 10) + 1;

    if (code !== secretCode) {
      throw new Error(`Wrong code! Safe remains locked. Hint: try ${secretCode}`);
    }

    log('Safe cracked! Contents secured. 💰', 'success');
    setStatus('SUCCESS', 'success');

  } catch (err) {
    log(`FAILED: ${err.message}`, 'error');
    setStatus('COMPROMISED', 'error');
  }
});

/* ==========================================
   MISSION 02 — Data Intercept (fetch + async/await + try/catch)
   ========================================== */
document.getElementById('btn-fetch').addEventListener('click', async () => {
  try {
    log('Intercepting data stream...', 'info');
    setStatus('INTERCEPTING', 'warning');

    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');

    if (!response.ok) {
      throw new NetworkError(`Server responded with ${response.status}`);
    }

    const data = await response.json();
    log(`Target identified: ${data.name} — ${data.email}`, 'success');
    log(`Location: ${data.address.city}`, 'success');
    setStatus('DATA SECURED', 'success');

  } catch (err) {
    if (err instanceof NetworkError) {
      log(`NETWORK BREACH: ${err.message} [Severity: ${err.severity}]`, 'error');
    } else {
      log(`INTERCEPT FAILED: ${err.message}`, 'error');
    }
    setStatus('FAILED', 'error');
  }
});

/* ==========================================
   MISSION 03 — Custom Errors (instanceof checks)
   ========================================== */
document.getElementById('btn-threat').addEventListener('click', () => {
  const threat = document.getElementById('threat-select').value;

  try {
    log(`Triggering ${threat} threat...`, 'warning');

    if (threat === 'network') {
      throw new NetworkError('Firewall breach detected on port 443');
    } else if (threat === 'auth') {
      throw new AuthError('Biometric scan failed — identity unverified');
    } else if (threat === 'data') {
      throw new DataError('Payload corrupted during transmission');
    }

  } catch (err) {
    // instanceof lets us handle different errors differently
    if (err instanceof AuthError) {
      log(`🚨 ${err.name} [${err.severity}]: ${err.message}`, 'error');
      setStatus('LOCKDOWN', 'error');
    } else if (err instanceof NetworkError) {
      log(`📡 ${err.name} [${err.severity}]: ${err.message}`, 'warning');
      setStatus('REROUTING', 'warning');
    } else if (err instanceof DataError) {
      log(`💾 ${err.name} [${err.severity}]: ${err.message}`, 'warning');
      setStatus('CORRUPTED', 'warning');
    }
  }
});

/* ==========================================
   MISSION 04 — Finally clause
   Finally ALWAYS runs — success or failure
   Use it for cleanup (hide spinner, reset UI etc)
   ========================================== */
document.getElementById('btn-finally').addEventListener('click', async () => {
  log('Executing mission sequence...', 'info');
  setStatus('EXECUTING', 'warning');

  try {
    log('Step 1: Disabling alarms...', 'info');
    await new Promise(resolve => setTimeout(resolve, 800));

    log('Step 2: Accessing vault...', 'info');
    await new Promise(resolve => setTimeout(resolve, 800));

    // 50% chance mission succeeds
    if (Math.random() > 0.5) {
      throw new Error('Guard patrol detected — abort mission!');
    }

    log('Step 3: Extraction complete! 💰', 'success');
    setStatus('COMPLETE', 'success');

  } catch (err) {
    log(`MISSION ABORT: ${err.message}`, 'error');
    setStatus('ABORTED', 'error');

  } finally {
    // This ALWAYS runs no matter what
    log('Step 4: Wiping evidence... [finally block]', 'info');
    log('All operatives stand down.', 'muted');
  }
});