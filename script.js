// getting element to html elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

let editingTaskItem = null;

document.addEventListener('DOMContentLoaded', function() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if(savedTasks) {
        savedTasks.forEach(task => {
            addTaskToList(task);
        });
    }
});


// event listener for form submission
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // checking if an existing task is being edited or a new task is being added
    if(!editingTaskItem) {
        addTask();
    }
    else {
        editTask();
    }

    // reset the form after adding or editing a task
    taskForm.reset();
});

// function to add a new task
function addTask() {
    const task = taskInput.value.trim();

    if(!task) {
        alert('please enter a task');
        return;
    }

    // add the task to the list and localStorage
    addTaskToList(task);

    // add the task to localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(savedTasks));
}

// function to add a task to the list
function addTaskToList(task) {
    // creating html elements for the new task
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const taskContent = document.createElement('span');
    taskContent.className = 'task-content';
    taskContent.textContent = task;

    const editButton = document.createElement('button');
    editButton.id = 'edit';
    editButton.textContent = 'Edit';

    const deleteButton = document.createElement('button');
    deleteButton.id = 'delete';
    deleteButton.textContent = 'Delete';

    // appending elements to the task item
    taskItem.appendChild(taskContent);
    taskItem.appendChild(editButton);
    taskItem.appendChild(deleteButton);

    // inserting the new task at the beginning of the task list
    taskList.insertAdjacentElement('afterbegin', taskItem);

    // event listener for editing the task
    editButton.addEventListener('click', () => {
        taskInput.value = taskContent.textContent;
        addButton.textContent = 'Edit';
        editingTaskItem = taskItem;
    });

    // event listener for deleting the task
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        editingTaskItem = null;
        addButton.textContent = 'Add';

        // delete task from localStorage
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const index = savedTasks.indexOf(task);
        if(index !== -1) {
            savedTasks.splice(index, 1)
            localStorage.setItem('tasks', JSON.stringify(savedTasks));
        }
    });

}
// function to edit an existing task
function editTask() {
    const editedTask = taskInput.value.trim();

    if(!editedTask) {
        alert('please enter a task');
        return;
    }

     // // Find the index of the task to edit in savedTasks
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = savedTasks.indexOf(editingTaskItem.querySelector('.task-content').textContent);

     if(index !== -1) {
        // updating task in savedTasks
        savedTasks[index] = editedTask;
        localStorage.setItem('tasks', JSON.stringify(savedTasks)); 
        
        // updating the UI
        editingTaskItem.querySelector('.task-content').textContent = editedTask;

        // Resetting the Add button text and editingTaskItem variable
        addButton.textContent = 'Add';
        editingTaskItem = null;  
    }
   
}