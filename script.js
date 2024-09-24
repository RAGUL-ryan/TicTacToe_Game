// JavaScript Game Logic
const cells = document.querySelectorAll('[data-cell]');
const messageText = document.getElementById('message');
const restartButton = document.getElementById('restartButton');
const popup = document.getElementById('popup');
const winMessage = document.getElementById('winMessage');
const closePopup = document.getElementById('closePopup');
const fallingEmojis = document.getElementById('fallingEmojis');
let currentPlayer = 'X';
let gameActive = true;

// Winning Combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Start Game
function startGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });
    messageText.textContent = `Player ${currentPlayer}'s Turn`;
    gameActive = true;
}

// Handle Cell Click
function handleClick(e) {
    const cell = e.target;
    if (!gameActive) return;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        switchPlayer();
    }
}

// Switch Player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    messageText.textContent = `Player ${currentPlayer}'s Turn`;
}

// Check for Win
function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(player);
        });
    });
}

// Check for Draw
function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('X') || cell.classList.contains('O');
    });
}

// End Game
function endGame(draw) {
    gameActive = false;
    if (draw) {
        messageText.textContent = "It's a Draw!";
        winMessage.textContent = "It's a Draw!";
    } else {
        messageText.textContent = `Player ${currentPlayer} Wins!`;
        winMessage.textContent = `Congratulations, Player ${currentPlayer} Wins! 🎉`;
        triggerCelebration();
    }
    popup.classList.remove('hidden');
}

// Restart Game
restartButton.addEventListener('click', restartGame);
closePopup.addEventListener('click', () => {
    popup.classList.add('hidden');
    restartGame();
});

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });
    currentPlayer = 'X';
    gameActive = true;
    messageText.textContent = `Player ${currentPlayer}'s Turn`;
    clearCelebration();
    startGame();
}

// Trigger Celebration
function triggerCelebration() {
    for (let i = 0; i < 50; i++) {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji');
        emoji.style.left = `${Math.random() * 100}vw`;
        emoji.style.animationDuration = `${Math.random() * 2 + 3}s`;
        emoji.textContent = ['🎉', '🥳', '🎊', '✨', '🎇'][Math.floor(Math.random() * 5)];
        fallingEmojis.appendChild(emoji);
    }
}

// Clear Celebration
function clearCelebration() {
    fallingEmojis.innerHTML = '';
}

// Initialize Game
startGame();
