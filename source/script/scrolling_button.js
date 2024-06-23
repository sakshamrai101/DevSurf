class ScrollButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addScrollEvent();
    }

    render() {
        const direction = this.getAttribute('direction');
        const buttonContainer = document.createElement('button');
        buttonContainer.setAttribute('class', 'scroll-button');
        buttonContainer.innerHTML = direction === 'left' ? '&lt;' : '&gt;';
        
        this.shadowRoot.append(buttonContainer);

        const style = document.createElement('style');
        style.textContent = `
            .scroll-button {
                background-color: #80b1d3;
                border: none;
                border-radius: 50%;
                padding: 10px;
                cursor: pointer;
                height: 40px;
                width: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            }
            .scroll-button:focus {
                outline: none;
            }
            .scroll-button:hover {
                background-color: #729fcf;
            }
        `;
        this.shadowRoot.append(style);
    }

    addScrollEvent() {
        const direction = this.getAttribute('direction');
        const scrollContainer = this.closest('.project-widget-container-wrapper').querySelector('.project-widget-container');
        this.shadowRoot.querySelector('.scroll-button').addEventListener('click', () => {
            scrollContainer.scrollBy({
                top: 0,
                left: direction === 'left' ? -scrollContainer.clientWidth : scrollContainer.clientWidth,
                behavior: 'smooth'
            });
        });
    }
}

customElements.define('scroll-button', ScrollButton);
