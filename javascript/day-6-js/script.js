// ================================
// 1. ARROW FUNCTIONS
// ================================

// OLD way:
function add(a, b) {
    return a + b;
}

// ARROW function:
const addArrow = (a, b) => a + b;

// Even shorter variations:
const double = num => num * 2;        // one param, no brackets
const greet = () => "Hello! 🔥";     // no params
const multiply = (a, b) => a * b;    // multiple params

document.getElementById("arrowBtn").addEventListener("click", () => {
    let output = document.getElementById("arrowOutput");
    output.innerHTML = `
        <p>add(5, 3) = ${add(5, 3)}</p>
        <p>addArrow(5, 3) = ${addArrow(5, 3)}</p>
        <p>double(10) = ${double(10)}</p>
        <p>greet() = ${greet()}</p>
        <p>multiply(4, 5) = ${multiply(4, 5)}</p>
    `;
});

// ================================
// 2. TEMPLATE LITERALS
// ================================

document.getElementById("templateBtn").addEventListener("click", () => {
    let name = document.getElementById("nameInput").value;
    let age = document.getElementById("ageInput").value;

    // OLD way - messy!
    // "Hello " + name + "! You are " + age + " years old!"

    // NEW way - template literals!
    let profile = `
        <h3>👤 ${name}</h3>
        <p>🎂 Age: ${age}</p>
        <p>📍 From: Jaipur</p>
        <p>💪 Skills: HTML, CSS, JS</p>
        <p>🔥 Learning since: ${new Date().getFullYear()}</p>
    `;

    // multiline strings!
    let message = `
        Hello ${name}!
        You are ${age} years old.
        In 10 years you'll be ${Number(age) + 10}!
    `;

    document.getElementById("templateOutput").innerHTML = profile;
});

// ================================
// 3. DESTRUCTURING
// ================================

const user = {
    name: "Afroj",
    age: 20,
    city: "Jaipur",
    skills: ["HTML", "CSS", "JS"]
};

const fruits = ["Apple", "Banana", "Mango", "Orange"];

document.getElementById("destructBtn").addEventListener("click", () => {
    // OBJECT destructuring
    const { name, age, city } = user;
    // same as:
    // const name = user.name;
    // const age = user.age;

    // ARRAY destructuring
    const [first, second, , fourth] = fruits;
    // first = "Apple"
    // second = "Banana"
    // skipped "Mango"
    // fourth = "Orange"

    // rename while destructuring!
    const { name: userName, age: userAge } = user;

    // default values!
    const { country = "India" } = user;

    document.getElementById("destructOutput").innerHTML = `
        <p>Object destructuring:</p>
        <p>name = ${name}, age = ${age}, city = ${city}</p>
        <br>
        <p>Array destructuring:</p>
        <p>first = ${first}, second = ${second}, fourth = ${fourth}</p>
        <br>
        <p>Rename: userName = ${userName}</p>
        <p>Default: country = ${country}</p>
    `;
});

// ================================
// 4. SPREAD & REST
// ================================

document.getElementById("spreadBtn").addEventListener("click", () => {
    let arr1 = [1, 2, 3];
    let arr2 = [4, 5, 6];

    // SPREAD - expand array!
    let combined = [...arr1, ...arr2];
    // [1, 2, 3, 4, 5, 6]

    // copy array
    let copy = [...arr1];

    // spread in function call
    let numbers = [5, 3, 8, 1, 9];
    let max = Math.max(...numbers);
    // same as Math.max(5, 3, 8, 1, 9)

    // spread objects!
    let obj1 = { name: "Afroj", age: 20 };
    let obj2 = { city: "Jaipur", skills: ["JS"] };
    let merged = { ...obj1, ...obj2 };

    document.getElementById("spreadOutput").innerHTML = `
        <p>arr1 = [${arr1}]</p>
        <p>arr2 = [${arr2}]</p>
        <p>combined = [${combined}]</p>
        <p>max of numbers = ${max}</p>
        <p>merged object = ${JSON.stringify(merged)}</p>
    `;
});

document.getElementById("restBtn").addEventListener("click", () => {
    // REST - collect remaining into array!
    function sum(...numbers) {
        // numbers = array of ALL arguments!
        return numbers.reduce((total, num) => total + num, 0);
    }

    // works with ANY number of arguments!
    let result1 = sum(1, 2, 3);           // 6
    let result2 = sum(1, 2, 3, 4, 5);    // 15
    let result3 = sum(10, 20, 30, 40);   // 100

    // rest in destructuring
    const [first, ...rest] = [1, 2, 3, 4, 5];
    // first = 1
    // rest = [2, 3, 4, 5]

    document.getElementById("spreadOutput").innerHTML = `
        <p>sum(1,2,3) = ${result1}</p>
        <p>sum(1,2,3,4,5) = ${result2}</p>
        <p>sum(10,20,30,40) = ${result3}</p>
        <br>
        <p>first = ${first}</p>
        <p>rest = [${rest}]</p>
    `;
});


// OLD:
const user = {
    greet: function() {
        return "Hello!";
    }
}

// NEW - short syntax:
const user = {
    greet() {
        return "Hello!";
    }
}