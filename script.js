// Get tasks from localStorage if available
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks function
function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" onchange="toggleCompletion(${index})" ${task.completed ? 'checked' : ''}>
      <span class="${task.completed ? 'completed' : ''}">${task.name}</span>
      <button onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Add task function
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskName = taskInput.value.trim();

  if (taskName !== '') {
    tasks.push({ name: taskName, completed: false });
    taskInput.value = '';
    updateLocalStorage(); // Save to localStorage after adding a new task
    displayTasks();
  }
}

// Delete task function
function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage(); // Save to localStorage after deletion
  displayTasks();
}

// Toggle completion status function
function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage(); // Save to localStorage after toggling completion status
  displayTasks();
}

// Update tasks in localStorage
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial call to display tasks when the page loads
displayTasks();
