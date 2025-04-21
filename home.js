document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }
    document.getElementById('welcomeMessage').textContent = `Welcome, ${currentUser.name}!`;
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quizList = document.getElementById('quizList');
    quizzes.forEach(quiz => {
        const quizCard = document.createElement('div');
        quizCard.className = 'quiz-card';
        quizCard.innerHTML = `
            <h3>${quiz.title}</h3>
            <p>${quiz.description}</p>
        `;
        quizCard.addEventListener('click', () => {
            window.location.href = `quiz.html?quizId=${quiz.id}`;
        });
        quizList.appendChild(quizCard);
    });
    document.getElementById('logoutBtn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});