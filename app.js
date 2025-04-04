const tg = window.Telegram.WebApp;
const prizes = [
    { name: "🎮 Игровая консоль", chance: 5 },
    { name: "🎧 Наушники", chance: 15 },
    { name: "☕ Кофе", chance: 30 },
    { name: "💔 Повторите", chance: 50 }
];

// Инициализация Mini App
tg.expand();
tg.MainButton.setText("Закрыть").onClick(() => tg.close());

document.getElementById("spinButton").addEventListener("click", () => {
    // Запрос оплаты через бота
    tg.sendData(JSON.stringify({ type: "payment" }));
});

// Обработчик данных от бота
tg.onEvent("mainButtonClicked", () => tg.close());
