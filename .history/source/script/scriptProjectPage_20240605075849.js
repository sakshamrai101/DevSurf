/**
 * Toggles the display of the dropdown menu when the hamburger menu is clicked.
 */

let currentWidth = 100;
let mediaWidth = 300;
let completed = false;
function toggleMenu() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

/**
 * Closes the dropdown menu when clicking outside of it.
 * 
 * @param {Event} event - The click event of the hamburger menu.
 */
window.onclick = function(event) {
    // if (!event.target.matches('.hamburger-menu')) {
    //     const dropdownMenu = document.getElementById('dropdown-menu');
    //     if (dropdownMenu.style.display === 'block') {
    //         dropdownMenu.style.display = 'none';
    //     }
    // }
}

/**
 * Adds a new task to the specified milestone.
 * 
 * @param {HTMLElement} button - The button element that triggered the function.
 * @param {number} milestoneId - The number of the milestone to which the task is being added.
 */
function addTask(button, milestoneId) {
    const taskList = document.getElementById(`task-list${milestoneId}`);
    const taskCount = taskList.children.length + 1;
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <div class="task-item">
            <input type="checkbox" id="task-${milestoneId}-${taskCount}" onclick="updateProgress(${milestoneId})">
            <label for="task-${milestoneId}-${taskCount}" ondblclick="deleteTask(this, ${milestoneId})">Task ${taskCount}</label>
        </div>
    `;
    taskList.appendChild(newTask);  
    
}

/**
 * Adds a new task with a specified state (checked or not).
 * 
 * @param {HTMLElement} button - The button element that triggered the function.
 * @param {number} milestoneId - The number of the milestone to which the task is being added.
 * @param {string} taskText - The text content of the task.
 * @param {boolean} isChecked - Whether the task is checked or not.
 */
function addTaskWithState(button, milestoneId, taskText, isChecked) {
    const taskList = document.getElementById(`task-list${milestoneId}`);
    const taskCount = taskList.children.length + 1;
    const newTask = document.createElement('li');
    newTask.innerHTML = `
        <div class="task-item">
            <input type="checkbox" id="task-${milestoneId}-${taskCount}" onclick="updateProgress(${milestoneId})" ${isChecked ? 'checked' : ''}>
            <label for="task-${milestoneId}-${taskCount}" ondblclick="deleteTask(this, ${milestoneId})">${taskText}</label>
        </div>
    `;
    taskList.appendChild(newTask);  
}

/**
 * Adds a new milestone to the list.
 */

function addMilestone(milestoneName) {

    const milestoneList = document.getElementById('milestone-list');
    let milestoneCount;
    if(milestoneList.children.length == 0) {
        milestoneCount = 1;
    }
    else {
        milestoneCount = milestoneList.children.length; 
    }
    let newMilestone = document.createElement('li');
    let timelineList = document.getElementById('timeline-elements');
    let newTimelineElement =  document.createElement('li');
    let timelineCount = timelineList.children.length;
    newTimelineElement.innerHTML = 
    `
    <span>Milestone ${milestoneCount}</span>
    `;
    newTimelineElement.classList.add('uncompleted');
    newTimelineElement.setAttribute('data-id', `milestone-${milestoneCount}`);
    timelineList.insertBefore(newTimelineElement, timelineList.children[timelineCount - 1]);
    if (milestoneName == '') {
        milestoneName = `Milestone ${milestoneCount}`;
    }
    newMilestone.innerHTML = getMilestoneHTML(milestoneCount,milestoneName);

    //dynamically changes milestone name on TIMELINE
    const milestoneNameElement = newMilestone.querySelector('.milestone-name');
    milestoneNameElement.addEventListener('input', function() {
        updateTimeline(this);
    });
    
    milestoneList.appendChild(newMilestone);
    newMilestone.setAttribute('data-id', `milestone-${milestoneCount}`);
    // Move the "Add Milestone" button to be at the end of the list
    milestoneList.appendChild(document.querySelector('.add-milestone'));

    //dynamically adds to the timeline to make it bigger when certain
    //milestone number is reached
    
    if(milestoneCount > 3 ) {
        addWidth();
    }
    updateTimelineProgress();
}
/**
 * Updates the timeline if > 3 milestones exist
 * 
 */
function addWidth() {
    let timelineContainer = document.
        getElementsByClassName('timeline-container')[0];
    let timelineList = document.getElementById('timeline-elements');
    // Calculate the new width (current width + 20%)
    currentWidth += 24;
    let newWidth = currentWidth+ '%';
    timelineList.style.width = newWidth ;
    line = document.getElementById('line');
    line.style.width = newWidth;
    timelineContainer.style.overflowX = 'auto';
}
/**
 * Updates the milestone name on the timeline based on the input.
 * 
 * @param {HTMLElement} milestoneElement - The milestone element being updated.
 */

function updateTimeline(milestoneElement) {
    const milestoneId = milestoneElement.closest('li').getAttribute('data-id');
    const milestoneName = milestoneElement.textContent;
    const timelineElement = document.querySelector
        (`#timeline-elements [data-id="${milestoneId}"] span`);
    if (timelineElement) {
        timelineElement.textContent = milestoneName;
    }
}
/**
 * Toggles the visibility of the tasks and the "Add Task" button for the specified milestone.
 * 
 * @param {number} milestoneId - The milestone number whose tasks are being toggled.
 */
