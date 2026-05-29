// ================================
// MOUSE EVENTS
// ================================
let box = document.getElementById("box");

// hover over
box.addEventListener("mouseover", function() {
    box.style.backgroundColor = "green";
    box.textContent = "Mouse is over me!";
});

// mouse leaves
box.addEventListener("mouseout", function() {
    box.style.backgroundColor = "#667eea";
    box.textContent = "Hover or Click me!";
});

// click
box.addEventListener("click", function() {
    box.style.backgroundColor = "red";
    box.textContent = "Clicked! 🔥";
});

// double click
box.addEventListener("dblclick", function() {
    box.style.backgroundColor = "purple";
    box.textContent = "Double Clicked! 🎉";
});

// ================================
// KEYBOARD EVENTS
// ================================
let nameInput = document.getElementById("nameInput");
let output = document.getElementById("output");

// fires every time user types!
nameInput.addEventListener("input", function() {
    output.textContent = "You typed: " + nameInput.value;
});

// fires when user finishes typing and clicks away
nameInput.addEventListener("change", function() {
    output.textContent = "Final value: " + nameInput.value;
});

// fires when input gets focus
nameInput.addEventListener("focus", function() {
    nameInput.style.borderColor = "blue";
    nameInput.style.boxShadow = "0 0 0 3px rgba(0,0,255,0.1)";
});

// fires when input loses focus
nameInput.addEventListener("blur", function() {
    nameInput.style.borderColor = "#ddd";
    nameInput.style.boxShadow = "none";
});

// ================================
// DOUBLE CLICK BUTTON
// ================================
let dblBtn = document.getElementById("dblBtn");
let dblOutput = document.getElementById("dblOutput");
let clickCount = 0;

dblBtn.addEventListener("click", function() {
    clickCount++;
    dblOutput.textContent = "Clicked " + clickCount + " times!";
});

dblBtn.addEventListener("dblclick", function() {
    dblOutput.textContent = "DOUBLE CLICK DETECTED! 🎉";
    clickCount = 0;
});

// ================================
// KEY DETECTION
// ================================
let keyInput = document.getElementById("keyInput");
let keyOutput = document.getElementById("keyOutput");

keyInput.addEventListener("keydown", function(event) {
    keyOutput.textContent = "Key pressed: " + event.key;
});

keyInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        keyOutput.textContent = "Enter pressed! Form submitted! ✅";
    }
});