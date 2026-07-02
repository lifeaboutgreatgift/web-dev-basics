/* ==========================================
   VISUAL HELPERS
   Add/remove items from the diagram boxes
   ========================================== */
const callStackEl    = document.getElementById('call-stack');
const microtaskEl    = document.getElementById('microtask-queue');
const callbackEl     = document.getElementById('callback-queue');
const webApiEl       = document.getElementById('web-apis');
const outputLog      = document.getElementById('output-log');
const eventLoopCircle = document.getElementById('event-loop');

function addToBox(el, emptyEl, text, type) {
  emptyEl.style.display = 'none';
  const item = document.createElement('div');
  item.className = `stack-item item-${type}`;
  item.textContent = text;
  item.id = `item-${text.replace(/\s+/g, '-')}`;
  el.appendChild(item);
}

function removeFromBox(el, emptyEl, text) {
  const item = document.getElementById(`item-${text.replace(/\s+/g, '-')}`);
  if (item) item.remove();
  if (el.children.length === 0) emptyEl.style.display = 'block';
}

function log(message, type = 'sync') {
  const line = document.createElement('div');
  line.className = `log-line log-${type}`;
  line.textContent = `> ${message}`;
  outputLog.appendChild(line);
}

function logInfo(message) {
  const line = document.createElement('div');
  line.className = 'log-line log-info';
  line.textContent = message;
  outputLog.appendChild(line);
}

function clearAll() {
  callStackEl.innerHTML   = '';
  microtaskEl.innerHTML   = '';
  callbackEl.innerHTML    = '';
  webApiEl.innerHTML      = '';
  outputLog.innerHTML     = '';
  document.getElementById('call-stack-empty').style.display  = 'block';
  document.getElementById('microtask-empty').style.display   = 'block';
  document.getElementById('callback-empty').style.display    = 'block';
  document.getElementById('webapi-empty').style.display      = 'block';
}

function spinLoop() {
  eventLoopCircle.classList.add('active');
  setTimeout(() => eventLoopCircle.classList.remove('active'), 600);
}

// delay helper — pause between visual steps
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

/* ==========================================
   DEMO 1 — Basic Async (setTimeout)
   console.log("1") → setTimeout → console.log("3") → console.log("2")
   ========================================== */
async function runDemo1() {
  clearAll();
  logInfo('── Demo 1: setTimeout vs sync code ──');
  disableBtns(true);

  // Step 1 — main() on stack
  await wait(400);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'main()', 'sync');

  // Step 2 — console.log("1")
  await wait(600);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("1")', 'sync');
  await wait(500);
  log('1', 'sync');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("1")');

  // Step 3 — setTimeout goes to Web API
  await wait(600);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'setTimeout(...)', 'sync');
  await wait(500);
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'setTimeout(...)');
  addToBox(webApiEl, document.getElementById('webapi-empty'), 'timer (0ms)', 'webapi');

  // Step 4 — console.log("3")
  await wait(600);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("3")', 'sync');
  await wait(500);
  log('3', 'sync');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("3")');

  // Step 5 — main() done
  await wait(400);
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'main()');

  // Step 6 — timer completes, callback moves to queue
  await wait(600);
  removeFromBox(webApiEl, document.getElementById('webapi-empty'), 'timer (0ms)');
  addToBox(callbackEl, document.getElementById('callback-empty'), 'callback: log("2")', 'macro');

  // Step 7 — event loop moves callback to stack
  await wait(600);
  spinLoop();
  await wait(400);
  removeFromBox(callbackEl, document.getElementById('callback-empty'), 'callback: log("2")');
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("2")', 'macro');
  await wait(500);
  log('2', 'macro');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("2")');

  logInfo('Stack empty. Done!');
  disableBtns(false);
}

/* ==========================================
   DEMO 2 — Promise vs setTimeout
   Output: 1, 4, 3, 2
   ========================================== */
