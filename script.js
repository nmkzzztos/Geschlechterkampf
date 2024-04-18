document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("questionModal");
    const closeModal = document.getElementsByClassName("close")[0];
    const questionText = document.getElementById("questionText");
    const points = document.getElementById("points");
    const correctButton = document.getElementById("correctAnswer");
    const wrongButton = document.getElementById("wrongAnswer");
    const turnIndicator = document.getElementById("turnIndicator");

    let currentQuestionButton = null; // Хранение текущей кнопки вопроса
    let currentTeam = Math.random() < 0.5 ? "boys" : "girls"; // Рандомно выбираем, кто начинает

    updateTurnIndicator();

    // Данные категорий и вопросов
    const categories = [
        { id: 'category1', name: 'Kategorie 1', questions: [
            { id: 1, text: "Was ist die Hauptstadt von Deutschland?", value: 500 },
            { id: 2, text: "Was ist die Hauptstadt von Frankreich?", value: 400 }
        ]},
        { id: 'category2', name: 'Kategorie 2', questions: [
            { id: 1, text: "Wie viele Bundesländer hat Deutschland?", value: 500 },
            { id: 2, text: "Wie viele Farben hat die deutsche Flagge?", value: 400 }
        ]}
    ];

    // Функция для отображения вопросов
    categories.forEach(category => {
        const categoryDiv = document.querySelector(`#${category.id} .questions-list`);
        category.questions.forEach(question => {
            const questionButton = document.createElement('button');
            questionButton.id = `question${question.id}`;
            questionButton.textContent = `(${question.value} Punkte)`;
            questionButton.className = 'question';
            questionButton.onclick = function() { showQuestionModal(question, questionButton); };
            categoryDiv.appendChild(questionButton);
        });
    });

    function updateTurnIndicator() {
        turnIndicator.textContent = `${currentTeam === "boys" ? "Boyz" : "Girlz"}`;
    }

    function showQuestionModal(question, button) {
        currentQuestionButton = button;
        questionText.textContent = question.text;
        points.textContent = question.value;
        modal.style.display = "block";
        updateTurnIndicator();
    }

    function disableButton(button) {
        button.disabled = true;
        button.classList.add("disabled");
    }

    correctButton.onclick = function() {
        console.log("Richtige Antwort");
        let teamScoreId = currentTeam + "_score";
        let teamScoreElement = document.getElementById(teamScoreId);
        let score = parseInt(teamScoreElement.textContent);
        score += parseInt(points.textContent);
        teamScoreElement.textContent = score;
        currentTeam = currentTeam === "boys" ? "girls" : "boys";
        modal.style.display = "none";
        disableButton(currentQuestionButton);
        updateTurnIndicator();
        // Правильный ответ, команда сохраняет ход
    };

    wrongButton.onclick = function() {
        console.log("Falsche Antwort");
        // Неправильный ответ, ход переходит к другой команде
        currentTeam = currentTeam === "boys" ? "girls" : "boys";
        modal.style.display = "none";
        disableButton(currentQuestionButton);
        updateTurnIndicator();
    };

    // Закрытие модального окна по клику вне его
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});