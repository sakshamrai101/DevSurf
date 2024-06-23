class ProjectCard extends HTMLElement {
    constructor(projectData = { name: 'New Project', description: '', tag: 'default' }) {
        super();
        this.projectData = projectData;
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const projectName = this.getAttribute('project-name') || 'Project Name';
        const description = this.getAttribute('description') || '';
        const tags = this.getAttribute('tags') || 'frontend';

        const cardContainer = document.createElement('div');
        cardContainer.setAttribute('class', 'card');
        cardContainer.innerHTML = `
            <input type="text" value="${this.projectData.name}" class="project-name" maxlength="12" readonly>
            <p>Brief Description:</p>
            <div class="description-box">
                <textarea placeholder="Max 50 chars..." maxlength="50" readonly>${this.projectData.description}</textarea>
            </div>
            <div class="tags">
                <label for="tags">Project Tags:</label>
                <select id="tags" disabled>
                    <option id="default-op" value="default" disabled="true" ${this.projectData.tag === 'default' ? 'selected' : ''}>Choose a Tag...</option>
                    <option value="frontend" ${this.projectData.tag === 'frontend' ? 'selected' : ''}>Frontend Development</option>
                    <option value="backend" ${this.projectData.tag === 'backend' ? 'selected' : ''}>Backend Development</option>
                    <option value="database" ${this.projectData.tag === 'database' ? 'selected' : ''}>Data Science</option>
                    <option value="network" ${this.projectData.tag === 'network' ? 'selected' : ''}>Native Development</option>
                    <option value="data" ${this.projectData.tag === 'data' ? 'selected' : ''}>Machine Learning and AI</option>
                </select>
            </div>
            <div class="button-container">
                <button id='save' style="display:none;">Save</button>
                <button id='cancel' style="display:none;">Cancel</button>
            </div>
            <button id='project-journal' class="journal-button">Project Journal</button>
            <button id='edit'><img src='/edit.ico' alt='Edit'></button>
            <button id='trash'><img src='/trash.png' alt='Trash'></button>
        `;
        this.shadowRoot.append(cardContainer);

        const style = document.createElement('style');
        style.textContent = `
            .card {
                position: relative;
                border: 1.5px solid black;
                border-radius: 10px;
                padding: 20px;
                background-color: rgba(54, 162, 235, 0.2);
                width: 100%;
                margin: 10px 0;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                box-sizing: border-box;
            }
            .card p {
                margin: 5px 0;
                color: black;
            }
            .card input, .card textarea, .card select {
                border: none;
                background: transparent;
                outline: none;
                resize: none;
                width: 100%;
                font-family: inherit;
                font-size: inherit;
            }
            .project-name {
                text-align: center;
                font-size: 1.2em;
                font-weight: bold;
                color: black;
            }
            .description-box {
                border: 1px solid white;
                border-radius: 5px;
                padding: 10px;
                margin-bottom: 10px;
                height: 30px;
                background-color: rgba(75, 192, 192, 0.2);
            }
            .description-box textarea {
                height: 100%;
                font-size: 12px;
            }
            .tags {
                display: flex;
                flex-direction: column;
                margin-bottom: 10px;
            }
            .tags label {
                color: black;
                margin-bottom: 5px;
            }
            .tags select {
                padding: 5px;
                border-radius: 5px;
                border: 1px solid white;
                background-color: rgba(10, 25, 47, 0.8);
                color: white;
            }
            .button-container {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
            }
            .journal-button {
                background-color: rgba(10, 25, 47, 0.8);
                color: white;
                border: none;
                border-radius: 5px;
                padding: 5px 10px;
                cursor: pointer;
                margin-top: 10px;
                text-align: center;
            }
            button {
                background-color: white;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                padding: 5px 10px;
            }
            #edit {
                position: absolute;
                top: 2px;
                right: 30px;
                background: none;
                padding: 2.5px;
            }
            #trash {
                position: absolute;
                top: 2px;
                right: 5px;
                background: none;
                padding: 2.5px;
            }
            #save, #cancel {
                background: white;
                color: black;
                border-radius: 5px;
                padding: 5px 10px;
            }
            button img {
                width: 15px;
                height: 15px;
            }
        `;
        this.shadowRoot.append(style);

        const editButton = this.shadowRoot.querySelector('#edit');
        const trashButton = this.shadowRoot.querySelector('#trash');
        const saveButton = this.shadowRoot.querySelector('#save');
        const cancelButton = this.shadowRoot.querySelector('#cancel');
        const projectNameInput = this.shadowRoot.querySelector('.project-name');
        const descriptionTextarea = this.shadowRoot.querySelector('textarea');
        const tagsSelect = this.shadowRoot.querySelector('#tags');
        const projectJournalButton = this.shadowRoot.querySelector('#project-journal');

        let originalProjectName = projectName;
        let originalDescription = description;
        let originalTags = tags;

        editButton.addEventListener('click', () => {
            originalProjectName = projectNameInput.value;
            originalDescription = descriptionTextarea.value;
            originalTags = tagsSelect.value;

            projectNameInput.removeAttribute('readonly');
            descriptionTextarea.removeAttribute('readonly');
            tagsSelect.removeAttribute('disabled');
            saveButton.style.display = 'inline-block';
            cancelButton.style.display = 'inline-block';
            editButton.style.display = 'none';
        });

        cancelButton.addEventListener('click', () => {
            projectNameInput.value = originalProjectName;
            descriptionTextarea.value = originalDescription;
            tagsSelect.value = originalTags;
            projectNameInput.setAttribute('readonly', true);
            descriptionTextarea.setAttribute('readonly', true);
            tagsSelect.setAttribute('disabled', true);
            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
            editButton.style.display = 'inline-block';
        });

        saveButton.addEventListener('click', () => {
            projectNameInput.setAttribute('readonly', true);
            descriptionTextarea.setAttribute('readonly', true);
            tagsSelect.setAttribute('disabled', true);
            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
            editButton.style.display = 'inline-block';

            const projectData = {
                projectName: projectNameInput.value,
                description: descriptionTextarea.value,
                tags: tagsSelect.value
            };
            localStorage.setItem(`project-${projectNameInput.value}`, JSON.stringify(projectData));
            document.querySelector('stats-graph').updateChart();
            saveProjectCards();
        });

        trashButton.addEventListener('click', () => {
            let projectsList = this.parentElement.querySelectorAll('project-card');
            console.log(this);
            let index = 0;
            while(this != projectsList[index]) {
                index++;
            }
            localStorage.removeItem(`project-${projectNameInput.value}`);
            console.log(index);
            localStorage.removeItem(`project_${index}`);
            renumberProjects(index);
            this.remove();
            document.querySelector('stats-graph').updateChart();
            saveProjectCards();
        });

        projectJournalButton.addEventListener('click', () => {
            let projectsList = this.parentElement.querySelectorAll('project-card');
            let index = 0;
            while(this != projectsList[index]) {
                index++;
            }
            let name = projectNameInput.value;
            window.location.href = `project.html?index=${index}&name=${encodeURIComponent(name)}`;
            
            //window.location.href = 'project.html';
        });

        tagsSelect.value = tags;
    }
}

