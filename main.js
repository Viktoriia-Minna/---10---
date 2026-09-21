const intervalButton = document.querySelector("#start-interval");
const intervalStatus = document.querySelector("#interval-status");
const intervalLog = document.querySelector("#interval-log");
let intervalId;
let messageCount = 0;

intervalButton.addEventListener("click", () => {
	if (intervalId) return;

	messageCount = 0;
	intervalLog.replaceChildren();
	intervalStatus.textContent = "Таймер працює...";
	intervalButton.disabled = true;

	intervalId = setInterval(() => {
		messageCount += 1;
		const message = document.createElement("li");
		message.textContent = `Повідомлення ${messageCount}: секунда минула.`;
		intervalLog.append(message);

		if (messageCount === 5) {
			clearInterval(intervalId);
			intervalId = null;
			intervalStatus.textContent = "Готово: 5 повідомлень показано.";
			intervalButton.disabled = false;
		}
	}, 1000);
});

const shapes = document.querySelectorAll(".shape");
const animationToggle = document.querySelector("#toggle-animation");
let animationStep = 0;
let animationId = setInterval(() => {
	animationStep += 1;
	shapes.forEach((shape, index) => {
		const x = Math.sin(animationStep / 3 + index) * 34;
		const y = Math.cos(animationStep / 4 + index) * 20;
		const scale = 1 + (Math.sin(animationStep / 2 + index) + 1) * 0.18;
		shape.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${animationStep * (index + 1) * 3}deg)`;
	});
}, 240);

animationToggle.addEventListener("click", () => {
	if (animationId) {
		clearInterval(animationId);
		animationId = null;
		animationToggle.textContent = "Запустити анімацію";
		return;
	}

	animationId = setInterval(() => {
		animationStep += 1;
		shapes.forEach((shape, index) => {
			const x = Math.sin(animationStep / 3 + index) * 34;
			const y = Math.cos(animationStep / 4 + index) * 20;
			const scale = 1 + (Math.sin(animationStep / 2 + index) + 1) * 0.18;
			shape.style.transform = `translate(${x}px, ${y}px) scale(${scale}) rotate(${animationStep * (index + 1) * 3}deg)`;
		});
	}, 240);
	animationToggle.textContent = "Зупинити анімацію";
});

const gameArena = document.querySelector("#game-arena");
const target = document.querySelector("#target");
const startGameButton = document.querySelector("#start-game");
const gameMessage = document.querySelector("#game-message");
const scoreElement = document.querySelector("#score");
const clicksElement = document.querySelector("#clicks");
const gameTimeElement = document.querySelector("#game-time");
let gameIntervalId;
let gameTime = 15;
let score = 0;
let clicks = 0;

function moveTarget() {
	const x = 12 + Math.random() * 76;
	const y = 18 + Math.random() * 64;
	target.style.left = `${x}%`;
	target.style.top = `${y}%`;
}

function finishGame() {
	clearInterval(gameIntervalId);
	gameIntervalId = null;
	target.hidden = true;
	gameMessage.textContent = `Раунд завершено! Твій результат: ${score} очків.`;
	startGameButton.disabled = false;
	startGameButton.textContent = "Грати ще раз";
}

startGameButton.addEventListener("click", () => {
	clearInterval(gameIntervalId);
	gameTime = 15;
	score = 0;
	clicks = 0;
	scoreElement.textContent = score;
	clicksElement.textContent = clicks;
	gameTimeElement.textContent = gameTime;
	gameMessage.textContent = "";
	target.hidden = false;
	startGameButton.disabled = true;
	moveTarget();

	gameIntervalId = setInterval(() => {
		gameTime -= 1;
		gameTimeElement.textContent = gameTime;
		if (gameTime === 0) finishGame();
	}, 1000);
});

target.addEventListener("click", () => {
	if (!gameIntervalId) return;
	score += 1;
	clicks += 1;
	scoreElement.textContent = score;
	clicksElement.textContent = clicks;
	moveTarget();
});

const countdownForm = document.querySelector("#countdown-form");
const secondsInput = document.querySelector("#seconds");
const countdownOutput = document.querySelector("#countdown-output");
let countdownId;

countdownForm.addEventListener("submit", (event) => {
	event.preventDefault();
	clearInterval(countdownId);
	let secondsLeft = Number(secondsInput.value);

	if (!Number.isFinite(secondsLeft) || secondsLeft < 1) {
		countdownOutput.textContent = "Введи число секунд від 1.";
		return;
	}

	countdownOutput.textContent = `Залишилося: ${secondsLeft} с`;
	countdownId = setInterval(() => {
		secondsLeft -= 1;
		if (secondsLeft === 0) {
			clearInterval(countdownId);
			countdownOutput.textContent = "Час вийшов!";
			return;
		}
		countdownOutput.textContent = `Залишилося: ${secondsLeft} с`;
	}, 1000);
});
