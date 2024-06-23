/**
 * Class representing a note.
 * @class
 */
class Note {
    /**
     * Create a note.
     * @param {string} title - The title of the note.
     * @param {string} text - The markdown text of the note.
     */
    constructor(title, text) {
        this.title = title;
        this.text = text;
    }

    /**
     * Update the title and text of the note.
     * @param {string} newTitle - The new title of the note.
     * @param {string} newText - The new markdown text of the note.
     */
    update(newTitle, newText) {
        this.title = newTitle;
        this.text = newText;
    }
}

/**
 * Class representing a project.
 * @class
 */
class Project {
    /**
     * Create a project with default parameters.
     * @param {number} projID - The unique ID of the project.
     * @param {string} [name="New Project"] - The name of the project.
     * @param {string} [description="No description."] - A brief description of the project.
     * @param {string} [tag="Choose"] - A single related tag for the project chosen from a predefined set of options.
     * @param {Object} [milestonesTasks={}] - A dictionary of milestones and tasks where the key is a tuple of milestone name and number,
     *                                          and the value is an array of tuples of task name, task completion status (boolean) and task completion date.
     * @param {Object[]} [notes=[]] - A list of objects where each object contains a note title and markdown text of the note.
     */
    constructor(projID, name = "New Project", description = "No description.", 
                tag = "Choose", milestonesTasks = {}, notes = []) {
        this.projID = projID;
        this.name = name;
        this.description = description;
        this.tag = tag;  
        this.milestonesTasks = milestonesTasks;
        this.notes = notes;
    }

    /**
     * Update the project name.
     * @param {string} newName - The new name for the project.
     */
    updateName(newName) {
        this.name = newName;
    }

    /**
     * Update the project description.
     * @param {string} newDescription - The new description for the project.
     */
    updateDescription(newDescription) {
        this.description = newDescription;
    }

    /**
     * Update the project tag.
     * @param {string} newTag - The new tag for the project.
     */
    updateTag(newTag) {
        this.tag = newTag;
    }

    /**
     * Add or edit a milestone. If the milestone exists, it updates the milestone with new tasks.
     * @param {string} milestoneName - The name of the milestone.
     * @param {Array} tasks - Array of tasks to be associated with the milestone.
     */
    addMilestone(milestoneName, tasks = []) {
        this.milestonesTasks[milestoneName] = tasks;
    }

    /**
     * Remove a milestone from the project.
     * @param {string} milestoneName - The name of the milestone to remove.
     */
    removeMilestone(milestoneName) {
        if (this.milestonesTasks.hasOwnProperty(milestoneName)) {
            delete this.milestonesTasks[milestoneName];
        } else {
            throw new Error("Milestone not found");
        }
    }

    /**
     * Add a task to a specific milestone.
     * @param {string} milestoneName - The milestone to which the task will be added.
     * @param {Object} task - The task object { name: string, checked: boolean, date: string }.
     */
    addTaskToMilestone(milestoneName, task) {
        if (!this.milestonesTasks[milestoneName]) {
            this.milestonesTasks[milestoneName] = [];
        }
        this.milestonesTasks[milestoneName].push(task);
    }

    /**
     * Remove a task from a milestone.
     * @param {string} milestoneName - The milestone from which the task will be removed.
     * @param {number} taskIndex - The index of the task to remove.
     */
    removeTaskFromMilestone(milestoneName, taskIndex) {
        if (this.milestonesTasks[milestoneName] && this.milestonesTasks[milestoneName][taskIndex]) {
            this.milestonesTasks[milestoneName].splice(taskIndex, 1);
        } else {
            throw new Error("Task not found");
        }
    }

    /**
     * Edit the name of a task within a milestone.
     * @param {string} milestoneName - The milestone containing the task.
     * @param {number} taskIndex - The index of the task to update.
     * @param {string} newName - The new name for the task.
     */
    editTaskName(milestoneName, taskIndex, newName) {
        if (this.milestonesTasks[milestoneName] && this.milestonesTasks[milestoneName][taskIndex]) {
            this.milestonesTasks[milestoneName][taskIndex].name = newName;
        } else {
            throw new Error("Task not found");
        }
    }

