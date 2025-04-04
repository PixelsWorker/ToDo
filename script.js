let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

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

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskName = taskInput.value.trim();

  if (taskName !== '') {
    tasks.push({ name: taskName, completed: false });
    taskInput.value = '';
    updateLocalStorage(); 
    displayTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  updateLocalStorage(); 
  displayTasks();
}

function toggleCompletion(index) {
  tasks[index].completed = !tasks[index].completed;
  updateLocalStorage(); 
  displayTasks();
}

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

displayTasks();
