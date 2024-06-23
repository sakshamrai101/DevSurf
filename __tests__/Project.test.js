const { Project, Note } = require('../source/script/DataStorage.js');

describe('Project class tests', () => {
    let project;

    beforeEach(() => {
        project = new Project(1, 'Initial Project', 'Initial Description', 'Initial Tag', {}, []);
    });

    test('addMilestone - adds a milestone successfully', () => {
        const tasks = [{ name: 'Task 1', checked: false, date: '2023-01-01' }];
        project.addMilestone('Milestone 1', tasks);
        expect(project.milestonesTasks['Milestone 1']).toEqual(tasks);
    });

    test('removeMilestone - removes a milestone successfully', () => {
        project.addMilestone('Milestone 1', []);
        project.removeMilestone('Milestone 1');
        expect(project.milestonesTasks).not.toHaveProperty('Milestone 1');
    });

    test('addTaskToMilestone - adds a task to an existing milestone', () => {
        project.addMilestone('Milestone 1', []);
        const task = { name: 'Task 1', checked: false, date: '2023-01-01' };
        project.addTaskToMilestone('Milestone 1', task);
        expect(project.milestonesTasks['Milestone 1']).toContainEqual(task);
    });

    test('editTaskName - edits the name of an existing task', () => {
        const task = { name: 'Task 1', checked: false, date: '2023-01-01' };
        project.addMilestone('Milestone 1', [task]);
        project.editTaskName('Milestone 1', 0, 'Updated Task 1');
        expect(project.milestonesTasks['Milestone 1'][0].name).toBe('Updated Task 1');
    });

    test('toggleTaskCompletion - toggles the completion status of a task and updates the date', () => {
        const task = { name: 'Task 1', checked: false, date: '' };
        project.addMilestone('Milestone 1', [task]);
        project.toggleTaskCompletion('Milestone 1', 0, true);
        const updatedDate = new Date().toISOString().slice(0, 10);  // Assuming the test is run on the date of completion
        expect(project.milestonesTasks['Milestone 1'][0].checked).toBe(true);
        expect(project.milestonesTasks['Milestone 1'][0].date).toBe(updatedDate);
    });

    test('removeTaskFromMilestone - removes a task from a milestone', () => {
        const task = { name: 'Task 1', checked: false, date: '2023-01-01' };
        project.addMilestone('Milestone 1', [task]);
        project.removeTaskFromMilestone('Milestone 1', 0);
        expect(project.milestonesTasks['Milestone 1']).toEqual([]);
    });
});