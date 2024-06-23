const { PagesData, User, Project } = require('../source/script/DataStorage.js');

describe('PagesData class tests', () => {
    let pagesData, user1, user2;

    beforeEach(() => {
        user1 = new User(1, 'JohnDoe', 'password123', []);
        user2 = new User(2, 'JaneDoe', 'password123', []);
        pagesData = new PagesData([user1, user2]);
    });

    test('addUser - adds a user successfully and checks duplicate prevention', () => {
        const newUser = new User(3, 'NewUser', 'password123', []);
        pagesData.addUser(newUser);
        expect(pagesData.users).toContain(newUser);
        expect(() => pagesData.addUser(newUser)).toThrow("User already exists");
    });

    test('setCurrentUser - sets the current user correctly', () => {
        pagesData.setCurrentUser(1);
        expect(pagesData.currUser).toBe(user1);
    });

    test('setCurrentProject - sets the current project correctly', () => {
        const project = new Project(1, 'Project 1', 'Description', 'Tag', {}, []);
        user1.addProject(project);
        pagesData.setCurrentUser(1);
        pagesData.setCurrentProject(1);
        expect(pagesData.currProj).toBe(project);
    });
});