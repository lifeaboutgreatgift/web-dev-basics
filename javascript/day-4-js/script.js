// ================================
// ARRAYS - like a list of items!
// ================================
let fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];
let scores = [85, 92, 45, 78, 95, 60, 88];

// ================================
// ARRAY BASICS
// ================================
let output1 = document.getElementById("output1");

document.getElementById("showArray").addEventListener("click", function() {
    output1.textContent = "Array: " + fruits;
});

document.getElementById("showFirst").addEventListener("click", function() {
    output1.textContent = "First item: " + fruits[0];
    // ↑ arrays start at 0 not 1!
});

document.getElementById("showLast").addEventListener("click", function() {
    output1.textContent = "Last item: " + fruits[fruits.length - 1];
});

document.getElementById("showLength").addEventListener("click", function() {
    output1.textContent = "Array length: " + fruits.length;
});

// ================================
// LOOP THROUGH ARRAY
// ================================
let listContainer = document.getElementById("listContainer");

document.getElementById("loopBtn").addEventListener("click", function() {
    listContainer.textContent = ""; // clear first!

    fruits.forEach(function(fruit) {
        listContainer.textContent += `
            <div class="list-item">${fruit}</div>
        `;
    });
});

// ================================
// ADD & REMOVE ITEMS
// ================================
let newItem = document.getElementById("newItem");
let dynamicList = document.getElementById("dynamicList");
let myList = ["Item 1", "Item 2", "Item 3"];

function renderList() {
    dynamicList.textContent = "";
    myList.forEach(function(item) {  
        dynamicList.textContent += `
            <div class="list-item">${item}</div>
        `;
    });
}

renderList(); // show list on page load!

document.getElementById("addBtn").addEventListener("click", function() {
    if (newItem.value !== "") {
        myList.push(newItem.value); // add to end!
        newItem.value = ""; // clear input!
        renderList(); // refresh list!
    }
});

document.getElementById("removeBtn").addEventListener("click", function() {
    myList.pop(); // remove last item!
    renderList(); // refresh list!
});

// ================================
// ARRAY METHODS
// ================================
let output2 = document.getElementById("output2");

document.getElementById("sortBtn").addEventListener("click", function() {
    let sorted = [...fruits].sort(); // copy then sort!
    output2.textContent = "Sorted: " + sorted;
});

document.getElementById("reverseBtn").addEventListener("click", function() {
    let reversed = [...fruits].reverse(); // copy then reverse!
    output2.textContent = "Reversed: " + reversed;
});

document.getElementById("filterBtn").addEventListener("click", function() {
    let highScores = scores.filter(function(score) {
        return score > 70; // only scores above 70!
    });
    output2.textContent = "Scores above 70: " + highScores;
});

// ================================
// MORE ARRAY METHODS
// ================================

let numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3];
let names = ["Aditi", "John", "Sarah", "Mike", "Zara"];

// ================================
// MAP - transform each item!
// ================================
let doubled = numbers.map(function(num) {
    return num * 2;
});
console.log("Doubled:", doubled);
// [6, 2, 8, 2, 10, 18, 4, 12, 10, 6]

// ================================
// FILTER - keep matching items!
// ================================
let bigNumbers = numbers.filter(function(num) {
    return num > 4;
});
console.log("Greater than 4:", bigNumbers);
// [5, 9, 6, 5]

// ================================
// FIND - find FIRST matching item!
// ================================
let firstBig = numbers.find(function(num) {
    return num > 4;
});
console.log("First number > 4:", firstBig);
// 5

// ================================
// SOME - is ANY item matching?
// ================================
let hasNine = numbers.some(function(num) {
    return num === 9;
});
console.log("Has 9?", hasNine);
// true

// ================================
// EVERY - are ALL items matching?
// ================================
let allPositive = numbers.every(function(num) {
    return num > 0;
});
console.log("All positive?", allPositive);
// true

// ================================
// REDUCE - combine all into ONE!
// ================================
let total = numbers.reduce(function(sum, num) {
    return sum + num;
}, 0);
console.log("Total sum:", total);
// 39

// ================================
// INCLUDES - does item exist?
// ================================
console.log("Includes 9?", numbers.includes(9)); // true
console.log("Includes 7?", numbers.includes(7)); // false

// ================================
// indexOf - where is the item?
// ================================
console.log("Index of 9:", numbers.indexOf(9)); // 5
console.log("Index of 7:", numbers.indexOf(7)); // -1 (not found!)

// ================================
// JOIN - array to string!
// ================================
console.log("Joined:", names.join(", "));
// "Aditi, John, Sarah, Mike, Zara"

// ================================
// SLICE - copy part of array! 
// ================================
let firstThree = names.slice(0, 3);
console.log("First three:", firstThree);
// ["Aditi", "John", "Sarah"]

// ================================
// SPLICE - remove/add at position!
// ================================
let myNames = [...names]; // copy first!
myNames.splice(1, 1, "Bob"); // at index 1, remove 1, add "Bob"
console.log("After splice:", myNames);
// ["Aditi", "Bob", "Sarah", "Mike", "Zara"]

// ================================
// FLAT - flatten nested arrays!
// ================================
let nested = [1, 2, [3, 4], [5, [6, 7]]];
console.log("Flat:", nested.flat());
// [1, 2, 3, 4, 5, [6, 7]]
console.log("Flat deep:", nested.flat(Infinity));
// [1, 2, 3, 4, 5, 6, 7]