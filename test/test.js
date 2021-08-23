
const { assert, expect } = require('chai');
const { describe, it, afterEach } = require('mocha');
// const assert = require('assert');
const TaskManager = require('../js/taskManager.js');

describe('TaskManager', function () {
    describe('addTask', function () {

        it('should add a new task to the tasks array', function () {

            //setup
            const TaskList = new TaskManager;
            const expectedResult = [
                {
                    id: 1,
                    name: "hello2",
                    description: "this is a test2",
                    assignedTo: "tester2",
                    dueDate: "2021-05-20",
                    status: "INPROGRESS"
                }
            ]

            //exercise
            TaskList.addTask("hello2", "this is a test2", "tester2", "2021-05-20", "INPROGRESS");

            //verify
            assert.deepStrictEqual(expectedResult, TaskList.tasks);
        });
    });
    describe('deleteTask', function () {

        it('should remove a task from the tasks array', function () {

            //setup
            const TaskList = new TaskManager;
            TaskList.tasks = [
                {
                    id: 1,
                    name: "hello",
                    description: "this is a test",
                    assignedTo: "tester",
                    dueDate: "2021-05-20",
                    status: "INPROGRESS"
                },
                {
                    id: 2,
                    name: "hello2",
                    description: "this is a test2",
                    assignedTo: "tester2",
                    dueDate: "2021-05-20",
                    status: "INPROGRESS"
                },
                {
                    id: 3,
                    name: "hello3",
                    description: "this is a test3",
                    assignedTo: "tester3",
                    dueDate: "2021-05-20",
                    status: "INPROGRESS"
                }
            ]

            const expectedResult = [

                {
                    id: 1,
                    name: "hello",
                    description: "this is a test",
                    assignedTo: "tester",
                    dueDate: "2021-05-20",
                    status: "INPROGRESS"
                },
                {
                    id: 2,
                    name: "hello2",
                    description: "this is a test2",
                    assignedTo: "tester2",
                    dueDate: "2021-05-20",
                    status: "INPROGRESS"
                }
            ]

            //exercise
            TaskList.deleteTask(3);

            //verify
            assert.deepStrictEqual(expectedResult, TaskList.tasks);
        });
    });
    describe('getTaskById', function () {

        it('should find a task based on taskId', function () {

            //setup
            let TaskList = new TaskManager;
            TaskList.tasks = [
                {
                    id: 1,
                    name: "hello",
                    description: "this is a test",
                    assignedTo: "tester",
                    dueDate: "2021-05-20",
                    status: "INPROGRESS"
                },
                {
                    id: 2,
                    name: "hello2",
                    description: "this is a test2",
                    assignedTo: "tester2",
                    dueDate: "2021-05-20",
                    status: "INPROGRESS"
                },
                {
                    id: 3,
                    name: "hello3",
                    description: "this is a test3",
                    assignedTo: "tester3",
                    dueDate: "2021-05-20",
                    status: "INPROGRESS"
                }
            ]

            const expectedResult =
            {
                id: 2,
                name: "hello2",
                description: "this is a test2",
                assignedTo: "tester2",
                dueDate: "2021-05-20",
                status: "INPROGRESS"
            }


            //exercise


            //verify
            assert.deepStrictEqual(expectedResult, TaskList.getTaskById(2));
        });
    });
    describe('class constructor \n', () => {
        // add a test hook
        afterEach(() => {
            console.log('\n...Completed class instance test!\n');
        });
        it('should create an instance of the class', () => {
            const newInstance = new TaskManager();
            console.log(`   Creating a ${newInstance} class for testing!`);
            expect(newInstance).to.be.a('object');
        });
    });
})

// Add a test case that tests how the TaskManager is initialized, ie: the constructor being called when a new TaskManager() is initialized.