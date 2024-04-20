const categories = [
    { id: 'category1', name: 'Peinliche Geschichten', questions: [
        { id: 1, text: "Was ist das Peinlichste, was ihn/ihr je beim Sport passiert ist?", value: 100 },
        { id: 4, text: "Was ist das Peinlichste, was ihn/ihr je auf einer Party passiert ist?", value: 200 },
        { id: 5, text: "Welche peinliche Fehlleistung hat er/sie in der Schule oder bei der Arbeit erlebt?", value: 300 },
        { id: 6, text: "Über welchen Film hat er/sie in der Öffentlichkeit geweint?", value: 100 },
        { id: 8, text: "Welcher peinliche Spitzname wurde ihn/ihr als Kind gegeben?", value: 200 },
        { id: 9, text: "Was ist das Peinlichste, das er/sie je beim Tanzen erlebt hat?", value: 300 },
        { id: 11, text: "Was ist das Peinlichste, was ihn/ihr beim ersten Treffen mit ihren Schwiegereltern passiert ist?", value: 100 },
        { id: 12, text: "Welches ist der unangebrachteste Ort, an dem er/sie eingeschlafen ist?", value: 200 },
        { id: 14, text: "Welche peinliche Kindheitserinnerung erzählt er/sie immer wieder?", value: 200 },
        { id: 15, text: "Welches peinliche Kleidungsstück besitzt er/sie immer noch?", value: 300 }
    ]},
    { id: 'category2', name: 'Erste Male', questions: [
        { id: 1, text: "Wann hatte er/sie ihren ersten Kuss?", value: 100 },
        { id: 3, text: "Was war sein/ihr erstes Haustier und wie hieß es?", value: 200 },
        { id: 5, text: "Welches war sein/ihr erstes großes Hobby?", value: 300 },
        { id: 6, text: "Wie hieß sein/ihr erster bester Freund oder beste Freundin?", value: 100 },
        { id: 8, text: "Welchen Film hat er/sie als erstes im Kino gesehen?", value: 200 },
        { id: 9, text: "Wann hatte er/sie ihren ersten Flug und wohin ging es?", value: 300 },
        { id: 10, text: "Was war sein/ihr erstes größeres Missgeschick in der Schule?", value: 100 },
        { id: 11, text: "Wann hat er/sie das erste Mal gekocht und was ist schiefgegangen?", value: 200 },
        { id: 12, text: "Was war sein/ihr erstes großes Abenteuer?", value: 300 },
        { id: 13, text: "Welches war sein/ihr erstes Videospiel?", value: 100 },
        { id: 14, text: "Welches Musikinstrument hat er/sie als erstes gespielt?", value: 200 },
        { id: 15, text: "Was war sein/ihr erstes Smartphone", value: 300 }
    ]},
    { id: 'category3', name: 'Persönliche Vorlieben', questions: [
        { id: 1, text: "Welches ist meine Lieblingssportmannschaft?", value: 100 },
        { id: 2, text: "Zu welcher Musik trainiere ich gerne?", value: 200 },
        { id: 3, text: "Welchen Kaffee/Getränk bestelle ich normalerweise?", value: 200 },
        { id: 4, text: "Was kann ich nicht gut, versuche es aber trotzdem gerne?", value: 300 },
        { id: 5, text: "Was ärgert mich am meisten?", value: 100 },
        { id: 6, text: "Welches ist meine Lieblingsküche oder mein Lieblingsrestaurant?", value: 200 },
        { id: 7, text: "In welcher Kleidung gehe ich normalerweise spazieren?", value: 100 },
        { id: 8, text: "Welche Filme oder Genres mag ich am wenigsten?", value: 200 },
        { id: 9, text: "Welche Sache kann meine Stimmung sofort heben?", value: 300 },
        { id: 10, text: "Welchen Ort möchte ich unbedingt besuchen?", value: 200 },
        { id: 11, text: "Über welches meiner Hobbys oder Talente könnte er/sie nichts wissen?", value: 300 },
        { id: 12, text: "In welche Berühmtheit bin ich heimlich verliebt, was ich nie offen zugeben würde?", value: 100 },
        { id: 13, text: "Was bringt mich immer zum Lachen?", value: 200 },
        { id: 14, text: "Welche Sache stresst mich wirklich?", value: 300 },
        { id: 15, text: "Wie organisiere ich meine Sachen – ordentlich oder chaotisch?", value: 200 }
    ]}
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring swap
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById("questionModal");
    const questionText = document.getElementById("questionText");
    const points = document.getElementById("points");
    const correctButton = document.getElementById("correctAnswer");
    const wrongButton = document.getElementById("wrongAnswer");
    const halfCorrectButton = document.getElementById("halfCorrectAnswer");
    const turnIndicator = document.getElementById("turnIndicator");

    let currentQuestionButton = null;
    let currentTeam = Math.random() < 0.5 ? "boys" : "girls";

    updateTurnIndicator();

    categories.forEach(category => {
        shuffle(category.questions); // Перемешиваем вопросы в каждой категории
        const categoryDiv = document.querySelector(`#${category.id} .questions-list`);
        category.questions.slice(0, 6).forEach(question => { // Берем первые 6 вопросов
            const questionButton = document.createElement('button');
            questionButton.id = `question${question.id}`;
            questionButton.textContent = `${question.value}`;
            questionButton.className = 'question';
            questionButton.onclick = function() { showQuestionModal(question, questionButton); };
            categoryDiv.appendChild(questionButton);
        });
    });

    function updateTurnIndicator() {
        turnIndicator.textContent = `${currentTeam === "boys" ? "Boyz" : "Girlz"}`;
        if (turnIndicator.innerHTML === "Boyz") {
            turnIndicator.style.color = "#39f5ff";
        } else {
            turnIndicator.style.color = "#fb53f3";
        }
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
    };

    wrongButton.onclick = function() {
        console.log("Falsche Antwort");
        currentTeam = currentTeam === "boys" ? "girls" : "boys";
        modal.style.display = "none";
        disableButton(currentQuestionButton);
        updateTurnIndicator();
    };

    function halfPointsValue() {
        return Math.ceil(parseInt(points.textContent) / 2);
    }

    halfCorrectButton.onclick = function() {
        console.log("Teilweise richtige Antwort");
        let teamScoreId = currentTeam + "_score";
        let teamScoreElement = document.getElementById(teamScoreId);
        let score = parseInt(teamScoreElement.textContent);
        score += halfPointsValue(); // Add half the points
        teamScoreElement.textContent = score;
        currentTeam = currentTeam === "boys" ? "girls" : "boys";
        modal.style.display = "none";
        disableButton(currentQuestionButton);
        updateTurnIndicator();
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});