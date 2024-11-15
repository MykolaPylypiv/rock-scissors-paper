const choices = ['камінь', 'ножиці', 'папір'];
const resultsTable = document.getElementById('results-table');
const resultDiv = document.getElementById('result');

let playerScore = 0;
let botScore = 0;

function generateStars() {
    const starsContainer = document.querySelector('.stars');
    const numStars = 200; // Кількість зірок

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Рандомізуємо позицію зірки на екрані
        const size = Math.random() * 2 + 1; // Розмір зірки (від 1 до 3px)
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        // Рандомізуємо швидкість анімації
        const delay = Math.random() * 5; // Затримка анімації для кожної зірки
        const duration = Math.random() * 3 + 2; // Тривалість анімації

        // Встановлюємо стилі для кожної зірки
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        starsContainer.appendChild(star);
    }
}

// Викликаємо функцію для генерації зірок
generateStars();

function startGame() {
    const startScreen = document.querySelector('.start-screen');
    const container = document.querySelector('.container');
    const backgroundMusic = document.getElementById('background-music');

    // Додаємо клас анімації для затемнення початкового екрану
    startScreen.classList.add('fade-out');

    // Починаємо відтворювати фонову музику
    backgroundMusic.currentTime = 0;
    backgroundMusic.play();

    // Після завершення анімації (800ms) показуємо екран гри
    setTimeout(() => {
        startScreen.style.display = 'none'; // Сховати стартовий екран
        container.style.display = 'flex'; // Показати екран гри
        container.classList.add('slide-up'); // Додаємо анімацію появи знизу
        toggleRules(); // Додатковий функціонал (правила)
    }, 0); // Час відповідає тривалості анімації fadeOut
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

    startAnimation(playerChoice, botChoice, result);
    showResult(playerChoice, botChoice, result);
    addToTable(playerChoice, botChoice, result);
    updateScore(); // Оновлюємо рахунок після кожної гри
}

function startAnimation(playerChoice, botChoice, result) {
    const playerImg = document.getElementById('player-choice-img');
    const botImg = document.getElementById('bot-choice-img');
    const vsText = document.querySelector('.vs-text');
    const winnerText = document.getElementById('winner-text');
    const animationContainer = document.querySelector('.animation-container');
    const music = document.getElementById('animation-music');
    const backgroundMusic = document.getElementById('background-music');

    backgroundMusic.pause();

    // Оновлення зображень
    playerImg.src = `images/${selectImage(playerChoice)}.png`;
    botImg.src = `images/${selectImage(botChoice)}.png`;

    // Відтворення музики
    music.currentTime = 0; // Почати спочатку
    music.play();

    // Показуємо анімаційний екран
    animationContainer.style.display = 'flex';

    // Початок анімації
    setTimeout(() => {
        vsText.style.opacity = 1; // Показуємо текст VS
        document.querySelector('.player-choice').style.transform = 'translateX(200px) scale(1.5)'; // Збільшуємо іконки
        document.querySelector('.bot-choice').style.transform = 'translateX(-200px) scale(1.5)';
    }, 100);

    // Відображення результату через 2 секунди
    setTimeout(() => {
        vsText.style.opacity = 0; // Приховуємо текст VS
        winnerText.textContent = result; // Встановлюємо текст результату
        winnerText.style.display = 'block';

        // Завершення анімації
        setTimeout(() => {
            animationContainer.style.display = 'none'; // Приховуємо анімаційний екран
            winnerText.style.display = 'none'; // Приховуємо результат
            document.querySelector('.player-choice').style.transform = 'translateX(0) scale(1)'; // Скидаємо іконки
            document.querySelector('.bot-choice').style.transform = 'translateX(0) scale(1)';
            music.pause(); // Зупиняємо музику
            backgroundMusic.play();
        }, 1000);
    }, 2000);
}

function selectImage(playerChoice) {
    if (playerChoice === 'камінь') {
        return 'rock';
    } else if (playerChoice === 'папір') {
        return 'paper';
    } else {
        return 'scissors';
    }
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
    } else {
        rowClass = 'bg-secondary'; 
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