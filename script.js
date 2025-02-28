const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('click-button');
const autoClickerButton = document.getElementById('auto-clicker');
const clickMultiplierButton = document.getElementById('click-multiplier');
const megaClickerButton = document.getElementById('mega-clicker');
const pointDoublerButton = document.getElementById('point-doubler');
const saveButton = document.getElementById('save-button');
const loadButton = document.getElementById('load-button');
const achievementsList = document.getElementById('achievements-list');

let points = 0;
let autoClickerCost = 10;
let clickMultiplierCost = 50;
let megaClickerCost = 100;
let pointDoublerCost = 500;
let autoClickerLevel = 0;
let clickMultiplierLevel = 1;
let megaClickerLevel = 0;
let pointDoublerLevel = 1;

const achievements = [
    { id: 'clicker-novice', name: 'Clicker Novice', condition: (points) => points >= 100, unlocked: false },
    { id: 'auto-clicker', name: 'Auto-Clicker', condition: (autoClickerLevel) => autoClickerLevel >= 1, unlocked: false },
    { id: 'point-master', name: 'Point Master', condition: (points) => points >= 1000, unlocked: false },
    { id: 'mega-clicker', name: 'Mega Clicker', condition: (megaClickerLevel) => megaClickerLevel >= 1, unlocked: false },
    { id: 'point-doubler', name: 'Point Doubler', condition: (pointDoublerLevel) => pointDoublerLevel >= 1, unlocked: false },
];

// Update the score display
function updateScore() {
    scoreDisplay.textContent = `Points: ${points}`;
}

// Handle clicking the button
clickButton.addEventListener('click', () => {
    points += clickMultiplierLevel * pointDoublerLevel;
    updateScore();
    checkAchievements();
});

// Handle buying the auto-clicker upgrade
autoClickerButton.addEventListener('click', () => {
    if (points >= autoClickerCost) {
        points -= autoClickerCost;
        autoClickerLevel++;
        autoClickerCost = Math.ceil(autoClickerCost * 1.5); // Increase cost
        updateScore();
        autoClickerButton.textContent = `Buy Auto-Clicker (Cost: ${autoClickerCost})`;
        startAutoClicker();
        checkAchievements();
    }
});

// Handle buying the click multiplier upgrade
clickMultiplierButton.addEventListener('click', () => {
    if (points >= clickMultiplierCost) {
        points -= clickMultiplierCost;
        clickMultiplierLevel++;
        clickMultiplierCost = Math.ceil(clickMultiplierCost * 2); // Increase cost
        updateScore();
        clickMultiplierButton.textContent = `Buy Click Multiplier (Cost: ${clickMultiplierCost})`;
    }
});

// Handle buying the mega-clicker upgrade
megaClickerButton.addEventListener('click', () => {
    if (points >= megaClickerCost) {
        points -= megaClickerCost;
        megaClickerLevel++;
        megaClickerCost = Math.ceil(megaClickerCost * 2); // Increase cost
        updateScore();
        megaClickerButton.textContent = `Buy Mega Clicker (Cost: ${megaClickerCost})`;
        startMegaClicker();
        checkAchievements();
    }
});

// Handle buying the point doubler upgrade
pointDoublerButton.addEventListener('click', () => {
    if (points >= pointDoublerCost) {
        points -= pointDoublerCost;
        pointDoublerLevel++;
        pointDoublerCost = Math.ceil(pointDoublerCost * 2); // Increase cost
        updateScore();
        pointDoublerButton.textContent = `Buy Point Doubler (Cost: ${pointDoublerCost})`;
        checkAchievements();
    }
});

// Automatically add points based on auto-clicker level
function startAutoClicker() {
    if (autoClickerLevel > 0) {
        setInterval(() => {
            points += autoClickerLevel;
            updateScore();
            checkAchievements();
        }, 1000); // Add points every second
    }
}

// Automatically add points based on mega-clicker level
function startMegaClicker() {
    if (megaClickerLevel > 0) {
        setInterval(() => {
            points += megaClickerLevel * 10;
            updateScore();
            checkAchievements();
        }, 5000); // Add points every 5 seconds
    }
}

// Check and unlock achievements
function checkAchievements() {
    achievements.forEach((achievement) => {
        if (!achievement.unlocked && achievement.condition(
            achievement.id === 'clicker-novice' || achievement.id === 'point-master' ? points :
            achievement.id === 'auto-clicker' ? autoClickerLevel :
            achievement.id === 'mega-clicker' ? megaClickerLevel :
            pointDoublerLevel
        )) {
            achievement.unlocked = true;
            const achievementItem = document.createElement('li');
            achievementItem.textContent = achievement.name;
            achievementItem.classList.add('unlocked');
            achievementsList.appendChild(achievementItem);
        }
    });
}

// Save the game state
saveButton.addEventListener('click', () => {
    const gameState = {
        points,
        autoClickerCost,
        clickMultiplierCost,
        megaClickerCost,
        pointDoublerCost,
        autoClickerLevel,
        clickMultiplierLevel,
        megaClickerLevel,
        pointDoublerLevel,
        achievements,
    };
    localStorage.setItem('idleClickerGame', JSON.stringify(gameState));
    alert('Game saved!');
});

// Load the game state
loadButton.addEventListener('click', () => {
    const savedGame = localStorage.getItem('idleClickerGame');
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        points = gameState.points;
        autoClickerCost = gameState.autoClickerCost;
        clickMultiplierCost = gameState.clickMultiplierCost;
        megaClickerCost = gameState.megaClickerCost;
        pointDoublerCost = gameState.pointDoublerCost;
        autoClickerLevel = gameState.autoClickerLevel;
        clickMultiplierLevel = gameState.clickMultiplierLevel;
        megaClickerLevel = gameState.megaClickerLevel;
        pointDoublerLevel = gameState.pointDoublerLevel;
        achievements.forEach((achievement, index) => {
            achievement.unlocked = gameState.achievements[index].unlocked;
            if (achievement.unlocked) {
                const achievementItem = document.createElement('li');
                achievementItem.textContent = achievement.name;
                achievementItem.classList.add('unlocked');
                achievementsList.appendChild(achievementItem);
            }
        });
        updateScore();
        autoClickerButton.textContent = `Buy Auto-Clicker (Cost: ${autoClickerCost})`;
        clickMultiplierButton.textContent = `Buy Click Multiplier (Cost: ${clickMultiplierCost})`;
        megaClickerButton.textContent = `Buy Mega Clicker (Cost: ${megaClickerCost})`;
        pointDoublerButton.textContent = `Buy Point Doubler (Cost: ${pointDoublerCost})`;
        startAutoClicker();
        startMegaClicker();
        alert('Game loaded!');
    } else {
        alert('No saved game found!');
    }
});

// Disable upgrade buttons if the player can't afford them
function checkUpgrades() {
    autoClickerButton.disabled = points < autoClickerCost;
    clickMultiplierButton.disabled = points < clickMultiplierCost;
    megaClickerButton.disabled = points < megaClickerCost;
    pointDoublerButton.disabled = points < pointDoublerCost;
}

// Update the game state
setInterval(() => {
    checkUpgrades();
}, 100);

// Initialize the game
updateScore();