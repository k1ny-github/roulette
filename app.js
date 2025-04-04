// app.js
const tg = window.Telegram.WebApp;
const prizes = [
    { name: "🎮 Консоль", chance: 5, color: "#FF5733" },
    { name: "💻 Ноутбук", chance: 10, color: "#33FF57" },
    { name: "🎧 Наушники", chance: 15, color: "#3357FF" },
    { name: "⌚ Часы", chance: 20, color: "#F333FF" },
    { name: "📱 Смартфон", chance: 25, color: "#FF33F3" },
    { name: "☕ Кофе", chance: 15, color: "#33FFF5" },
    { name: "💔 Повторите", chance: 10, color: "#FF3333" }
];

const ITEM_WIDTH = 200;
let isSpinning = false;

function initRibbon() {
    const ribbon = document.getElementById('ribbon');
    ribbon.innerHTML = '';
    
    // Создаем 3 копии для плавной анимации
    const clonedPrizes = [...prizes, ...prizes, ...prizes];
    
    clonedPrizes.forEach((prize, index) => {
        const item = document.createElement('div');
        item.className = 'ribbon-item';
        item.style.backgroundColor = prize.color;
        item.innerHTML = `
            <div class="prize-content">
                ${prize.name}<br>
                <small>${prize.chance}%</small>
            </div>
        `;
        ribbon.appendChild(item);
    });
}

function selectPrize() {
    const total = prizes.reduce((sum, p) => sum + p.chance, 0);
    let random = Math.random() * total;
    
    for (const prize of prizes) {
        if (random < prize.chance) return prize;
        random -= prize.chance;
    }
}

function calculateTargetPosition(prize) {
    const prizeIndex = prizes.findIndex(p => p === prize);
    const middleSetStart = prizes.length * ITEM_WIDTH; // Начало второй копии
    return -(prizeIndex * ITEM_WIDTH + middleSetStart - ITEM_WIDTH * 3);
}

function spinRibbon() {
    if (isSpinning) return;
    isSpinning = true;
    
    const ribbon = document.getElementById('ribbon');
    const resultElement = document.getElementById('result');
    
    // Сброс позиции
    ribbon.style.transition = 'none';
    ribbon.style.transform = 'translateX(0)';
    
    // Выбор приза
    const prize = selectPrize();
    const targetPosition = calculateTargetPosition(prize);
    
    // Принудительный рефлоу
    void ribbon.offsetWidth;
    
    // Запуск анимации
    ribbon.style.transition = 'transform 3s cubic-bezier(0.33, 0, 0.15, 1)';
    ribbon.style.transform = `translateX(${targetPosition}px)`;
    
    // Показать результат
    setTimeout(() => {
        resultElement.innerHTML = `
            <div class="prize-popup" style="border-color: ${prize.color}">
                🏆 Победа!<br>${prize.name}
            </div>
        `;
        isSpinning = false;
    }, 3000);
}

// Инициализация
tg.ready();
tg.expand();
tg.MainButton.hide();
initRibbon();

document.getElementById('spinButton').addEventListener('click', () => {
    tg.sendData(JSON.stringify({ type: 'payment' }));
    spinRibbon();
});
