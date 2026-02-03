// --- GAME CONFIGURATION ---
let playerHealth = 100;
let cpuHealth = 100;
const damageAmount = 15; // Standard damage per hit

// --- DOM ELEMENTS ---
// We capture the HTML elements so we can update them
const playerHealthBar = document.getElementById('player-health');
const cpuHealthBar = document.getElementById('cpu-health');
const commentary = document.getElementById('commentary');
const resetBtn = document.getElementById('reset-btn');
const controls = document.querySelector('.controls');

// --- MAIN GAME FUNCTION ---
function playRound(playerMove) {
    // 1. Determine CPU Move
    const moves = ['strike', 'grapple', 'block'];
    const cpuMove = moves[Math.floor(Math.random() * moves.length)];

    // 2. Determine Winner
    let result = '';

    if (playerMove === cpuMove) {
        result = "draw";
    } else if (
        (playerMove === 'strike' && cpuMove === 'grapple') ||
        (playerMove === 'grapple' && cpuMove === 'block') ||
        (playerMove === 'block' && cpuMove === 'strike')
    ) {
        result = "win";
    } else {
        result = "lose";
    }

    // 3. Update Game State based on result
    updateGame(result, playerMove, cpuMove);
}

function updateGame(result, pMove, cMove) {
    let message = "";

    if (result === "draw") {
        message = `Clash! Both attempted ${pMove}. No damage!`;
    } else if (result === "win") {
        cpuHealth -= damageAmount;
        message = `YES! Your ${pMove} crushed their ${cMove}!`;
    } else {
        playerHealth -= damageAmount;
        message = `OUCH! Their ${cMove} beat your ${pMove}!`;
    }

    // Prevent negative health numbers
    if (playerHealth < 0) playerHealth = 0;
    if (cpuHealth < 0) cpuHealth = 0;

    // Update UI
    playerHealthBar.style.width = playerHealth + "%";
    cpuHealthBar.style.width = cpuHealth + "%";
    document.getElementById('player-hp-text').innerText = playerHealth + " / 100 HP";
    document.getElementById('cpu-hp-text').innerText = cpuHealth + " / 100 HP";
    commentary.innerText = message;

    // Check for Game Over
    checkGameOver();
}

function checkGameOver() {
    if (playerHealth === 0 || cpuHealth === 0) {
        // Hide controls so user can't keep playing
        controls.style.display = 'none';
        resetBtn.style.display = 'inline-block';

        if (playerHealth > 0) {
            commentary.innerText = "🏆 WINNER! You are the champion!";
            commentary.style.color = "gold";
        } else {
            commentary.innerText = "💀 KO! You have been defeated.";
            commentary.style.color = "red";
        }
    }
}

function resetGame() {
    playerHealth = 100;
    cpuHealth = 100;
    
    // Reset UI
    playerHealthBar.style.width = "100%";
    cpuHealthBar.style.width = "100%";
    controls.style.display = 'flex';
    resetBtn.style.display = 'none';
    commentary.style.color = "#00ff00";
    commentary.innerText = "New Match! The bell rings!";
}