    /**
     * Toggle the completion status of a task within a milestone, setting the date when marked completed.
     * @param {string} milestoneName - The milestone containing the task.
     * @param {number} taskIndex - The index of the task to update.
     * @param {boolean} isChecked - The completion status to set.
     */
    toggleTaskCompletion(milestoneName, taskIndex, isChecked) {
        if (this.milestonesTasks[milestoneName] && this.milestonesTasks[milestoneName][taskIndex]) {
            this.milestonesTasks[milestoneName][taskIndex].checked = isChecked;
            // Update the date to current date if task is marked completed
            if (isChecked) {
                this.milestonesTasks[milestoneName][taskIndex].date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
            }
        } else {
            throw new Error("Task not found");
        }
    }

    /**
     * Add a new note to the project.
     * @param {string} title - The title of the note.
     * @param {string} text - The markdown text of the note.
     */
    addNote(title, text) {
        this.notes.push(new Note(title, text));
    }

    /**
     * Update an existing note in the project.
     * @param {number} index - The index of the note to update.
     * @param {string} title - The new title of the note.
     * @param {string} text - The new markdown text of the note.
     */
    updateNote(index, title, text) {
        if (index >= 0 && index < this.notes.length) {
            this.notes[index].update(title, text);
        } else {
            throw new Error("Invalid note index");
        }
    }

    /**
     * Remove a note from the project.
     * @param {number} index - The index of the note to remove.
     */
    removeNote(index) {
        if (index >= 0 && index < this.notes.length) {
            this.notes.splice(index, 1);
        } else {
            throw new Error("Invalid note index");
        }
    }
}

/**
 * Class representing a user.
 * @class
 */
class User {
    /**
     * Create a user.
     * @param {number} userID - The unique identifier for the user.
     * @param {string} name - The name of the user.
     * @param {string} password - The password for the user.
     * @param {Project[]} projects - The projects associated with the user.
     */
    constructor(userID, name = 'Default', password, projects = []) {
        this.userID = userID;
        this.name = name;
        this.password = password;
        this.projects = projects;
    }

    /**
     * Add a new project to the user's list of projects.
     * @param {Project} project - The new project to add.
     */
    addProject(project) {
        if (this.getProjectById(project.projID)) {
            throw new Error("Project with the same ID already exists.");
        }
        this.projects.push(project);
    }

    /**
     * Update an existing project.
     * @param {number} projectID - The ID of the project to update.
     * @param {Project} updatedProject - The updated project details.
     * @returns {boolean} True if the update was successful, false otherwise.
     */
    editProject(projectID, updatedProject) {
        let index = this.projects.findIndex(p => p.projID === projectID);
        if (index !== -1) {
            this.projects[index] = updatedProject;
            return true;
        }
        return false;
    }