function toggleTasks(milestoneId) {
    const taskList = document.getElementById(`task-list${milestoneId}`);
    const addTaskButton = taskList.nextElementSibling;
    if (taskList.style.display === 'block') {
        taskList.style.display = 'none';
        addTaskButton.style.display = 'none';
    } else {
        taskList.style.display = 'block';
        addTaskButton.style.display = 'block';
    }
}
/**
 * Updates the progress bar status for the specified milestone based on 
 * completed tasks.
 * 
 * @param {number} milestoneId - The ID of the milestone being updated.
 */
function updateProgress(milestoneId) {
    const taskList = document.getElementById(`task-list${milestoneId}`);
    const tasks = taskList.querySelectorAll('li');
    const completedTasks = taskList.querySelectorAll
        ('input[type="checkbox"]:checked').length;
    const progress = document.getElementById(`progress${milestoneId}`);
    const progressPercentage = (completedTasks / tasks.length) * 100;
    progress.style.width = `${progressPercentage}%`;
    let timelineElement = document.querySelector
        (`#timeline-elements [data-id="milestone-${milestoneId}"]`);
    if (completedTasks === tasks.length && tasks.length > 0) {
        // All tasks are completed
        timelineElement.classList.remove('uncompleted');
        timelineElement.classList.add('completed');
        const milestone = taskList.closest('li');
        milestone.querySelector('.milestone-name').classList.add('completed');
        } 
    else {
        // Not all tasks are completed
        timelineElement.classList.remove('completed');
        timelineElement.classList.add('uncompleted');
    }
    
    // Update overall timeline progress
    updateTimelineProgress();
    
}
/**
 * Updates the overall progress of the timeline based on completed milestones.
 */
function updateTimelineProgress() {
    const milestoneList = document.getElementById('milestone-list');
    const completedMI = milestoneList.querySelectorAll('.completed');
    const timelineList = document.getElementById('timeline-elements');
    if(completedMI == timelineNumber-1) {
        tlProgress = currentWidth;
        timelineComp[timelineNumber].classList.remove('uncompleted');
        timelineComp[timelineNumber].classList.add('completed');
    }
    else {
        tlProgress = completedMI/timelineNumber * currentWidth;
        tlProgress = tlProgress.toFixed(2);
        timelineComp[timelineNumber].classList.remove('completed');
        timelineComp[timelineNumber].classList.add('uncompleted');
    }
    
    console.log(tlProgress);
    let line = document.getElementById('line2');
    line.style.width = tlProgress + '%';
}
/**
 * Deletes a task and updates the progress.
 * 
 * @param {HTMLElement} taskElement - The task element to be deleted.
 * @param {number} milestoneId - The milestone number
 * from which the task is being deleted.
 */
function deleteTask(taskElement, milestoneId) {
    taskElement.closest('li').remove();
    updateProgress(milestoneId);
    
}

/**
 * Renumbers milestones and updates their content and IDs when a milestone
 * is deleted
 */
function renumberMilestones() {
    const milestoneList = document.getElementById('milestone-list');
    const timelineList = document.getElementById('timeline-elements');
    const milestones = milestoneList.querySelectorAll('li[data-id]');
    
    milestones.forEach((milestone, index) => {
        const newNumber = index + 1;
        const milestoneNameElement = milestone.querySelector('.milestone-name');
        const currentName = milestoneNameElement.textContent
            .replace(/\s*\d*$/, ''); // Remove the existing number at the end
        const tasks = milestone.querySelector('.task-list').innerHTML;
        if(currentName == 'Milestone') {
            milestoneNameElement.textContent = `${currentName.trim()} ${newNumber}`;
        }
        else 
        {
            milestoneNameElement.textContent = `${currentName}`;
        }
        milestone.innerHTML = getMilestoneHTML
            (newNumber,milestoneNameElement.textContent);
        milestone.setAttribute('data-id', `milestone-${newNumber}`);
        milestone.querySelector('.task-list').innerHTML = tasks;
        
    });

    const timelineElements = timelineList.querySelectorAll('li[data-id]');
    
    timelineElements.forEach((timeline, index) => {
        const newNumber = index + 1;
        const milestoneId = `milestone-${newNumber}`;
        const milestone = milestoneList.querySelector(`li[data-id="${milestoneId}"]`);
        const milestoneName = milestone ? milestone.querySelector('.milestone-name').textContent : `Milestone ${newNumber}`;
        timeline.querySelector('span').textContent = milestoneName;
        timeline.setAttribute('data-id', milestoneId);
    });
}

