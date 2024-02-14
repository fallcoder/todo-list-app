// getting element to html elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

let editingTaskItem = null;

// event listener for form submission
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Checking if an existing task is being edited or a new task is being added
    if(!editingTaskItem) {
        addTask();
    }
    else {
        editTask();
    }
});

// function to add a new task
function addTask() {
    const task = taskInput.value.trim();

    if(!task) {
        alert('please enter a task');
        return;
    }

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

    // clearing the task input field
    taskInput.value = ''; // why reset isn't good fos this

    editButton.addEventListener('click', () => {
        taskInput.value = taskContent.textContent;
        addButton.textContent = 'Edit';
        editingTaskItem = taskItem;
    });

    // event listener for deleting the task
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(taskItem);
        taskInput.value = '';
        editingTaskItem = null;
        addButton.textContent = 'Add';
    });
}

// fucntin to edit an existing task
function editTask() {
    const editedTask = taskInput.value.trim();

    if(!editedTask) {
        alert('please enter a task');
        return;
    }

    //  Finding the content span of the task being edited
    const editedTaskContent = editingTaskItem.querySelector('.task-content');

    // updating the content of the task
    editedTaskContent.textContent = editedTask;

    // Resetting the Add button text and editingTaskItem variable
    addButton.textContent = 'Add';
    editingTaskItem = null;

     // Clearing the task input field
    taskInput.value = '';

}