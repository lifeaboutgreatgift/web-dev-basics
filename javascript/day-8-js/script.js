// ================================
// 1. EVENT BUBBLING
// ================================
const outer = document.getElementById("outer");
const middle = document.getElementById("middle");
const inner = document.getElementById("inner");
const bubbleOutput = document.getElementById("bubbleOutput");

function logBubble(name) {
    bubbleOutput.innerHTML += `<p>${name} clicked!</p>`;
}

outer.addEventListener("click", () => logBubble("Outer"));
middle.addEventListener("click", () => logBubble("Middle"));
inner.addEventListener("click", () => logBubble("Inner (button)"));

// ================================
// 2. STOP PROPAGATION
// ================================
const outer2 = document.getElementById("outer2");
const middle2 = document.getElementById("middle2");
const inner2 = document.getElementById("inner2");
const bubbleOutput2 = document.getElementById("bubbleOutput2");
const stopBubbleCheckbox = document.getElementById("stopBubbleCheckbox");

function logBubble2(name) {
    bubbleOutput2.innerHTML += `<p>${name} clicked!</p>`;
}

outer2.addEventListener("click", () => logBubble2("Outer"));
middle2.addEventListener("click", () => logBubble2("Middle"));

inner2.addEventListener("click", (e) => {
    if (stopBubbleCheckbox.checked) {
        e.stopPropagation(); // stops bubbling up!
    }
    logBubble2("Inner (button)");
});

// ================================
// 3. EVENT DELEGATION - TODO LIST
// ================================
const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");
const delegationOutput = document.getElementById("delegationOutput");

let todos = [];

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const item = document.createElement("div");
        item.classList.add("todo-item");
        if (todo.completed) item.classList.add("completed");

        item.innerHTML = `
            <span class="todo-text" data-index="${index}">${todo.text}</span>
            <button class="delete-btn" data-index="${index}">Delete</button>
        `;

        todoList.appendChild(item);
    });
}

addTodoBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (text === "") return;

    todos.push({ text, completed: false });
    todoInput.value = "";
    renderTodos();
});

// ⚡ EVENT DELEGATION - ONE listener on PARENT!
// works even for items added AFTER page load!
todoList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;

    if (e.target.classList.contains("delete-btn")) {
        delegationOutput.innerHTML = `<p>Deleted todo at index ${index}!</p>`;
        todos.splice(index, 1);
        renderTodos();
    }

    if (e.target.classList.contains("todo-text")) {
        delegationOutput.innerHTML = `<p>Toggled todo at index ${index}!</p>`;
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }
});

// ================================
// 4. PREVENT DEFAULT - FORM
// ================================
const testForm = document.getElementById("testForm");
const formInput = document.getElementById("formInput");
const formOutput = document.getElementById("formOutput");

testForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stops page refresh!

    formOutput.innerHTML = `<p>Form submitted with: "${formInput.value}"</p>
                             <p>Page did NOT refresh! 🔥</p>`;
    formInput.value = "";
});