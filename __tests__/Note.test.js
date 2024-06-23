const { Note } = require('../source/script/DataStorage.js');

describe('Note class tests', () => {
    let note;

    beforeEach(() => {
        note = new Note('Initial Title', 'Initial text.');
    });

    test('update - updates both title and text successfully', () => {
        note.update('Updated Title', 'Updated text.');
        expect(note.title).toBe('Updated Title');
        expect(note.text).toBe('Updated text.');
    });
});