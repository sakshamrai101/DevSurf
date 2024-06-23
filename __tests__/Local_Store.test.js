const { PagesData, User, Project, loadFromLocalStorage, saveToLocalStorage } = require('../source/script/DataStorage.js');

describe('Local Storage Functions', () => {
    const mockLocalStorage = {};

    beforeEach(() => {
        global.localStorage = {
            getItem: jest.fn((key) => mockLocalStorage[key]),
            setItem: jest.fn((key, value) => {
                mockLocalStorage[key] = value.toString();
            }),
            clear: jest.fn(() => {
                Object.keys(mockLocalStorage).forEach(key => delete mockLocalStorage[key]);
            })
        };
    });

    test('saveToLocalStorage - saves data correctly', () => {
        const pagesData = new PagesData();
        saveToLocalStorage(pagesData);  // Assuming you have a function to serialize PagesData
        expect(localStorage.setItem).toHaveBeenCalled();
        expect(mockLocalStorage['softwareSurferesDevJournalPagesData']).toBeDefined();
    });

    test('loadFromLocalStorage - loads data correctly', () => {
        const dummyData = JSON.stringify({ users: [], currUserID: null, currProjID: null });
        localStorage.setItem('softwareSurferesDevJournalPagesData', dummyData);
        const loadedData = loadFromLocalStorage();  // Assuming you have a function to deserialize PagesData
        expect(localStorage.getItem).toHaveBeenCalled();
        expect(loadedData).toBeDefined();
    });
});