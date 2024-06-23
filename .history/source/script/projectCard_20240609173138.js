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
        const index = this.projectData.index;
        const cardContainer = document.createElement('div');
        cardContainer.setAttribute('class', 'card');
        cardContainer.innerHTML = `
            <h4>Project #${index}</h4>
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
                /* Existing styles */
            }
            /* Add any new styles if needed */
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

        // Event listener setup as before
    }
}
