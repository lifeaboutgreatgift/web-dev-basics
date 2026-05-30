
// OBJECTS - like a real world thing!


const user = {
    name: "Afroj",
    age: 20,
    city: "Jaipur",
    skills: ["HTML", "CSS", "JavaScript"],
    isLearning: true,
    emoji: "👩🏻‍💻"
};


// PRODUCTS - array of objects!

const products = [
    { id: 1, name: "iPhone 15", price: 999, category: "Phone", emoji: "📱" },
    { id: 2, name: "MacBook Pro", price: 1999, category: "Laptop", emoji: "💻" },
    { id: 3, name: "AirPods", price: 249, category: "Audio", emoji: "🎧" },
    { id: 4, name: "iPad Pro", price: 799, category: "Tablet", emoji: "📲" },
    { id: 5, name: "Apple Watch", price: 399, category: "Watch", emoji: "⌚" },
    { id: 6, name: "USB Cable", price: 29, category: "Accessory", emoji: "🔌" },
];


// PROFILE CARD

let profileCard = document.getElementById("profileCard");

document.getElementById("loadProfile").addEventListener("click", function() {
    profileCard.innerHTML = `
        <span class="emoji">${user.emoji}</span>
        <h3>${user.name}</h3>
        <p>🎂 Age: ${user.age}</p>
        <p>📍 City: ${user.city}</p>
        <p>💪 Skills: ${user.skills.join(", ")}</p>
        <p>📚 Learning: ${user.isLearning ? "Yes! 🔥" : "No"}</p>
    `;
});

document.getElementById("updateProfile").addEventListener("click", function() {
    user.age++; // increment age!
    profileCard.innerHTML = `
        <span class="emoji">${user.emoji}</span>
        <h3>${user.name}</h3>
        <p>🎂 Age: ${user.age} (updated!)</p>
        <p>📍 City: ${user.city}</p>
        <p>💪 Skills: ${user.skills.join(", ")}</p>
        <p>📚 Learning: ${user.isLearning ? "Yes! 🔥" : "No"}</p>
    `;
});

// RENDER PRODUCTS

let productsList = document.getElementById("productsList");

function renderProducts(items) {
    productsList.innerHTML = "";
    items.forEach(function(product) {
        productsList.innerHTML += `
            <div class="product-card">
                <span class="emoji">${product.emoji}</span>
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p class="price">₹${product.price}</p>
            </div>
        `;
    });
}

document.getElementById("loadProducts").addEventListener("click", function() {
    renderProducts(products);
});

document.getElementById("filterExpensive").addEventListener("click", function() {
    let expensive = products.filter(function(product) {
        return product.price > 500;
    });
    renderProducts(expensive);
});

document.getElementById("sortByPrice").addEventListener("click", function() {
    let sorted = [...products].sort(function(a, b) {
        return a.price - b.price;
    });
    renderProducts(sorted);
});


// OBJECT METHODS

let methodOutput = document.getElementById("methodOutput");

document.getElementById("getKeys").addEventListener("click", function() {
    let keys = Object.keys(user);
    methodOutput.textContent = "Keys: " + keys.join(", ");
});

document.getElementById("getValues").addEventListener("click", function() {
    let values = Object.values(user);
    methodOutput.textContent = "Values: " + values;
});

document.getElementById("getEntries").addEventListener("click", function() {
    let entries = Object.entries(user);
    methodOutput.innerHTML = entries.map(function(entry) {
        return `<p><strong>${entry[0]}</strong>: ${entry[1]}</p>`;
    }).join("");
});