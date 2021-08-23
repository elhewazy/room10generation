
//function to create the HTML for the tasks
const createTaskHtml = (name, description, assignedTo, dueDate, status, id) => {

    //Make done button visible depending on status
    let doneButtonVisibility = 'visible';
    if (status === 'DONE') {
        doneButtonVisibility = 'invisible';
    }

    let statusBackground = '';

    //change styling of status depending on status
    if (status === 'DONE') {
        statusBackground = 'bg-success';

    } else if (status === 'INPROGRESS') {
        statusBackground = 'bg-warning';
    } else if (status === 'REVIEW') {
        statusBackground = 'bg-info';
    } else {
        statusBackground = 'bg-danger';
    }

    //HTML for the card
    let html = `<li class="list-item border-0 col-6" data-task-id=${id}>
    <div class="card mb-3">
        <div class="card-body">
            <h5 class="card-title">${name}<span class="badge ${statusBackground} float-end">${status}</span></h5>
            <h6 class="card-subtitle mb-2 text-muted">Due Date: ${dueDate}</h6>
            <h6 class="card-subtitle mb-2 text-muted">Assigend to: ${assignedTo}</h6>
            <p class="card-text">${description}</p>
            <div class="float-end">
                <button class="btn btn-success done-button ${doneButtonVisibility}">Mark As Done</button>
                <button class="btn btn-danger delete-button">Delete</button>
            </div>
        </div>
    </div>
</li>`
    return html;
}
//New class TaskManager starts here
class TaskManager {
    constructor(currentId) {
        this.tasks = [];
        this.currentId = 0;
    }

    //adds a new task to the tasks array
    addTask(name, description, assignedTo, dueDate, status = "TODO") {
        this.currentId++;

        const newTask = {
            id: this.currentId,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: status
        }
        this.tasks.push(newTask);
    }

    //renders tasks to the screen using Task Html from above
    render() {
        const tasksHtmlList = [];
        this.tasks.forEach(task => {
            let currentTask = task;
            let currentDate = new Date(currentTask.dueDate);
            let formattedDate = currentDate.toDateString();
            let taskHtml = createTaskHtml(currentTask.name, currentTask.description, currentTask.assignedTo, formattedDate, currentTask.status, currentTask.id);
            tasksHtmlList.push(taskHtml);
        });
        let tasksHtml = tasksHtmlList.join('\n');
        let tasksList = document.querySelector('#tasks-list');
        tasksList.innerHTML = tasksHtml;
    }

    //method to get the id of a task for done-button and delete-button
    getTaskById(taskId) {
        let foundTask;

        for (let i = 0; i < this.tasks.length; i++) {
            let task = this.tasks[i];
            if (task.id == taskId) {
                foundTask = task;
            }
        } return foundTask;
    }

    //save the tasks to Local Storage
    save() {
        let tasksJson = JSON.stringify(this.tasks);
        let currentId = this.currentId.toString();
        localStorage.setItem("tasks", tasksJson);
        localStorage.setItem("currentId", currentId);
        // console.log(tasksJson);
    }

    //Load the tasks from Local Storage
    load() {
        if (localStorage.getItem("tasks")) {
            let tasksJson = localStorage.getItem("tasks");
            this.tasks = JSON.parse(tasksJson);
        }
        if (localStorage.getItem("currentId")) {
            let currentId = localStorage.getItem("currentId");
            this.currentId = Number(currentId);
        }
    }

    //Delete a tasks saved in Local Storage based on id
    deleteTask(taskId) {
        let newTasks = [];

        this.tasks.forEach(task => {

            if (task.id !== taskId) {
                newTasks.push(task);
            };
        });
        this.tasks = newTasks;

    }
}

module.exports = TaskManager;