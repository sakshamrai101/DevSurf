// main.js

// Event listeners for sign up and sign in buttons
document.addEventListener('DOMContentLoaded', function () {
    const boxContainerElement = document.getElementById('box-container');
    const signUpButtonElement = document.getElementById('register');
    const signInButtonElement = document.getElementById('login');

    function handleSignUpButtonClick() {
        boxContainerElement.classList.add('active');
    }

    function handleSignInButtonClick() {
        boxContainerElement.classList.remove('active');
    }

    if (signUpButtonElement) {
        signUpButtonElement.addEventListener('click', handleSignUpButtonClick);
    }
    if (signInButtonElement) {
        signInButtonElement.addEventListener('click', handleSignInButtonClick);
    }

    // Registration and login logic
    const signUpForm = document.querySelector('#signup-form');
    const signInForm = document.querySelector('#signin-form');
    const messageBox = document.createElement('div');
    messageBox.classList.add('message-box');
    document.body.appendChild(messageBox);

    // Handle registration form submission
    if (signUpForm) {
        signUpForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const name = this.querySelector('input[name="name"]').value;
            const pin = this.querySelector('input[name="pin"]').value;

            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, pin })
            }).then(response => response.json())
                .then(data => {
                    showMessage(data.message, 'success');
                    if (data.message.includes('Registered')) {
                        const firstName = name.split(' ')[0]; // Get the first name
                        localStorage.setItem('username', firstName);
                        window.location.href = `home.html?username=${firstName}`;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    showMessage('Registration failed. Please try again.', 'error');
                });
        });
    }

    // Handle login form submission
    if (signInForm) {
        signInForm.addEventListener('submit', function (event) {
            event.preventDefault();
            submit(); // Call the submit function for login
        });
    }

    // Handle pin input
    const pinInputs = document.querySelectorAll(".pincode-box input");
    pinInputs.forEach((pinInput, index) => {
        pinInput.dataset.index = index;
        pinInput.addEventListener("paste", handlePaste);
        pinInput.addEventListener("keyup", handlePin);
    });

    function handlePaste(event) {
        const clipboardData = event.clipboardData.getData("text");
        const clipboardValues = clipboardData.split("");
        if (clipboardValues.length === pinInputs.length) {
            pinInputs.forEach((input, index) => (input.value = clipboardValues[index]));
            submit();
        }
    }

    function handlePin(event) {
        const currentInput = event.target;
        let value = currentInput.value;
        currentInput.value = "";
        currentInput.value = value ? value[0] : "";
        let fieldIndex = parseInt(currentInput.dataset.index);
        if (value.length > 0 && fieldIndex < pinInputs.length - 1) {
            pinInputs[fieldIndex + 1].focus();
        }
        if (event.key === "Backspace" && fieldIndex > 0) {
            pinInputs[fieldIndex - 1].focus();
        }
        if (fieldIndex == pinInputs.length - 1) {
            submit();
        }
    }

    // Function to submit the login form
    function submit() {
        const pin = Array.from(document.querySelectorAll('.pin-input')).map(input => input.value).join('');

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ pin })
        }).then(response => response.json())
            .then(data => {
                if (data.redirect) {
                    localStorage.setItem('username', data.username);
                    window.location.href = data.redirect;
                } else {
                    showMessage(data.message, 'error');
                    shakePinCodeBox();
                }
            }).catch(error => {
                console.error('Error:', error);
                showMessage('Login failed. Please try again.', 'error');
                shakePinCodeBox();
            });
    }

    // Function to display messages
    function showMessage(msg, type) {
        const messageBox = document.querySelector('.message-box');
        messageBox.textContent = msg;
        messageBox.style.display = 'block';
        messageBox.style.backgroundColor = type === 'success' ? 'green' : 'red';

        setTimeout(() => {
            messageBox.textContent = '';
            messageBox.style.display = 'none';
        }, 3000);
    }

    // Function to shake the pin code box
    function shakePinCodeBox() {
        const pinBox = document.querySelector('.pincode-box');
        pinBox.classList.add('shake');
        setTimeout(() => pinBox.classList.remove('shake'), 1000);
    }

    // Retrieve username from local storage and display it
    const usernameElement = document.getElementById('username');
    if (usernameElement) {
        const username = localStorage.getItem('username');
        if (username) {
            usernameElement.textContent = username;
        }
    }

    // Handle logout button click
    const logoutButton = document.querySelector('.logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('username');
            window.location.href = 'index.html'; // Redirect to login-signup page
        });
    }

    // Prevent back navigation
    if (window.location.pathname === '/home.html' || window.location.pathname === '/project.html') {
        window.history.pushState(null, null, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, null, '/home.html');
            alert('You cannot go back to the login page, press Logout to go back.');
        });
    }

    // Scroll functionality
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const projectCardsWrapper = document.querySelector('.project-card-wrapper');
    const projectCards = document.querySelector('.project-cards');

    if (leftArrow && rightArrow && projectCardsWrapper && projectCards) {
        let currentScrollPosition = 0;
        const cardWidth = projectCardsWrapper.clientWidth;
        const scrollAmount = cardWidth;

        rightArrow.addEventListener('click', () => {
            const maxScroll = -(projectCards.scrollWidth - cardWidth);
            if (currentScrollPosition > maxScroll) {
                currentScrollPosition -= scrollAmount;
                projectCards.style.transform = `translateX(${currentScrollPosition}px)`;
            }
        });

        leftArrow.addEventListener('click', () => {
            if (currentScrollPosition < 0) {
                currentScrollPosition += scrollAmount;
                projectCards.style.transform = `translateX(${currentScrollPosition}px)`;
            }
        });
    }
});
