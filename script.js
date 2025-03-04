const scoreDisplay = document.getElementById('score');
const clickButton = document.getElementById('click-button');
const upgradesList = document.getElementById('upgrades-list');
const fishButton = document.getElementById('fish-button');
const fishingResult = document.getElementById('fishing-result');
const fishingRodsList = document.getElementById('fishing-rods-list');
const fishingRodInventoryList = document.getElementById('fishing-rod-inventory-list');
const bestiaryList = document.getElementById('bestiary-list');
const rebirthButton = document.getElementById('rebirth-button');
const rebirthCostDisplay = document.getElementById('rebirth-cost');
const rebirthCountDisplay = document.getElementById('rebirth-count');
const eventNotification = document.getElementById('event-notification');
const saveButton = document.getElementById('save-button');
const loadButton = document.getElementById('load-button');

let points = 0;
let rebirthCount = 0;
let clickMultiplier = 1;
let eventActive = false;
let eventMultiplier = 1;
let rebirthCost = 1000; // Base rebirth cost
let upgrades = [
    { id: 'auto-clicker', name: 'Auto-Clicker', cost: 10, effect: 1, level: 0 },
    { id: 'click-multiplier', name: 'Click Multiplier', cost: 50, effect: 2, level: 0 },
    { id: 'mega-clicker', name: 'Mega Clicker', cost: 100, effect: 10, level: 0 },
    { id: 'point-doubler', name: 'Point Doubler', cost: 500, effect: 2, level: 0 },
    { id: 'turbo-clicker', name: 'Turbo Clicker', cost: 1000, effect: 5, level: 0 },
    { id: 'golden-clicker', name: 'Golden Clicker', cost: 5000, effect: 20, level: 0 },
    { id: 'time-warp', name: 'Time Warp', cost: 10000, effect: 50, level: 0 },
    { id: 'click-god', name: 'Click God', cost: 50000, effect: 100, level: 0 },
];

let fishingRods = [
    { id: 'basic-rod', name: 'Basic Rod', cost: 100, luck: 1, level: 0 },
    { id: 'advanced-rod', name: 'Advanced Rod', cost: 500, luck: 2, level: 0 },
    { id: 'golden-rod', name: 'Golden Rod', cost: 2000, luck: 5, level: 0 },
    { id: 'legendary-rod', name: 'Legendary Rod', cost: 10000, luck: 10, level: 0 },
];

let bestiary = [
    { id: 'small-fish', name: 'Small Fish', description: 'A tiny fish. Not very valuable.', rarity: 'Common', caught: 0 },
    { id: 'big-fish', name: 'Big Fish', description: 'A larger fish. Worth more points.', rarity: 'Uncommon', caught: 0 },
    { id: 'golden-fish', name: 'Golden Fish', description: 'A rare golden fish. Very valuable!', rarity: 'Rare', caught: 0 },
    { id: 'boot', name: 'Old Boot', description: 'A worn-out boot. Worth nothing.', rarity: 'Common', caught: 0 },
    { id: 'rainbow-fish', name: 'Rainbow Fish', description: 'A colorful fish. Extremely rare!', rarity: 'Legendary', caught: 0 },
    { id: 'shark', name: 'Shark', description: 'A dangerous predator. Handle with care!', rarity: 'Epic', caught: 0 },
    { id: 'jellyfish', name: 'Jellyfish', description: 'A glowing jellyfish. Beautiful but fragile.', rarity: 'Rare', caught: 0 },
    { id: 'octopus', name: 'Octopus', description: 'A clever octopus. Hard to catch!', rarity: 'Epic', caught: 0 },
    { id: 'whale', name: 'Whale', description: 'A massive whale. The king of the sea!', rarity: 'Legendary', caught: 0 },
    { id: 'clownfish', name: 'Clownfish', description: 'A colorful clownfish. Found in coral reefs.', rarity: 'Uncommon', caught: 0 },
    { id: 'anglerfish', name: 'Anglerfish', description: 'A deep-sea fish with a glowing lure.', rarity: 'Rare', caught: 0 },
    { id: 'pufferfish', name: 'Pufferfish', description: 'A spiky fish that inflates when threatened.', rarity: 'Uncommon', caught: 0 },
    { id: 'seahorse', name: 'Seahorse', description: 'A tiny seahorse. Very delicate.', rarity: 'Rare', caught: 0 },
    { id: 'stingray', name: 'Stingray', description: 'A flat fish with a long tail.', rarity: 'Epic', caught: 0 },
    { id: 'tuna', name: 'Tuna', description: 'A fast-swimming fish. Great for sushi!', rarity: 'Uncommon', caught: 0 },
    { id: 'salmon', name: 'Salmon', description: 'A fish that swims upstream to spawn.', rarity: 'Uncommon', caught: 0 },
    { id: 'catfish', name: 'Catfish', description: 'A bottom-dwelling fish with whiskers.', rarity: 'Common', caught: 0 },
    { id: 'dolphin', name: 'Dolphin', description: 'A playful and intelligent marine mammal.', rarity: 'Legendary', caught: 0 },
    { id: 'squid', name: 'Squid', description: 'A fast-moving cephalopod with tentacles.', rarity: 'Epic', caught: 0 },
    { id: 'lobster', name: 'Lobster', description: 'A large crustacean with claws.', rarity: 'Rare', caught: 0 },
];

