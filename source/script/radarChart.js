class StatsGraph extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow DOM to the custom element
        this.attachShadow({ mode: 'open' });
    }

    // Observe changes to the 'width' and 'height' attributes
    static get observedAttributes() {
        return ['width', 'height'];
    }

    // Handle attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'width' || name === 'height') {
            this.render(); // Re-render the element
            this.loadChart(); // Reload the chart with the new dimensions
        }
    }

    // Called when the element is added to the DOM
    connectedCallback() {
        this.render(); // Render the element
        this.loadChart(); // Load the chart
        this.updateChart();
        window.addEventListener('resize', this.resizeChart.bind(this));
    }

    // Render the HTML structure for the custom element
    render() {
        const width = this.getAttribute('width') || '100%';
        const height = this.getAttribute('height') || '400px';

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                max-width: ${width};
                max-height: ${height};
                margin: 0 auto;
                padding-top: 50px;
            }

            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
            }

            .chart-container {
                position: relative;
                width: 100%;
                height: 100%;
                max-width: 600px;
                max-height: 600px;
            }

            #statsChart {
                width: 100%;
                height: 100%;
            }
        </style>

        <div class="container">
            <div class="chart-container">
                <canvas id="statsChart"></canvas>
            </div>
        </div>
        `;
    }

    // Load the radar chart using Chart.js
    loadChart() {
        const ctx = this.shadowRoot.querySelector('#statsChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Frontend\nDevelopment',
                    'Backend\nDevelopment',
                    'Data\nScience',
                    'Native\n Development',
                    'Machine Learning\n and AI'
                ],
                datasets: [{
                    label: 'Stats',
                    data: [0, 0, 0, 0, 0],
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: 'rgb(75, 75, 75)',
                    pointHoverBackgroundColor: 'rgb(75, 75, 75)',
                    pointHoverBorderColor: 'rgb(54, 162, 235)',
                    pointRadius: 0
                }]
            },
            options: {
                elements: {
                    line: {
                        borderWidth: 3
                    }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                },
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        grid: {
                            color: 'rgba(54, 54, 54, 0.5)'
                        },
                        angleLines: {
                            color: 'rgba(54, 54, 54, 0.5)'
                        },
                        pointLabels: {
                            font: {
                                size: this.getFontSize()
                            },
                            color: 'rgb(0, 0, 0)',
                            callback: function (value) {
                                return value.split('\n');
                            }
                        },
                        ticks: {
                            display: false,
                            stepSize: 20
                        }
                    }
                }
            }
        });

        this.updateChart(); // Update the chart with initial data
    }

    resizeChart() {
        const newFontSize = this.getFontSize();
        this.chart.options.scales.r.pointLabels.font.size = newFontSize;
        this.chart.update();
    }

    getFontSize() {
        const width = window.innerWidth;
        if (width < 600) {
            return 10; // Smaller font size for small screens
        } else if (width < 900) {
            return 12; // Medium font size for mid-sized screens
        } else {
            return 14; // Default font size for larger screens
        }
    }

    // Update the chart with the current distribution of project tags
    updateChart() {
        const tagCounts = {
            frontend: 0,
            backend: 0,
            database: 0,
            network: 0,
            data: 0
        };

        // Wait until 'project-card' elements are defined
        customElements.whenDefined('project-card').then(() => {
            // Count the tags in each project card
            document.querySelectorAll('project-card').forEach(card => {
                const tag = card.shadowRoot.querySelector('#tags').value;
                if (tagCounts[tag] !== undefined) {
                    tagCounts[tag]++;
                }
            });

            // Calculate the percentage of each tag
            const total = Object.values(tagCounts).reduce((acc, count) => acc + count, 0);
            const percentages = total > 0 ? Object.values(tagCounts).map(count => (count / total) * 100) : [0, 0, 0, 0, 0];

            // Update the chart data and redraw the chart
            this.chart.data.datasets[0].data = percentages;
            this.chart.update();
        });
    }
}

// Define the custom element
customElements.define('stats-graph', StatsGraph);
