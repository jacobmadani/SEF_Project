document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const quizId = urlParams.get('quizId');
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) {
        alert('Quiz not found!');
        window.location.href = 'home.html';
        return;
    }
    document.getElementById('quizTitle').textContent = quiz.title;
    const questionsContainer = document.getElementById('questionsContainer');
    
    quiz.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <h3>Question ${index + 1}: ${question.text}</h3>
            <div class="options">
                ${question.options.map((option, i) => `
                    <div class="option">
                        <input type="radio" id="q${question.id}_opt${i}" name="q${question.id}" value="${option}">
                        <label for="q${question.id}_opt${i}">${option}</label>
                    </div>
                `).join('')}
            </div>
        `;
        questionsContainer.appendChild(questionDiv);
    });
    document.getElementById('backBtn').addEventListener('click', function() {
        window.location.href = 'home.html';
    });
    const quizForm = document.getElementById('quizForm');
    quizForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let score = 0;
        const userAnswers = {};
        quiz.questions.forEach(question => {
            const selectedOption = document.querySelector(`input[name="q${question.id}"]:checked`);
            if (selectedOption) {
                userAnswers[question.id] = selectedOption.value;
                if (selectedOption.value === question.correctAnswer) {
                    score++;
                }
            } else {
                userAnswers[question.id] = null;
            }
        });
        const resultContainer = document.getElementById('resultContainer');
        const scoreElement = document.getElementById('score');
        const resultMessage = document.getElementById('resultMessage');
        scoreElement.textContent = `${score} out of ${quiz.questions.length}`;
        const percentage = (score / quiz.questions.length) * 100;
        if (percentage >= 80) {
            resultMessage.textContent = 'Excellent! You did great!';
        } else if (percentage >= 50) {
            resultMessage.textContent = 'Good job! You passed.';
        } else {
            resultMessage.textContent = 'Keep practicing! You can do better.';
        }
        quizForm.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        const users = JSON.parse(localStorage.getItem('users'));
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            if (!users[userIndex].scores) {
                users[userIndex].scores = {};
            }
            users[userIndex].scores[quizId] = {
                score,
                total: quiz.questions.length,
                date: new Date().toISOString()
            };
            
            localStorage.setItem('users', JSON.stringify(users));
        }
    });
});