// Update the score display
function updateScore() {
    scoreDisplay.textContent = `Points: ${points}`;
    renderUpgrades(); // Re-render upgrades to update button states
    renderFishingRods(); // Re-render fishing rods to update button states
    updateRebirthCost(); // Update rebirth cost display
}

// Update rebirth cost display
function updateRebirthCost() {
    rebirthCostDisplay.textContent = `Cost: ${rebirthCost}`;
}

// Handle clicking the button
clickButton.addEventListener('click', () => {
    points += clickMultiplier * eventMultiplier;
    updateScore();
});

// Render upgrades
function renderUpgrades() {
    upgradesList.innerHTML = '';
    upgrades.forEach(upgrade => {
        const upgradeDiv = document.createElement('div');
        upgradeDiv.classList.add('upgrade');
        upgradeDiv.innerHTML = `
            <span>${upgrade.name} (Level: ${upgrade.level})</span>
            <button onclick="buyUpgrade('${upgrade.id}')" ${points >= upgrade.cost ? '' : 'disabled'}>
                Buy (Cost: ${upgrade.cost})
            </button>
        `;
        upgradesList.appendChild(upgradeDiv);
    });
}

// Buy an upgrade
function buyUpgrade(id) {
    const upgrade = upgrades.find(u => u.id === id);
    if (points >= upgrade.cost) {
        points -= upgrade.cost;
        upgrade.level++;
        upgrade.cost = Math.ceil(upgrade.cost * 1.5); // Increase cost
        updateScore();
        if (id === 'click-multiplier') {
            clickMultiplier = upgrade.level + 1;
        }
    }
}

// Render fishing rods
function renderFishingRods() {
    fishingRodsList.innerHTML = '';
    fishingRods.forEach(rod => {
        const rodDiv = document.createElement('div');
        rodDiv.classList.add('fishing-rod');
        rodDiv.innerHTML = `
            <span>${rod.name} (Luck: +${rod.luck})</span>
            <button onclick="buyFishingRod('${rod.id}')" ${points >= rod.cost ? '' : 'disabled'}>
                Buy (Cost: ${rod.cost})
            </button>
        `;
        fishingRodsList.appendChild(rodDiv);
    });
}

// Buy a fishing rod
function buyFishingRod(id) {
    const rod = fishingRods.find(r => r.id === id);
    if (points >= rod.cost) {
        points -= rod.cost;
        rod.level++;
        rod.cost = Math.ceil(rod.cost * 2); // Increase cost
        updateScore();
        renderFishingRodInventory();
    }
}

// Render fishing rod inventory
function renderFishingRodInventory() {
    fishingRodInventoryList.innerHTML = '';
    fishingRods.forEach(rod => {
        if (rod.level > 0) {
            const rodDiv = document.createElement('div');
            rodDiv.classList.add('fishing-rod-inventory-entry');
            rodDiv.innerHTML = `
                <strong>${rod.name}</strong>
                <span>Level: ${rod.level}</span>
                <span>Luck: +${rod.luck * rod.level}</span>
            `;
            fishingRodInventoryList.appendChild(rodDiv);
        }
    });
}