/**
 * Returns the HTML structure for a milestone given its number.
 * 
 * @param {number} milestoneNumber - The number of the milestone.
 * @returns {string} The HTML structure for the milestone.
 */
function getMilestoneHTML(milestoneNumber,milestoneName) {
    return `
        <div contenteditable="true" class="milestone-name" ondblclick="deleteMilestone(this)" onclick="toggleTasks(${milestoneNumber});">${milestoneName}</div>
        <div class="progress-bar">
            <div class="progress" id="progress${milestoneNumber}"></div>
        </div>
        <ul class="task-list" id="task-list${milestoneNumber}">
            <!-- Tasks will be added here -->
        </ul>
        <button class="add-task" onclick="addTask(this, ${milestoneNumber})" style="display: none;">Add Task +</button>
    `;
}
/**
 * Deletes a milestone and updates the timeline and progress.
 * 
 * @param {HTMLElement} milestoneElement - The milestone element to be deleted.
 */

function deleteMilestone(milestoneElement) {
    const milestoneId = milestoneElement.closest('li').getAttribute('data-id');
    milestoneElement.closest('li').remove();
    const milestoneList = document.getElementById('milestone-list');
    let  milestoneCount = milestoneList.children.length;
    const timelineElement = document.querySelector(`#timeline-elements [data-id="${milestoneId}"]`);
    if (timelineElement) {
        timelineElement.remove();
    }
    if(milestoneCount > 4) {
        subWidth();
    }
    else {
        resetWidth();
    }
    
    renumberMilestones();
    updateTimelineProgress();
}
/**
 * Updates the timeline width when a milestone is deleted
 * 
 */
function subWidth () {
     let timelineContainer = document.
        getElementsByClassName('timeline-container')[0];
    let timelineList = document.getElementById('timeline-elements');
    // Calculate the new width (current width + 20%)
    currentWidth -= 24;
    let newWidth = currentWidth+ '%';
    timelineList.style.width = newWidth ;
    line = document.getElementById('line');
    line.style.width = newWidth;
}

/**
 * resets the width of the timeline when milestones <= 3
 * 
 */

function resetWidth() {
    let timelineContainer = document.
        getElementsByClassName('timeline-container')[0];
    let timelineList = document.getElementById('timeline-elements');
    timelineList.style.width = 100 + '%';
    line = document.getElementById('line');
    line.style.width = 100 + '%';
    currentWidth = 100;
    timelineContainer.style.overflowX = 'visible';
}

/**
 * saves milestones to storage after a milestone is created/deleted
 */

function saveMilestoneToStorage () {
    let milestones = getMilestoneArray();
    let milestoneNames = [];
    for (let i = 0; i < milestones.length; i++) {
        const nameDiv = milestones[i].querySelector('.milestone-name');
        const milestoneName = nameDiv.textContent;
        milestoneNames.push(milestoneName);
    }
    let stored = JSON.stringify(milestoneNames);
    localStorage.setItem('milestones', stored)
}

/**
 * saves tasks to storage after a milestone is created/deleted
 */
function saveTasksArrayToStorage () {
    const milestones = getMilestoneArray();
    const taskArray = []; 
    milestones.forEach(milestone => {
        const taskList = milestone.querySelector('.task-list');
        if (taskList) {
            const tasks = [];
            taskList.querySelectorAll('li').forEach(task => {
                const checkbox = task.querySelector('input[type="checkbox"]');
                const label = task.querySelector('label');
                tasks.push({
                    text: label.textContent,
                    checked: checkbox.checked
                });
            });
            taskArray.push(tasks);
        }
    });
    const stored = JSON.stringify(taskArray);
    localStorage.setItem('tasks', stored);
}

