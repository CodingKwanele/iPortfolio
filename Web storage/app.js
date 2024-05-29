// Function to handle user login
function login() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('app-section').style.display = 'flex';
        alert(`Logged in as ${username}`);
    } else {
        alert('Please enter a username.');
    }
}

// Function to validate task inputs
function validateTaskInput(task) {
    if (!task.text) {
        alert("Task text is required.");
        return false;
    }
    if (!task.dueDate) {
        alert("Due date is required.");
        return false;
    }
    if (new Date(task.dueDate) < new Date()) {
        alert("Due date cannot be in the past.");
        return false;
    }
    return true;
}

// Function to add a new task to session storage
function addSessionTodo() {
    const input = document.getElementById('session-todo-input');
    const category = document.getElementById('session-category').value;
    const dueDate = document.getElementById('session-due-date').value;
    const description = document.getElementById('session-description').value;
    const task = {
        text: input.value,
        category,
        dueDate,
        description,
        completed: false
    };
    if (validateTaskInput(task)) {
        let tasks = JSON.parse(sessionStorage.getItem('sessionTodos')) || [];
        tasks.push(task);
        sessionStorage.setItem('sessionTodos', JSON.stringify(tasks));
        displaySessionTodos();
        input.value = '';
        document.getElementById('session-due-date').value = '';
        document.getElementById('session-description').value = '';
    }
}

// Function to add a new task to local storage
function addLocalTodo() {
    const input = document.getElementById('local-todo-input');
    const category = document.getElementById('local-category').value;
    const dueDate = document.getElementById('local-due-date').value;
    const description = document.getElementById('local-description').value;
    const task = {
        text: input.value,
        category,
        dueDate,
        description,
        completed: false
    };
    if (validateTaskInput(task)) {
        let tasks = JSON.parse(localStorage.getItem('localTodos')) || [];
        tasks.push(task);
        localStorage.setItem('localTodos', JSON.stringify(tasks));
        displayLocalTodos();
        input.value = '';
        document.getElementById('local-due-date').value = '';
        document.getElementById('local-description').value = '';
    }
}

// Function to display tasks from session storage
function displaySessionTodos() {
    const tasks = JSON.parse(sessionStorage.getItem('sessionTodos')) || [];
    const list = document.getElementById('session-todo-list');
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text} (${task.category}) - ${task.dueDate} - ${task.description}</span>
            <div>
                <button onclick="editSessionTask(${index})">Edit</button>
                <button onclick="toggleSessionTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteSessionTask(${index})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
}

// Function to display tasks from local storage
function displayLocalTodos() {
    const tasks = JSON.parse(localStorage.getItem('localTodos')) || [];
    const list = document.getElementById('local-todo-list');
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text} (${task.category}) - ${task.dueDate} - ${task.description}</span>
            <div>
                <button onclick="editLocalTask(${index})">Edit</button>
                <button onclick="toggleLocalTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteLocalTask(${index})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
}

// Function to display completed tasks
function displayCompletedTasks() {
    const sessionTasks = JSON.parse(sessionStorage.getItem('sessionTodos')) || [];
    const localTasks = JSON.parse(localStorage.getItem('localTodos')) || [];
    const completedTasks = [...sessionTasks, ...localTasks].filter(task => task.completed);
    const list = document.getElementById('completed-tasks-list');
    list.innerHTML = '';
    completedTasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `${task.text} (${task.category}) - ${task.dueDate} - ${task.description}`;
        list.appendChild(li);
    });
}

// Function to display uncompleted tasks
function displayUncompletedTasks() {
    const sessionTasks = JSON.parse(sessionStorage.getItem('sessionTodos')) || [];
    const localTasks = JSON.parse(localStorage.getItem('localTodos')) || [];
    const uncompletedTasks = [...sessionTasks, ...localTasks].filter(task => !task.completed);
    const list = document.getElementById('uncompleted-tasks-list');
    list.innerHTML = '';
    uncompletedTasks.forEach((task) => {
        const li = document.createElement('li');
        li.innerHTML = `${task.text} (${task.category}) - ${task.dueDate} - ${task.description}`;
        list.appendChild(li);
    });
}

// Function to edit a session task
function editSessionTask(index) {
    let tasks = JSON.parse(sessionStorage.getItem('sessionTodos'));
    const task = tasks[index];
    const newText = prompt("Edit task text:", task.text);
    const newCategory = prompt("Edit task category (Work, Personal Life, Entertainment):", task.category);
    const newDueDate = prompt("Edit task due date (YYYY-MM-DD):", task.dueDate);
    const newDescription = prompt("Edit task description:", task.description);
    if (newText && newCategory && newDueDate && newDescription) {
        task.text = newText;
        task.category = newCategory;
        task.dueDate = newDueDate;
        task.description = newDescription;
        tasks[index] = task;
        sessionStorage.setItem('sessionTodos', JSON.stringify(tasks));
        displaySessionTodos();
    }
}

// Function to edit a local task
function editLocalTask(index) {
    let tasks = JSON.parse(localStorage.getItem('localTodos'));
    const task = tasks[index];
    const newText = prompt("Edit task text:", task.text);
    const newCategory = prompt("Edit task category (Work, Personal Life, Entertainment):", task.category);
    const newDueDate = prompt("Edit task due date (YYYY-MM-DD):", task.dueDate);
    const newDescription = prompt("Edit task description:", task.description);
    if (newText && newCategory && newDueDate && newDescription) {
        task.text = newText;
        task.category = newCategory;
        task.dueDate = newDueDate;
        task.description = newDescription;
        tasks[index] = task;
        localStorage.setItem('localTodos', JSON.stringify(tasks));
        displayLocalTodos();
    }
}

// Function to toggle the completion status of a session task
function toggleSessionTask(index) {
    let tasks = JSON.parse(sessionStorage.getItem('sessionTodos'));
    tasks[index].completed = !tasks[index].completed;
    sessionStorage.setItem('sessionTodos', JSON.stringify(tasks));
    displaySessionTodos();
}

// Function to toggle the completion status of a local task
function toggleLocalTask(index) {
    let tasks = JSON.parse(localStorage.getItem('localTodos'));
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('localTodos', JSON.stringify(tasks));
    displayLocalTodos();
}

// Function to delete a task from session storage
function deleteSessionTask(index) {
    let tasks = JSON.parse(sessionStorage.getItem('sessionTodos'));
    tasks.splice(index, 1);
    sessionStorage.setItem('sessionTodos', JSON.stringify(tasks));
    displaySessionTodos();
}

// Function to delete a task from local storage
function deleteLocalTask(index) {
    let tasks = JSON.parse(localStorage.getItem('localTodos'));
    tasks.splice(index, 1);
    localStorage.setItem('localTodos', JSON.stringify(tasks));
    displayLocalTodos();
}

// Function to show the selected section
function showSection(sectionId) {
    document.querySelectorAll('.todo-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    if (sectionId === 'completed-tasks') {
        displayCompletedTasks();
    } else if (sectionId === 'uncompleted-tasks') {
        displayUncompletedTasks();
    }
}

// Event listener to display tasks when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displaySessionTodos();
    displayLocalTodos();
});
