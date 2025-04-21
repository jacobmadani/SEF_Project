document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser || !currentUser.isAdmin) {
        window.location.href = 'index.html';
        return;
    }
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const tableBody = document.getElementById('usersTableBody');
    users.forEach(user => {
        if (user.email === 'admin@quiz.com') return; 
        const row = document.createElement('tr');
        let quizzesTaken = 0;
        let scoresHtml = '';
        if (user.scores) {
            quizzesTaken = Object.keys(user.scores).length;
            scoresHtml = Object.entries(user.scores).map(([quizId, scoreData]) => {
                const quiz = quizzes.find(q => q.id === quizId);
                const quizName = quiz ? quiz.title : `Quiz ${quizId}`;
                return `${quizName}: ${scoreData.score}/${scoreData.total}`;
            }).join('<br>');
        }
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${quizzesTaken}</td>
            <td>${scoresHtml || 'No scores yet'}</td>
        `;
        tableBody.appendChild(row);
    });
    document.getElementById('dashboardLogoutBtn').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });
});