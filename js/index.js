


const submitButton = document.querySelector('#submitButton');

//initialize new TaskManager class
const TaskList = new TaskManager;

//load tasks stored in Local Storage
TaskList.load();
TaskList.render();

let name;
let description;
let status;
let assignedTo;
let dueDate;

const validFormFieldInput = (e) => {
    e.preventDefault();

    //checking for errors in form submission
    const formAlert = document.querySelector('#formAlert');
    formAlert.style.display = 'none';
    formAlert.innerHTML = 'Check the errors below:';
    const errorList = document.createElement('ul');


    formAlert.appendChild(errorList);

    const taskName = document.querySelector('#taskName');
    taskName.style.border = "";
    if (!taskName.value) {
        const li = document.createElement('LI');
        li.innerHTML = 'Please add a task name';
        formAlert.appendChild(li);
        formAlert.style.display = 'block';
        taskName.style.border = "1px solid red";

    } else {
        name = taskName.value;
    }

    const taskDescription = document.querySelector('#taskDescription');
    taskDescription.style.border = "";
    if (!taskDescription.value) {
        const li = document.createElement('LI');
        li.innerHTML = 'Please add a task description';
        formAlert.appendChild(li);
        formAlert.style.display = 'block';
        taskDescription.style.border = "1px solid red";

    }
    else {
        description = taskDescription.value;

    }

    const taskStatus = document.querySelector('#taskStatus');
    taskStatus.style.border = "";
    if (!taskStatus.value) {
        taskStatus.style.border = "";
        const li = document.createElement('LI');
        li.innerHTML = 'Please select a status for your task';
        formAlert.appendChild(li);
        formAlert.style.display = 'block';
        taskStatus.style.border = "1px solid red";

    }
    else {
        status = taskStatus.value;
    }


    const taskDueDate = document.querySelector('#taskDueDate');

    taskDueDate.style.border = "";

    if (!taskDueDate.value) {

        const li = document.createElement('LI');
        li.innerHTML = 'Please select a due date';
        formAlert.appendChild(li);
        formAlert.style.display = 'block';
        taskDueDate.style.border = "1px solid red";

    }
    else {
        dueDate = taskDueDate.value;
    }

    const taskAssignedTo = document.querySelector('#taskAssignedTo');
    taskAssignedTo.style.border = "";
    if (!taskAssignedTo.value) {

        const li = document.createElement('LI');
        li.innerHTML = 'Please assign this task to someone';
        formAlert.appendChild(li);
        formAlert.style.display = 'block';
        taskAssignedTo.style.border = "1px solid red";

    }
    else {

        assignedTo = taskAssignedTo.value;

    }

    //adding a new task to the list
    if (name && description && status && assignedTo && dueDate) {

        TaskList.addTask(name, description, assignedTo, dueDate, status);
        TaskList.save();
        TaskList.render();

        //reset form and task values
        taskName.value = '';
        taskDescription.value = '';
        taskStatus.value = '';
        taskDueDate.value = '';
        taskAssignedTo.value = '';
        name = '';
        description = '';
        status = '';
        assignedTo = '';
        dueDate = '';

    } else {
        console.log('error');
    }
    // console.log(TaskList);

}

//Submit button event listener to add tasks
submitButton.addEventListener('click', validFormFieldInput);
const tasksList = document.querySelector('#tasks-list');


tasksList.addEventListener('click', (event) => {

    // Event listener for Done button to change status of task
    if (event.target.classList.value.includes('done-button')) {
        let parentTask = event.target.parentElement.parentElement.parentElement.parentElement;
        let taskId = parseInt(parentTask.dataset.taskId);
        let task = TaskList.getTaskById(taskId);
        task.status = 'DONE';
        TaskList.save();
        TaskList.render();
    }

    //Event listener for Delete Button to delete a task
    if (event.target.classList.value.includes('delete-button')) {
        let parentTask = event.target.parentElement.parentElement.parentElement.parentElement;
        let taskId = parseInt(parentTask.dataset.taskId);
        TaskList.deleteTask(taskId);
        TaskList.save();
        TaskList.render();
    }

})