    /**
     * Delete a project from the user's list.
     * @param {number} projectID - The ID of the project to delete.
     * @returns {boolean} True if the deletion was successful, false otherwise.
     */
    deleteProject(projectID) {
        let index = this.projects.findIndex(p => p.projID === projectID);
        if (index !== -1) {
            this.projects.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * Retrieve a project by its ID.
     * @param {number} projID - The ID of the project.
     * @returns {Project|null} The project if found, null otherwise.
     */
    getProjectById(projID) {
        return this.projects.find(project => project.projID === projID) || null;
    }
}

/**
 * Class representing the overall data structure for page management.
 * @class
 */
class PagesData {
    /**
     * Create the page data context.
     * @param {User[]} users - List of all users.
     * @param {User} currUser - The current user logged in.
     * @param {Project} currProj - The current project being viewed or edited.
     */
    constructor(users = [], currUser = null, currProj = null) {
        this.users = users;
        this.currUser = currUser;
        this.currProj = currProj;
    }

    /**
     * Set the current user by their ID.
     * @param {number} userID - The ID of the user to set as current.
     */
    setCurrentUser(userID) {
        const user = this.getUser(userID);
        if (user) {
            this.currUser = user;
        } else {
            throw new Error("User not found");
        }
    }

    /**
     * Set the current project by its ID.
     * @param {number} projectID - The ID of the project to set as current.
     */
    setCurrentProject(projectID) {
        if (!this.currUser) {
            throw new Error("No current user set");
        }
        const project = this.currUser.projects.find(project => project.projID === projectID);
        if (project) {
            this.currProj = project;
        } else {
            throw new Error("Project not found");
        }
    }

    /**
     * Add a new user to the system.
     * @param {User} user - The new user to add.
     */
    addUser(user) {
        if (this.users.find(u => u.userID === user.userID)) {
            throw new Error("User already exists");
        }
        this.users.push(user);
    }

    /**
     * Retrieve a user by their ID.
     * @param {number} userID - The ID of the user to retrieve.
     * @returns {User} The user if found, undefined otherwise.
     */
    getUser(userID) {
        return this.users.find(user => user.userID === userID);
    }
}

/**
 * Save user data to local storage.
 * @param {PagesData} pagesDat - The array of users to save.
 */
function saveToLocalStorage(pagesDat) {
    const data = {
        users: pagesDat.users.map(user => ({
            userID: user.userID,
            name: user.name,
            password: user.password,
            projects: user.projects.map(project => ({
                projID: project.projID,
                name: project.name,
                description: project.description,
                tag: project.tag,
                milestonesTasks: project.milestonesTasks,
                notes: project.notes.map(note => ({
                    title: note.title,
                    text: note.text
                }))
            }))
        })),
        currUserID: pagesDat.currUser ? pagesData.currUser.userID : null,
        currProjID: pagesDat.currProj ? pagesData.currProj.projID : null
    };
    localStorage.setItem('softwareSurferesDevJournalPagesData', JSON.stringify(data));
}

/**
 * Load the entire PagesData from local storage.
 * @returns {PagesData} The PagesData instance loaded from local storage.
 */
function loadFromLocalStorage() {
    const dataStr = localStorage.getItem('softwareSurferesDevJournalPagesData');
    if (!dataStr) return new PagesData(); // Return an empty PagesData if nothing is stored
    const data = JSON.parse(dataStr);

    const users = data.users.map(userData => new User(
        userData.userID,
        userData.name,
        userData.password,
        userData.projects.map(proj => new Project(
            proj.projID,
            proj.name,
            proj.description,
            proj.tag,
            proj.milestonesTasks,
            proj.notes.map(note => new Note(note.title, note.text))
        ))
    ));

    const pagesData = new PagesData(users);
    pagesData.currUser = users.find(user => user.userID === data.currUserID) || null;
    pagesData.currProj = pagesData.currUser ? pagesData.currUser.projects.find(project => project.projID === data.currProjID) : null;

    return pagesData;
}

/**
 * Set the current user and save the update to local storage.
 * @param {PagesData} pagesData - The instance of PagesData.
 * @param {number} userID - The ID of the user to set as current.
 */
function updateAndSaveCurrUser(pagesData, userID) {
    const user = pagesData.users.find(u => u.userID === userID);
    if (!user) {
        throw new Error("User not found");
    }
    pagesData.currUser = user;
    saveToLocalStorage(pagesData);
}

/**
 * Loads placeholder data with dummy users and projects.
 * @returns {PagesData} An instance of PagesData populated with dummy data.
 */
function loadPlaceholderData() {
    // Dummy notes
    const notes1 = [
        new Note("Meeting Notes", "## Meeting on 2024-06-01\nDiscussed project scope and initial requirements."),
        new Note("Research Summary", "## Research on market trends\nConcluded that the market is moving towards sustainable solutions.")
    ];

    const notes2 = [
        new Note("Brainstorming Session", "## Ideas from 2024-05-30\nGreat ideas on potential features for our app."),
        new Note("User Interviews", "## Feedback Summary\nCollected from user interviews conducted last week.")
    ];

    // Dummy projects
    const projects1 = [
        new Project(0, "Green Energy App", "App to monitor energy consumption.", "Data Science", {
            "Design": [{ name: "Create wireframes", checked: false, date: "" }],
            "Development": [{ name: "Initial setup", checked: true, date: "2024-05-20" }]
        }, notes1),
        new Project(1, "Online Learning Platform", "Platform to provide online courses.", "Frontend Developement", {
            "Planning": [{ name: "Define curriculum", checked: true, date: "2024-05-15" }],
            "Launch": [{ name: "Prepare launch event", checked: false, date: "" }]
        }, [])
    ];

    const projects2 = [
        new Project(0, "Social Media App", "A social media app focused on privacy.", "Backend Developement", {
            "Research": [{ name: "Competitor analysis", checked: true, date: "2024-05-18" }],
            "Marketing": [{ name: "Social media campaign", checked: false, date: "" }]
        }, notes2)
    ];

    // Dummy users
    const users = [
        new User(1, "Alice Johnson", "123456", projects1),
        new User(2, "Bob Smith", "789012", projects2)
    ];

    // Instance of PagesData with dummy data
    const pagesData = new PagesData(users);

    return pagesData;
}

module.exports = { Note, Project, User, PagesData, saveToLocalStorage, loadFromLocalStorage, updateAndSaveCurrUser, loadPlaceholderData};