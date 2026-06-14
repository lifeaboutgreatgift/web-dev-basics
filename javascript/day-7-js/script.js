// ================================
// DARK MODE - saves on refresh!
// ================================
const darkModeBtn = document.getElementById("darkModeBtn");
const darkModeStatus = document.getElementById("darkModeStatus");

// check saved preference on page load!
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
    darkModeStatus.textContent = "Current: Dark Mode 🌙";
}

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    // save to localStorage!
    localStorage.setItem("darkMode", isDark);

    darkModeStatus.textContent = isDark
        ? "Current: Dark Mode 🌙"
        : "Current: Light Mode ☀️";
});

// ================================
// USER PREFERENCES
// ================================
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");
const prefOutput = document.getElementById("prefOutput");

saveBtn.addEventListener("click", () => {
    const username = document.getElementById("username").value;
    const favColor = document.getElementById("favColor").value;

    if (username === "" || favColor === "") {
        prefOutput.textContent = "Please fill both fields!";
        return;
    }

    // save to localStorage!
    localStorage.setItem("username", username);
    localStorage.setItem("favColor", favColor);

    prefOutput.innerHTML = `
        <p>✅ Saved!</p>
        <p>Username: ${username}</p>
        <p>Favourite Color: ${favColor}</p>
    `;
});

loadBtn.addEventListener("click", () => {
    const username = localStorage.getItem("username");
    const favColor = localStorage.getItem("favColor");

    if (!username) {
        prefOutput.textContent = "No saved preferences found!";
        return;
    }

    prefOutput.innerHTML = `
        <p>📂 Loaded from localStorage!</p>
        <p>Username: ${username}</p>
        <p>Favourite Color: 
            <span style="color: ${favColor}; font-weight: bold;">
                ${favColor}
            </span>
        </p>
    `;
});

clearBtn.addEventListener("click", () => {
    localStorage.removeItem("username");
    localStorage.removeItem("favColor");
    prefOutput.textContent = "✅ Cleared!";
});

// ================================
// TODO LIST - saves on refresh!
// ================================
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodo");
const todoList = document.getElementById("todoList");

// load todos from localStorage!
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function renderTodos() {
    todoList.innerHTML = "";

    if (todos.length === 0) {
        todoList.innerHTML = "<p>No tasks yet! Add one above 😄</p>";
        return;
    }

    todos.forEach((todo, index) => {
        todoList.innerHTML += `
            <div class="todo-item ${todo.completed ? "completed" : ""}">
                <span class="todo-item-text" onclick="toggleTodo(${index})">
                    ${todo.completed ? "✅" : "⬜"} ${todo.text}
                </span>
                <div class="todo-actions">
                    <button onclick="deleteTodo(${index})" 
                    class="delete-btn">Delete</button>
                </div>
            </div>
        `;
    });
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;
    saveTodos();
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
}

addTodoBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (text === "") return;

    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = "";
});

// Enter key to add todo!
todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodoBtn.click();
});

// render on page load!
 try {
    renderTodos();
 } catch(e) {
    console.log("Erroe:", e);
 }

// ================================
// JSON
// ================================
const user = {
    name: "Afroj",
    age: 20,
    city: "Jaipur",
    skills: ["HTML", "CSS", "JS"]
};

document.getElementById("toJsonBtn").addEventListener("click", () => {
    // Object → JSON string
    const jsonString = JSON.stringify(user, null, 2);
    document.getElementById("toJsonOutput").innerHTML = `
        <p>Object converted to JSON string:</p>
        <pre>${jsonString}</pre>
    `;
});

document.getElementById("fromJsonBtn").addEventListener("click", () => {
    const jsonString = JSON.stringify(user);
    const obj = JSON.parse(jsonString);

    let output = document.getElementById("fromJsonOutput");
    
    output.innerHTML = `
        <p>JSON string converted to Object:</p>
        <p>Name: ${obj.name}</p>
        <p>Age: ${obj.age}</p>
        <p>City: ${obj.city}</p>
    `;
});