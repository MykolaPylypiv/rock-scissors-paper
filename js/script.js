const choices = ['камінь', 'ножиці', 'папір'];
const resultsTable = document.getElementById('results-table');
const resultDiv = document.getElementById('result');

let playerScore = 0;
let botScore = 0;

function startGame() {
    // Сховати стартовий екран
    document.querySelector('.start-screen').style.display = 'none';

    // Показати основний екран гри
    document.querySelector('.container').style.display = 'flex';
    toggleRules()
}

function updateScore() {
    // Оновлюємо рахунок на екрані
    document.getElementById('player-score').textContent = playerScore;
    document.getElementById('bot-score').textContent = botScore;
}

function playGame(playerChoice) {
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    let result;

    if (playerChoice === botChoice) {
        result = 'Нічия';
    } else if (
        (playerChoice === 'камінь' && botChoice === 'ножиці') ||
        (playerChoice === 'ножиці' && botChoice === 'папір') ||
        (playerChoice === 'папір' && botChoice === 'камінь')
    ) {
        result = 'Перемога';
        playerScore++; // Збільшуємо рахунок гравця
    } else {
        result = 'Програш';
        botScore++; // Збільшуємо рахунок бота
    }

    showResult(playerChoice, botChoice, result);
    addToTable(playerChoice, botChoice, result);
    updateScore(); // Оновлюємо рахунок після кожної гри
}

function showResult(playerChoice, botChoice, result) {
    resultDiv.textContent = `Ви вибрали ${playerChoice}. Бот вибрав ${botChoice}. ${result}!`;
    resultDiv.style.animation = 'none';
    setTimeout(() => {
        resultDiv.style.animation = '';
    }, 10); // Скидання анімації для повторного показу
}

function addToTable(playerChoice, botChoice, result) {
    const row = document.createElement('tr');

    // Вибір кольору для фону рядка залежно від результату
    let rowClass = '';
    if (result === 'Перемога') {
        rowClass = 'bg-success';  // Зелений для виграшу
    } else if (result === 'Програш') {
        rowClass = 'bg-danger';  // Червоний для поразки
    }

    // Вставка результату в таблицю
    row.classList.add(rowClass);
    row.innerHTML = `
        <td>${capitalize(playerChoice)}</td>
        <td>${capitalize(botChoice)}</td>
        <td>${result}</td>
    `;
    resultsTable.prepend(row); // Додаємо новий результат зверху

    // Перевірка, чи в таблиці більше 12 рядків
    if (resultsTable.rows.length > 12) {
        resultsTable.deleteRow(resultsTable.rows.length - 1);  // Видаляємо останній рядок
    }
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Функція для відкриття та закриття вкладки з правилами
function toggleRules() {
    const rulesTab = document.getElementById('rules-tab');
    const openRulesBtn = document.getElementById('open-rules');

    // Перевіряємо, чи вкладка відкрита
    if (rulesTab.classList.contains('open')) {
        // Закриваємо вкладку
        rulesTab.classList.remove('open');
        openRulesBtn.style.display = 'block'; // Показуємо кнопку відкриття
    } else {
        // Відкриваємо вкладку
        rulesTab.classList.add('open');
        openRulesBtn.style.display = 'none'; // Ховаємо кнопку відкриття
    }
}