function getMilestoneArray () {
    const milestoneList = document.getElementById('milestone-list');
    let milestones = milestoneList.querySelectorAll('li[data-id]');
    return milestones;
}
document.addEventListener("DOMContentLoaded", function () {
    const notepad = document.getElementById('notepad');
    const addEntryButton = document.getElementById('addEntryButton');
    const entriesContainer = document.querySelector('.entries-container');
    const dynamicIsland = document.getElementById('dynamicIsland');
    const closeIsland = document.getElementById('closeIsland');
    const islandTitle = document.getElementById('islandTitle');
    const islandContent = document.getElementById('islandContent');
    const islandImages = document.getElementById('islandImages');

    // Load entries from localStorage and display them
    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach(entry => addEntryTile(entry.title, entry.content, entry.images));
    }

    function loadMilestonesAndTasks(){
        const milestones = JSON.parse(localStorage.getItem('milestones')) || [];
    milestones.forEach(milestone => addMilestone(milestone));
    const milestoneList = getMilestoneArray();
    const taskArray = JSON.parse(localStorage.getItem('tasks')) || [];
    
    for (let i = 0; i < milestoneList.length; i++) {
        const taskButton = milestoneList[i].querySelector('button');
        const tasks = taskArray[i];
        tasks.forEach(task => {
            addTaskWithState(taskButton, i + 1, task.text, task.checked);
        });
    }
    }
    // Save a new entry to localStorage
    function saveEntry(title, content, images) {
        const entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.push({ title, content, images });
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    // Add a new entry tile to the left container
    function addEntryTile(title, content, images = []) {
        const entryTile = document.createElement('div');
        entryTile.classList.add('entry-tile');

        const entryTitle = document.createElement('h3');
        entryTitle.textContent = title;

        const entryContent = document.createElement('p');
        entryContent.textContent = content.length > 100 ? content.substring(0, 100) + '...' : content;

        const trashIcon = document.createElement('img');
        trashIcon.src = '../img/trash.png';
        trashIcon.alt = 'Delete';
        trashIcon.classList.add('trash-icon');
        trashIcon.onclick = (event) => {
            event.stopPropagation();
            entriesContainer.removeChild(entryTile);
            // Remove the entry from localStorage
            const entries = JSON.parse(localStorage.getItem('entries')) || [];
            const updatedEntries = entries.filter(entry => entry.title !== title && entry.content !== content);
            localStorage.setItem('entries', JSON.stringify(updatedEntries));
        };

        entryTile.onclick = () => {
            showDynamicIsland(title, content, images);
        };

        entryTile.appendChild(entryTitle);
        entryTile.appendChild(entryContent);
        entryTile.appendChild(trashIcon);

        entriesContainer.appendChild(entryTile);
    }

    // Show the dynamic island with entry details
    function showDynamicIsland(title, content, images) {
        islandTitle.textContent = title;
        islandContent.textContent = content;
        islandImages.innerHTML = '';
        images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            islandImages.appendChild(img);
        });
        dynamicIsland.style.display = 'block';
    }

    // Handle the close button for the dynamic island
    closeIsland.onclick = () => {
        dynamicIsland.style.display = 'none';
    };

    // Handle the add entry button click
    addEntryButton.addEventListener('click', function () {
        const content = notepad.value.trim();
        if (content) {
            const title = `Entry ${entriesContainer.children.length + 1}`;
            const images = []; // Assuming images are not handled yet
            addEntryTile(title, content, images);
            saveEntry(title, content, images);
            notepad.value = '';
        }
    });

    loadEntries();
    loadMilestonesAndTasks();
     // Add event listener to timeline items
     document.getElementById('timeline-elements').addEventListener('click', function (event) {
        const target = event.target.closest('li');
        if (target && target.dataset.id) {
            const milestoneId = target.dataset.id;
            const milestoneElement = document.querySelector(`#milestone-list [data-id="${milestoneId}"]`);
            if (milestoneElement) {
                const milestoneName = milestoneElement.querySelector('.milestone-name').textContent;
                const taskElements = milestoneElement.querySelectorAll('.task-item label');
                const tasks = Array.from(taskElements).map(task => task.textContent);
                showMilestoneDetailsInIsland(milestoneName, tasks);
            }
        }
    });

    function showMilestoneDetailsInIsland(milestoneName, tasks) {
        islandTitle.textContent = milestoneName;
        islandContent.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('p');
            taskItem.textContent = task;
            islandContent.appendChild(taskItem);
        });
        dynamicIsland.style.display = 'block';
    }
});
window.addEventListener('beforeunload', function () {
    saveMilestoneToStorage();
    saveTasksArrayToStorage();
});
window.addEventListener('unload',function () {
    saveMilestoneToStorage();
    saveTasksArrayToStorage();
});
