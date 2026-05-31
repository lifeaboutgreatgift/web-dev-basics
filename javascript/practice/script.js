// ================================
// STEP 1 - Find all elements
// ================================
let heading = document.getElementById("heading");
let paragraph = document.getElementById("paragraph");
let box = document.getElementById("box");
let box2 = document.querySelector(".box2");
let btn1 = document.getElementById("btn1");
let btn2 = document.getElementById("btn2");
let btn3 = document.getElementById("btn3");
let btn4 = document.getElementById("btn4");
let btn6 = document.getElementById("btn6");
let output = document.getElementById("output");

// ================================
// STEP 2 - Add click events
// ================================

// Button 1 - Change Text
btn1.addEventListener("click", function() {
    heading.textContent = "Text Changed! 🔥";
    paragraph.textContent = "JS just changed this paragraph!";
    output.textContent = "btn1 clicked → text changed!";
});

// Button 2 - Change Color
btn2.addEventListener("click", function() {
    box.style.backgroundColor = "purple";
    box.textContent = "Purple!";
    output.textContent = "btn2 clicked → color changed!";
});

// Button 3 - Change Size
btn3.addEventListener("click", function() {
    box.style.width = "300px";
    box.style.height = "300px";
    box.style.borderRadius = "50%";
    box.textContent = "Big Circle!";
    output.textContent = "btn3 clicked → size changed!";
});

// Button 4 - Reset
btn4.addEventListener("click", function() {
    heading.textContent = "DOM Manipulation";
    paragraph.textContent = "Watch me change!";
    box.style.backgroundColor = "red";
    box.style.width = "150px";
    box.style.height = "150px";
    box.style.borderRadius = "10px";
    box.textContent = "Box";
    output.textContent = "Reset! Everything back to normal!";
});



btn6.addEventListener("click", function() {
    box2.classList.toggle("active");
    output.textContent = "Toggled active class!";
});



let btn5 = document.getElementById("btn5");
let cards = document.querySelectorAll(".card");

btn5.addEventListener("click", function() {
    cards.forEach(function(card) {
        card.style.backgroundColor = "purple";
        card.style.color = "white";
        card.style.padding = "10px";
        card.style.margin = "5px";
        card.style.borderRadius = "8px";
    })
})