// Fishing mechanic
fishButton.addEventListener('click', () => {
    if (points >= 100) {
        points -= 100;
        updateScore();

        // Calculate total luck from fishing rods
        let totalLuck = 1; // Base luck
        fishingRods.forEach(rod => {
            totalLuck += rod.level * rod.luck;
        });

        // Adjust rewards based on luck
        const rewards = [
            { id: 'small-fish', name: 'Small Fish', value: 50, chance: 50 },
            { id: 'big-fish', name: 'Big Fish', value: 100, chance: 30 },
            { id: 'golden-fish', name: 'Golden Fish', value: 200, chance: 15 },
            { id: 'boot', name: 'Old Boot', value: 0, chance: 5 },
            { id: 'rainbow-fish', name: 'Rainbow Fish', value: 500, chance: 3 },
            { id: 'shark', name: 'Shark', value: 300, chance: 2 },
            { id: 'jellyfish', name: 'Jellyfish', value: 150, chance: 10 },
            { id: 'octopus', name: 'Octopus', value: 400, chance: 1 },
            { id: 'whale', name: 'Whale', value: 1000, chance: 0.5 },
            { id: 'clownfish', name: 'Clownfish', value: 75, chance: 20 },
            { id: 'anglerfish', name: 'Anglerfish', value: 250, chance: 5 },
            { id: 'pufferfish', name: 'Pufferfish', value: 125, chance: 15 },
            { id: 'seahorse', name: 'Seahorse', value: 175, chance: 10 },
            { id: 'stingray', name: 'Stingray', value: 350, chance: 3 },
            { id: 'tuna', name: 'Tuna', value: 150, chance: 20 },
            { id: 'salmon', name: 'Salmon', value: 125, chance: 20 },
            { id: 'catfish', name: 'Catfish', value: 75, chance: 25 },
            { id: 'dolphin', name: 'Dolphin', value: 750, chance: 1 },
            { id: 'squid', name: 'Squid', value: 300, chance: 2 },
            { id: 'lobster', name: 'Lobster', value: 200, chance: 5 },
        ];

        // Adjust chances based on luck
        const adjustedRewards = rewards.map(reward => ({
            ...reward,
            chance: reward.chance * totalLuck,
        }));

        // Select a reward based on adjusted chances
        const totalChance = adjustedRewards.reduce((sum, reward) => sum + reward.chance, 0);
        let randomValue = Math.random() * totalChance;
        let selectedReward = null;
        for (const reward of adjustedRewards) {
            if (randomValue <= reward.chance) {
                selectedReward = reward;
                break;
            }
            randomValue -= reward.chance;
        }

        // Update bestiary
        const bestiaryEntry = bestiary.find(entry => entry.id === selectedReward.id);
        if (bestiaryEntry) {
            bestiaryEntry.caught++;
        }

        fishingResult.textContent = `You caught ${selectedReward.name} and earned ${selectedReward.value} points!`;
        points += selectedReward.value;
        updateScore();
        renderBestiary();
    }
});

// Render bestiary
function renderBestiary() {
    bestiaryList.innerHTML = '';
    bestiary.forEach(entry => {
        if (entry.caught > 0) {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('bestiary-entry');
            entryDiv.innerHTML = `
                <strong>${entry.name}</strong> (${entry.rarity})
                <span>${entry.description}</span>
                <span>Caught: ${entry.caught}</span>
            `;
            bestiaryList.appendChild(entryDiv);
        }
    });
}

// Rebirth mechanic
rebirthButton.addEventListener('click', () => {
    if (points >= rebirthCost) {
        points = 0;
        rebirthCount++;
        clickMultiplier *= 2; // Double click multiplier
        rebirthCost = Math.ceil(rebirthCost * 1.5); // Increase rebirth cost
        upgrades.forEach(upgrade => {
            upgrade.level = 0;
            upgrade.cost = upgrade.id === 'auto-clicker' ? 10 : upgrade.id === 'click-multiplier' ? 50 : upgrade.id === 'mega-clicker' ? 100 : upgrade.id === 'point-doubler' ? 500 : upgrade.id === 'turbo-clicker' ? 1000 : upgrade.id === 'golden-clicker' ? 5000 : upgrade.id === 'time-warp' ? 10000 : 50000;
        });
        fishingRods.forEach(rod => {
            rod.level = 0;
            rod.cost = rod.id === 'basic-rod' ? 100 : rod.id === 'advanced-rod' ? 500 : rod.id === 'golden-rod' ? 2000 : 10000;
        });
        updateScore();
        rebirthCountDisplay.textContent = `Rebirths: ${rebirthCount}`;
    }
});

// Occasional events
function startEvent() {
    if (!eventActive) {
        eventActive = true;
        eventMultiplier = 2; // Double points during the event
        eventNotification.textContent = 'Event Active: 2x Points!';
        setTimeout(() => {
            eventActive = false;
            eventMultiplier = 1;
            eventNotification.textContent = '';
        }, 10000); // Event lasts 10 seconds
    }
}

// Randomly trigger events
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance of an event
        startEvent();
    }
}, 30000); // Check for events every 30 seconds

// Save the game state
saveButton.addEventListener('click', () => {
    const gameState = {
        points,
        rebirthCount,
        clickMultiplier,
        rebirthCost,
        upgrades,
        fishingRods,
        bestiary,
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
        rebirthCount = gameState.rebirthCount;
        clickMultiplier = gameState.clickMultiplier;
        rebirthCost = gameState.rebirthCost;
        upgrades = gameState.upgrades;
        fishingRods = gameState.fishingRods;
        bestiary = gameState.bestiary;
        updateScore();
        rebirthCountDisplay.textContent = `Rebirths: ${rebirthCount}`;
        renderBestiary();
        renderFishingRodInventory();
        alert('Game loaded!');
    } else {
        alert('No saved game found!');
    }
});

// Automatically add points from upgrades
setInterval(() => {
    let pointsPerSecond = 0;
    upgrades.forEach(upgrade => {
        pointsPerSecond += upgrade.level * upgrade.effect;
    });
    points += pointsPerSecond;
    updateScore();
}, 1000); // Add points every second

// Initialize the game
updateScore();
renderUpgrades();
renderFishingRods();
renderFishingRodInventory();
renderBestiary();
