class ProjectCard extends HTMLElement {
    constructor(projectData = {index: 0, name: 'New Project', description: '', tag: 'default'}) {
        super();
        this.projectData = projectData;
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    connectedCallback() {
        this.addEventListeners();
    }

    render() {
        // Rendering logic remains the same as previously provided
    }

    addEventListeners() {
        const trashButton = this.shadowRoot.querySelector('#trash');
        trashButton.addEventListener('click', () => {
            this.removeCard();
        });
    }

    removeCard() {
        this.remove(); // Remove the card element
        this.updateGrid(); // Update the grid layout if necessary
        renumberProjectCards(); // Renumber all cards
    }

    updateGrid() {
        const event = new CustomEvent('gridUpdate', { bubbles: true, composed: true });
        this.dispatchEvent(event); // Dispatch an event that can be listened to on a higher level
    }
}

function renumberProjectCards() {
    const projectCards = document.querySelectorAll('project-card');
    projectCards.forEach((card, index) => {
        card.projectData.index = index;
        card.render(); // Re-render to update the displayed index
    });
    saveProjectCards(); // Save the updated project list
}

document.addEventListener('gridUpdate', () => {
    // Perform any additional adjustments required for maintaining the grid layout
    const gridContainer = document.querySelector('.project-cards'); // Adjust this selector as per your HTML
    gridContainer.style.display = 'none'; // Redraw trick
    setTimeout(() => {
        gridContainer.style.display = '';
    }, 0);
});

customElements.define('project-card', ProjectCard);

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