function renumberProjects(startIndex) {
    let index = startIndex;
    let currentProject = localStorage.getItem(`project_${index + 1}`);

    while (currentProject) {
        localStorage.setItem(`project_${index}`, currentProject);
        index++;
        currentProject = localStorage.getItem(`project_${index + 1}`);
    }

    // Remove the last item which is now duplicated
    localStorage.removeItem(`project_${index}`);
}


class AddProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const cardContainer = document.createElement('div');
        cardContainer.setAttribute('class', 'card');
        cardContainer.innerHTML = `
            <h3 id='add'>+ Add</h3>
        `;
        this.shadowRoot.append(cardContainer);

        const style = document.createElement('style');
        style.textContent = `
            .card  {
                position: relative;
                border: 1.5px dashed black;
                border-radius: 10px;
                padding: 20px;
                background-color: rgba(75, 192, 192, 0.2);
                min-width: 10rem;
                min-height: 12rem;
                width: auto;
                height: 100%;
                margin: 10px 0;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                transition: background-color 0.3s ease;
                max-width: 350px;
            }
            card:hover {
                background-color: rgba(75, 192, 192, 0.4);
            }
            
            .card h3 {
                text-align: center;
                color: black;
                margin: 10px 0;
            }

            @media (max-width: 550px) {
                .card {
                    min-width: 0;
                    width: 80%;
                }
            }
        `;
        this.shadowRoot.append(style);

        cardContainer.addEventListener('click', () => {
            const newCardData = { name: 'New Project', description: '', tag: 'default' };
            const newCard = new ProjectCard(newCardData);
            this.parentElement.appendChild(newCard);
            saveProjectCards();
        });
    }
}

customElements.define('project-card', ProjectCard);
customElements.define('add-project-card', AddProjectCard);

// JavaScript for scrolling functionality
document.addEventListener('DOMContentLoaded', () => {
    loadProjectCards();

    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const projectCardsWrapper = document.querySelector('.project-card-wrapper');
    const projectCards = document.querySelector('.project-cards');

    let currentScrollPosition = 0;
    const cardWidth = projectCardsWrapper.clientWidth;
    const scrollAmount = cardWidth;

    // rightArrow.addEventListener('click', () => {
    //     const maxScroll = -(projectCards.scrollWidth - cardWidth);
    //     if (currentScrollPosition > maxScroll) {
    //         currentScrollPosition -= scrollAmount;
    //         projectCards.style.transform = `translateX(${currentScrollPosition}px)`;
    //     }
    // });

    // leftArrow.addEventListener('click', () => {
    //     if (currentScrollPosition < 0) {
    //         currentScrollPosition += scrollAmount;
    //         projectCards.style.transform = `translateX(${currentScrollPosition}px)`;
    //     }
    // });

    // Load saved project data from local storage
    const savedProjects = Object.keys(localStorage).filter(key => key.startsWith('project-'));
    savedProjects.forEach(key => {
        const projectData = JSON.parse(localStorage.getItem(key));
        const newCard = document.createElement('project-card');
        newCard.setAttribute('project-name', projectData.projectName);
        newCard.setAttribute('description', projectData.description);
        newCard.setAttribute('tags', projectData.tags);
        projectCards.appendChild(newCard);
    });

    // Update the radar chart with the saved project data
    document.querySelector('stats-graph').updateChart();
});

function saveProjectCards() {
    const projectCards = document.querySelectorAll('project-card');
    const projectDataArray = [];
    projectCards.forEach(card => {
        const projectData = {
            name: card.shadowRoot.querySelector('.project-name').value, // <-- Changed to get value from input field
            description: card.shadowRoot.querySelector('.description-box textarea').value,
            tag: card.shadowRoot.querySelector('#tags').value
        };
        projectDataArray.push(projectData);
    });
    localStorage.setItem('projectCards', JSON.stringify(projectDataArray));
}

function loadProjectCards() {
    const projectDataArray = JSON.parse(localStorage.getItem('projectCards')) || [];
    const projectCardsWrapper = document.querySelector('.project-cards');
    projectDataArray.forEach(projectData => {
        const projectCard = new ProjectCard(projectData);
        projectCardsWrapper.appendChild(projectCard);
    });
}