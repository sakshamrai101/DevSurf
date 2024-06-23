class ProjectCard extends HTMLElement {
    constructor(projectData = {index: 0, name: 'New Project', description: '', tag: 'default' }) {
        super();
        this.projectData = projectData;
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
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
                    <option value="frontend" ${this.projectData.tag === 'frontend' ? 'selected' : ''}>Frontend Engineering</option>
                    <option value="backend" ${this.projectData.tag === 'backend' ? 'selected' : ''}>Backend Engineering</option>
                    <option value="database" ${this.projectData.tag === 'database' ? 'selected' : ''}>Database Engineering</option>
                    <option value="network" ${this.projectData.tag === 'network' ? 'selected' : ''}>Network Engineering</option>
                    <option value="data" ${this.projectData.tag === 'data' ? 'selected' : ''}>Data Analytics Engineering</option>
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
        this.addStyles();
        this.addEventListeners();
    }

    addStyles() {
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
            .card h4, .card p {
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
            .journal-button, button {
                background-color: white;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                padding: 5px 10px;
            }
            #edit, #trash {
                position: absolute;
                top: 2px;
                right: 5px;
                background: none;
                padding: 2.5px;
            }
            #edit {
                right: 30px;
            }
            button img {
                width: 15px;
                height: 15px;
            }
            #save, #cancel {
                background: white;
                color: black;
                border-radius: 5px;
                padding: 5px 10px;
            }
        `;
        this.shadowRoot.append(style);
    }

    addEventListeners() {
        const editButton = this.shadowRoot.querySelector('#edit');
        const trashButton = this.shadowRoot.querySelector('#trash');
        const saveButton = this.shadowRoot.querySelector('#save');
        const cancelButton = this.shadowRoot.querySelector('#cancel');
        const projectNameInput = this.shadowRoot.querySelector('.project-name');
        const descriptionTextarea = this.shadowRoot.querySelector('textarea');
        const tagsSelect = this.shadowRoot.querySelector('#tags');
        const projectJournalButton = this.shadowRoot.querySelector('#project-journal');

        editButton.addEventListener('click', () => {
            projectNameInput.removeAttribute('readonly');
            descriptionTextarea.removeAttribute('readonly');
            tagsSelect.removeAttribute('disabled');
            saveButton.style.display = 'block';
            cancelButton.style.display = 'block';
            editButton.style.display = 'none';
        });

        cancelButton.addEventListener('click', () => {
            projectNameInput.value = this.projectData.name;
            descriptionTextarea.value = this.projectData.description;
            tagsSelect.value = this.projectData.tag;

            projectNameInput.setAttribute('readonly', true);
            descriptionTextarea.setAttribute('readonly', true);
            tagsSelect.setAttribute('disabled', true);
            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
            editButton.style.display = 'block';
        });

        saveButton.addEventListener('click', () => {
            this.projectData.name = projectNameInput.value;
            this.projectData.description = descriptionTextarea.value;
            this.projectData.tag = tagsSelect.value;

            projectNameInput.setAttribute('readonly', true);
            descriptionTextarea.setAttribute('readonly', true);
            tagsSelect.setAttribute('disabled', true);
            saveButton.style.display = 'none';
            cancelButton.style.display = 'none';
            editButton.style.display = 'block';

            localStorage.setItem(`project-${this.projectData.index}`, JSON.stringify(this.projectData));
            document.querySelector('stats-graph').updateChart();
        });

        trashButton.addEventListener('click', () => {
            localStorage.removeItem(`project-${this.projectData.index}`);
            this.remove();
            document.querySelector('stats-graph').updateChart();
            renumberProjectCards();
        });

        projectJournalButton.addEventListener('click', () => {
            window.location.href = 'project.html';
        });
    }
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
            <h3 id='add'>+ Add Project</h3>
        `;
        this.shadowRoot.append(cardContainer);
        this.addStyles();
        this.addEventListeners();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .card {
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
            .card:hover {
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
    }

    addEventListeners() {
        this.shadowRoot.querySelector('.card').addEventListener('click', () => {
            const newCardData = { index: 0, name: 'New Project', description: '', tag: 'default' };
            const newCard = new ProjectCard(newCardData);
            this.parentElement.appendChild(newCard);
            saveProjectCards();
        });
    }
}

customElements.define('project-card', ProjectCard);
customElements.define('add-project-card', AddProjectCard);

document.addEventListener('DOMContentLoaded', () => {
    loadProjectCards();
    document.querySelector('stats-graph').updateChart();
});

function saveProjectCards() {
    localStorage.clear();
    const projectCards = document.querySelectorAll('project-card');
    projectCards.forEach((card, index) => {
        card.projectData.index = index;
        localStorage.setItem(`project-${index}`, JSON.stringify(card.projectData));
    });
}

function loadProjectCards() {
    const savedProjects = Object.keys(localStorage).filter(key => key.startsWith('project-'));
    const projectCardsWrapper = document.querySelector('.project-cards');
    savedProjects.forEach(key => {
        const projectData = JSON.parse(localStorage.getItem(key));
        const newCard = new ProjectCard(projectData);
        projectCardsWrapper.appendChild(newCard);
    });
}

function renumberProjectCards() {
    const projectCards = document.querySelectorAll('project-card');
    projectCards.forEach((card, index) => {
        card.projectData.index = index;
        card.render();
    });
    saveProjectCards(); // Save the renumbered projects
}
