/* ==========================================
   REGEX PATTERNS — each one explained
   ========================================== */

const patterns = {

  // Username: only letters, numbers, underscore
  // ^ = start, [a-zA-Z0-9_] = allowed chars
  // {3,20} = between 3 and 20 of them, $ = end
  username: /^[a-zA-Z0-9_]{3,20}$/,

  // Email: something@something.something
  // [^\s@]+ = one or more chars that aren't space or @
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // Phone: Indian format — 10 digits starting with 6,7,8 or 9
  // [6-9] = first digit must be 6-9
  // \d{9} = followed by exactly 9 more digits
  phone: /^[6-9]\d{9}$/,

  // Password sub-rules (each tested separately):
  passwordUpper:   /[A-Z]/,        // has uppercase
  passwordLower:   /[a-z]/,        // has lowercase
  passwordDigit:   /\d/,           // has digit
  passwordSpecial: /[!@#$%^&*(),.?":{}|<>]/, // has special char
  passwordLength:  /.{8,}/         // at least 8 chars
};

/* ==========================================
   FIELD HELPERS
   ========================================== */
function setValid(fieldId, message) {
  const field = document.getElementById(fieldId);
  field.classList.remove('invalid');
  field.classList.add('valid');
  field.querySelector('.msg').textContent  = message;
}

function setInvalid(fieldId, message) {
  const field = document.getElementById(fieldId);
  field.classList.remove('valid');
  field.classList.add('invalid');
  field.querySelector('.msg').textContent  = message;
}

function setNeutral(fieldId) {
  const field = document.getElementById(fieldId);
  field.classList.remove('valid', 'invalid');
  field.querySelector('.msg').textContent  = '';
}

/* ==========================================
   VALIDATORS — one per field
   ========================================== */

function validateUsername() {
  const val = document.getElementById('username').value;

  if (val === '') return setNeutral('field-username');

  if (val.length < 3) {
    return setInvalid('field-username', 'Username must be at least 3 characters');
  }
  if (val.length > 20) {
    return setInvalid('field-username', 'Username must be 20 characters or less');
  }
  if (!patterns.username.test(val)) {
    return setInvalid('field-username', 'Only letters, numbers and underscore allowed');
  }

  setValid('field-username', 'Username looks good!');
}

function validateEmail() {
  const val = document.getElementById('email').value;

  if (val === '') return setNeutral('field-email');

  if (!patterns.email.test(val)) {
    return setInvalid('field-email', 'Please enter a valid email address');
  }

  setValid('field-email', 'Email looks good!');
}

function validatePassword() {
  const val = document.getElementById('password').value;
  const fill  = document.getElementById('strength-fill');
  const label = document.getElementById('strength-label');

  if (val === '') {
    setNeutral('field-password');
    fill.style.width = '0%';
    label.textContent = '';
    return;
  }

  // Count how many rules pass
  const rules = [
    patterns.passwordLength.test(val),
    patterns.passwordUpper.test(val),
    patterns.passwordLower.test(val),
    patterns.passwordDigit.test(val),
    patterns.passwordSpecial.test(val)
  ];

  const passed = rules.filter(Boolean).length;

  // Strength bar
  const strengthMap = [
    { width: '0%',   color: '#e5e7eb', text: '' },
    { width: '20%',  color: '#ef4444', text: 'Very weak' },
    { width: '40%',  color: '#f97316', text: 'Weak' },
    { width: '60%',  color: '#eab308', text: 'Fair' },
    { width: '80%',  color: '#22c55e', text: 'Strong' },
    { width: '100%', color: '#16a34a', text: 'Very strong!' }
  ];

  fill.style.width      = strengthMap[passed].width;
  fill.style.background = strengthMap[passed].color;
  label.textContent     = strengthMap[passed].text;

  // Specific error messages
  if (!patterns.passwordLength.test(val)) {
    return setInvalid('field-password', 'Password must be at least 8 characters');
  }
  if (!patterns.passwordUpper.test(val)) {
    return setInvalid('field-password', 'Add at least one uppercase letter');
  }
  if (!patterns.passwordLower.test(val)) {
    return setInvalid('field-password', 'Add at least one lowercase letter');
  }
  if (!patterns.passwordDigit.test(val)) {
    return setInvalid('field-password', 'Add at least one number');
  }
  if (!patterns.passwordSpecial.test(val)) {
    return setInvalid('field-password', 'Add at least one special character (!@#$...)');
  }

  setValid('field-password', 'Strong password!');
}

function validatePhone() {
  const val = document.getElementById('phone').value;

  // phone is optional — empty is fine
  if (val === '') return setNeutral('field-phone');

  if (!patterns.phone.test(val)) {
    return setInvalid('field-phone', 'Enter a valid 10-digit Indian phone number');
  }

  setValid('field-phone', 'Phone number looks good!');
}

/* ==========================================
   LIVE VALIDATION — fires on every keystroke
   ========================================== */
document.getElementById('username').addEventListener('input', validateUsername);
document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('password').addEventListener('input', validatePassword);
document.getElementById('phone').addEventListener('input', validatePhone);

/* ==========================================
   FORM SUBMIT — validate all fields first
   ========================================== */
document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();

  validateUsername();
  validateEmail();
  validatePassword();
  validatePhone();

  // Check if all required fields are valid
  const allValid =
    document.getElementById('field-username').classList.contains('valid') &&
    document.getElementById('field-email').classList.contains('valid') &&
    document.getElementById('field-password').classList.contains('valid');

  if (allValid) {
    alert('Account created successfully! 🎉');
  } else {
    alert('Please fix the errors before submitting.');
  }
});