async function runDemo2() {
  clearAll();
  logInfo('── Demo 2: Promise (microtask) vs setTimeout (macrotask) ──');
  disableBtns(true);

  await wait(400);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'main()', 'sync');

  // log 1
  await wait(500);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("1")', 'sync');
  await wait(400);
  log('1', 'sync');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("1")');

  // setTimeout → Web API
  await wait(500);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'setTimeout(...)', 'sync');
  await wait(400);
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'setTimeout(...)');
  addToBox(webApiEl, document.getElementById('webapi-empty'), 'timer (0ms)', 'webapi');

  // Promise → microtask queue
  await wait(500);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'Promise.resolve()', 'sync');
  await wait(400);
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'Promise.resolve()');
  addToBox(microtaskEl, document.getElementById('microtask-empty'), '.then: log("3")', 'micro');

  // log 4
  await wait(500);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("4")', 'sync');
  await wait(400);
  log('4', 'sync');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("4")');

  // main done
  await wait(400);
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'main()');

  // timer → callback queue
  await wait(400);
  removeFromBox(webApiEl, document.getElementById('webapi-empty'), 'timer (0ms)');
  addToBox(callbackEl, document.getElementById('callback-empty'), 'callback: log("2")', 'macro');

  // event loop — microtask FIRST
  await wait(600);
  spinLoop();
  await wait(400);
  removeFromBox(microtaskEl, document.getElementById('microtask-empty'), '.then: log("3")');
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("3")', 'micro');
  await wait(500);
  log('3', 'micro');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("3")');

  // now callback queue
  await wait(600);
  spinLoop();
  await wait(400);
  removeFromBox(callbackEl, document.getElementById('callback-empty'), 'callback: log("2")');
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("2")', 'macro');
  await wait(500);
  log('2', 'macro');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("2")');

  logInfo('Microtask always runs before macrotask!');
  disableBtns(false);
}

/* ==========================================
   DEMO 3 — async/await
   Output: 1, 3, 2
   ========================================== */
async function runDemo3() {
  clearAll();
  logInfo('── Demo 3: async/await pauses and resumes ──');
  disableBtns(true);

  await wait(400);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'getData()', 'sync');

  await wait(500);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("1")', 'sync');
  await wait(400);
  log('1 — start', 'sync');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("1")');

  // await — pauses getData, hands control back
  await wait(500);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'await fetch()', 'sync');
  await wait(400);
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'await fetch()');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'getData()');
  addToBox(webApiEl, document.getElementById('webapi-empty'), 'fetch in progress', 'webapi');

  // synchronous code after getData() call runs
  await wait(500);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("3")', 'sync');
  await wait(400);
  log('3 — after calling getData', 'sync');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("3")');

  // fetch completes → microtask queue
  await wait(700);
  removeFromBox(webApiEl, document.getElementById('webapi-empty'), 'fetch in progress');
  addToBox(microtaskEl, document.getElementById('microtask-empty'), 'resume getData()', 'micro');

  // event loop resumes getData
  await wait(600);
  spinLoop();
  await wait(400);
  removeFromBox(microtaskEl, document.getElementById('microtask-empty'), 'resume getData()');
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'getData() resumed', 'micro');

  await wait(500);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("2")', 'micro');
  await wait(400);
  log('2 — after await', 'micro');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("2")');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'getData() resumed');

  logInfo('await pauses the function, not the whole program!');
  disableBtns(false);
}

/* ==========================================
   DEMO 4 — Promise chain
   Multiple microtasks queue up
   ========================================== */
async function runDemo4() {
  clearAll();
  logInfo('── Demo 4: Promise chain — microtasks queue up ──');
  disableBtns(true);

  await wait(400);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'main()', 'sync');

  // Promise chain setup
  await wait(500);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'Promise.resolve()', 'sync');
  await wait(400);
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'Promise.resolve()');
  addToBox(microtaskEl, document.getElementById('microtask-empty'), '.then: log("A")', 'micro');

  await wait(400);
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("sync")', 'sync');
  await wait(400);
  log('sync', 'sync');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'console.log("sync")');

  await wait(400);
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'main()');

  // microtask A runs, queues B
  await wait(500);
  spinLoop();
  await wait(400);
  removeFromBox(microtaskEl, document.getElementById('microtask-empty'), '.then: log("A")');
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'log("A")', 'micro');
  await wait(400);
  log('A', 'micro');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'log("A")');
  addToBox(microtaskEl, document.getElementById('microtask-empty'), '.then: log("B")', 'micro');

  // microtask B runs, queues C
  await wait(500);
  spinLoop();
  await wait(400);
  removeFromBox(microtaskEl, document.getElementById('microtask-empty'), '.then: log("B")');
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'log("B")', 'micro');
  await wait(400);
  log('B', 'micro');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'log("B")');
  addToBox(microtaskEl, document.getElementById('microtask-empty'), '.then: log("C")', 'micro');

  // microtask C runs
  await wait(500);
  spinLoop();
  await wait(400);
  removeFromBox(microtaskEl, document.getElementById('microtask-empty'), '.then: log("C")');
  addToBox(callStackEl, document.getElementById('call-stack-empty'), 'log("C")', 'micro');
  await wait(400);
  log('C', 'micro');
  removeFromBox(callStackEl, document.getElementById('call-stack-empty'), 'log("C")');

  logInfo('All microtasks finish before any macrotask runs!');
  disableBtns(false);
}

/* ==========================================
   DISABLE BUTTONS WHILE DEMO RUNS
   ========================================== */
function disableBtns(disabled) {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.disabled = disabled;
  });
}