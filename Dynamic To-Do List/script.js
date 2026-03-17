// 1. Get references to our HTML elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// 2. Load tasks from Local Storage, or start with an empty array if none exist
let tasks = JSON.parse(localStorage.getItem('myTasks')) || [];

// 3. Render the initial list when the page loads
renderTasks();

// Function to add a new task (CREATE)
function addTask() {
    const text = taskInput.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    // Create a task object with a unique ID
    const newTask = {
        id: Date.now(), // Uses the current timestamp as a simple unique ID
        text: text,
        completed: false
    };

    tasks.push(newTask);
    taskInput.value = ''; // Clear the input field
    
    saveAndRender();
}

// Function to toggle a task's completion status (UPDATE)
function toggleTask(id) {
    // Find the task by its ID and flip its 'completed' boolean
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    saveAndRender();
}

// Function to delete a task (DELETE)
function deleteTask(id) {
    // Filter out the task that matches the ID we want to delete
    tasks = tasks.filter(task => task.id !== id);
    
    saveAndRender();
}

// Helper function to update storage and the screen
function saveAndRender() {
    // Save to browser memory (must be converted to a string first)
    localStorage.setItem('myTasks', JSON.stringify(tasks));
    renderTasks();
}

// Function to draw the tasks on the screen (READ)
function renderTasks() {
    // Clear the current list
    taskList.innerHTML = '';

    // Loop through our array and build HTML for each task
    tasks.forEach(task => {
        const li = document.createElement('li');
        
        // Add the 'completed' CSS class if the task is done
        if (task.completed) {
            li.classList.add('completed');
        }

        // Add the HTML content inside the list item
        li.innerHTML = `
            <span onclick="toggleTask(${task.id})" style="cursor: pointer; flex-grow: 1;">
                ${task.text}
            </span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">X</button>
        `;

        taskList.appendChild(li);
    });
}

// Bonus: Allow pressing "Enter" to add a task
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});