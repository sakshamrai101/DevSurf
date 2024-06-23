function toggleMenu() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}

window.onclick = function(event) {
    if (!event.target.matches('.hamburger-menu')) {
        const dropdownMenu = document.getElementById('dropdown-menu');
        if (dropdownMenu.style.display === 'block') {
            dropdownMenu.style.display = 'none';
        }
    }
}

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
/**/ 

function addMilestone() {
    const milestoneList = document.getElementById('milestone-list');
    let milestoneCount;
    if(milestoneList.children.length == 0) {
        milestoneCount = 1;
    }
    else {
        milestoneCount = milestoneList.children.length; 
    }
    const newMilestone = document.createElement('li');
    const timelineList = document.getElementById('timeline-elements');
    let newTimelineElement =  document.createElement('li');
    const timelineCount = timelineList.children.length;
    newTimelineElement.innerHTML = 
    `
    <span>Milestone ${milestoneCount}</span>
    `;
    newTimelineElement.classList.add('uncompleted');
    newTimelineElement.setAttribute('data-id', `milestone-${milestoneCount}`);
    timelineList.insertBefore(newTimelineElement, timelineList.children[timelineCount - 1]);
    newMilestone.innerHTML = `
        <div contenteditable="true" class="milestone-name" ondblclick="deleteMilestone(this)" onclick="toggleTasks(${milestoneCount});" oninput="updateTimeline(this);">Milestone ${milestoneCount}</div>
        <div class="progress-bar">
            <div class="progress" id="progress${milestoneCount}"></div>
        </div>
        <ul class="task-list" id="task-list${milestoneCount}">
            <!-- Tasks will be added here -->
        </ul>
        <button class="add-task" onclick="addTask(this, ${milestoneCount})" style="display: none;">Add Task +</button>
    `;

    milestoneList.appendChild(newMilestone);
    newMilestone.setAttribute('data-id', `milestone-${milestoneCount}`);
    // Move the "Add Milestone" button to be at the end of the list
    milestoneList.appendChild(document.querySelector('.add-milestone'));
    updateTimelineProgress(0);
}
function updateTimeline(milestoneElement) {
    const milestoneId = milestoneElement.closest('li').getAttribute('data-id');
    const milestoneName = milestoneElement.textContent;
    const timelineElement = document.querySelector
        (`#timeline-elements [data-id="${milestoneId}"] span`);
    if (timelineElement) {
        timelineElement.textContent = milestoneName;
    }
}
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
        
        timelineElement.classList.remove('uncompleted');
        timelineElement.classList.add('completed');
        const milestone = taskList.closest('li');
        milestone.querySelector('.milestone-name').classList.add('completed');
        //taskList.closest('ul').appendChild(milestone); 
        //this thing is causing an error
    }
    else 
    {
        timelineElement.classList.remove('completed');
        timelineElement.classList.add('uncompleted');
    }
    updateTimelineProgress();
    
}

function updateTimelineProgress(taskProgress) {
    let timeline = document.getElementById('timeline-elements');
    let completedMS = timeline.querySelectorAll('.completed');
    let completedMSNumber = completedMS.length - 1 ;
    let timelineNumber = timeline.getElementsByTagName('li').length - 1; 
    let tlProgress = completedMSNumber/timelineNumber * 100 ;
    let line = document.getElementById('line');
    line.style.background = `linear-gradient(to right,#00FFB0 ${tlProgress}%, #CCFF00 ${tlProgress}%)`;
    console.log(completedMSNumber);
}

function deleteTask(taskElement, milestoneId) {
    taskElement.closest('li').remove();
    updateProgress(milestoneId);
    
}

function renumberMilestones() {
    const milestoneList = document.getElementById('milestone-list');
    const timelineList = document.getElementById('timeline-elements');

    const milestones = milestoneList.querySelectorAll('li[data-id]');
    
    milestones.forEach((milestone, index) => {
        const newNumber = index + 1;
        const milestoneNameElement = milestone.querySelector('.milestone-name');
        const currentName = milestoneNameElement.textContent
            .replace(/\s*\d*$/, ''); // Remove the existing number at the end
        if(currentName == 'Milestone') {
            milestoneNameElement.textContent = `${currentName.trim()} ${newNumber}`;
        }
        else 
        {
            milestoneNameElement.textContent = `${currentName}`;
        }
        
        milestone.setAttribute('data-id', `milestone-${newNumber}`);
        
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

function deleteMilestone(milestoneElement) {
    const milestoneId = milestoneElement.closest('li').getAttribute('data-id');
    milestoneElement.closest('li').remove();

    const timelineElement = document.querySelector(`#timeline-elements [data-id="${milestoneId}"]`);
    if (timelineElement) {
        timelineElement.remove();
    }
    
    renumberMilestones();
    updateTimelineProgress(0);
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