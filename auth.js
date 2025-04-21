document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }
    if (!localStorage.getItem('quizzes')) {
        const defaultQuizzes = [
            {
                id: '1',
                title: 'General Knowledge',
                description: 'Test your general knowledge with this quiz',
                questions: [
                    {
                        id: '1',
                        text: 'What is the capital of France?',
                        options: ['London', 'Paris', 'Berlin'],
                        correctAnswer: 'Paris'
                    },
                    {
                        id: '2',
                        text: 'Which planet is known as the Red Planet?',
                        options: ['Venus', 'Mars', 'Jupiter'],
                        correctAnswer: 'Mars'
                    },
                    {
                        id: '3',
                        text: 'Who painted the Mona Lisa?',
                        options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci'],
                        correctAnswer: 'Leonardo da Vinci'
                    }
                ]
            },
            {
                id: '2',
                title: 'Science Quiz',
                description: 'Test your science knowledge',
                questions: [
                    {
                        id: '1',
                        text: 'What is the chemical symbol for water?',
                        options: ['H2O', 'CO2', 'NaCl'],
                        correctAnswer: 'H2O'
                    },
                    {
                        id: '2',
                        text: 'What is the hardest natural substance on Earth?',
                        options: ['Gold', 'Diamond', 'Iron'],
                        correctAnswer: 'Diamond'
                    },
                    {
                        id: '3',
                        text: 'Which gas do plants absorb from the atmosphere?',
                        options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen'],
                        correctAnswer: 'Carbon Dioxide'
                    }
                ]
            }
        ];
        localStorage.setItem('quizzes', JSON.stringify(defaultQuizzes));
    }
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        
        const users = JSON.parse(localStorage.getItem('users'));
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            document.getElementById('registerError').textContent = 'User with this email already exists.';
            return;
        }
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            scores: {}
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        registerForm.reset();
        document.getElementById('registerError').textContent = '';
        alert('Registration successful! Please login.');
        tabButtons[0].click();
    });
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const users = JSON.parse(localStorage.getItem('users'));
        if (email === 'admin@quiz.com' && password === 'admin123') {
            localStorage.setItem('currentUser', JSON.stringify({
                email: 'admin@quiz.com',
                isAdmin: true
            }));
            window.location.href = 'dashboard.html';
            return;
        }
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: false
            }));
            window.location.href = 'home.html';
        } else {
            document.getElementById('loginError').textContent = 'Invalid email or password.';
        }
    });
});