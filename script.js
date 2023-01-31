const userName = document.querySelector('#user-name');
const takeUserNameBtn = document.querySelector('#take-user-name-btn');
const gameLog = document.querySelector('#game-log');
const welcomeMsg = document.querySelector('#welcome-msg');
const playerStats = document.querySelector('#player-stats');
playerStats.style.display = 'none';
const userNameLabel = document.querySelector('#user-name-label');
const potionChestMonsterBtn = document.querySelector(
	'#potion-chest-monster-btn'
);
const alertPrompt = document.querySelector('#alert-prompt');
alertPrompt.style.display = 'none';
const newGameBtn = document.querySelector('#new-game-btn');
newGameBtn.style.display = 'none';
const generateValue = document.querySelector('#generate-value-btn');
potionChestMonsterBtn.disabled = true;
generateValue.disabled = true;

function updateElementText(elementId, textValue) {
	const element = document.querySelector(`#${elementId}`);
	element.textContent = `${textValue}`;
}
function updateGameLog(text) {
	const element = document.createElement('li');
	const textnode = document.createTextNode(`${text}`);
	element.appendChild(textnode);
	gameLog.appendChild(element);
}
function pickRandomElement(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
let newNum = 0;
function outputPotionChestMonster() {
	let newRandomEvent = Math.floor(Math.random() * 3);
	newNum = newRandomEvent;
	randomEvent = newRandomEvent;
	switch (newRandomEvent) {
		case 0: //potion
			updateGameLog(`Great, it's a ${items[0]}`);
			break;
		case 1: //chest
			updateGameLog(`Congrats, you won a ${items[1]}`);
			break;
		case 2: //monster
			updateGameLog(`Unfortunately, it's a ${items[2]}`);
			break;
	}
}
function outputPotionChestMonsterValues() {
	randomEvent = newNum;
	switch (randomEvent) {
		case 0: //potion
			let healthValue = Math.floor(Math.random() * 51);
			if (healthValue === 0) {
				console.log(`This potion is empty!`);
				updateGameLog(`This potion is empty!`);
			} else {
				if (currentHealth + healthValue > 100) {
					if (currentHealth + healthValue >= 100) {
						console.log(`You gain ${healthValue}! You are at max health!`);
						updateGameLog(
							`You gain ${100 - currentHealth}! You are at max health!`
						);
						currentHealth = 100;
					}
					updateElementText('player-health', 100);
				} else {
					currentHealth += healthValue;
					console.log(
						`You healed by ${healthValue} and your health is ${currentHealth}!`
					);
					updateGameLog(`You healed by ${healthValue}!`);
					updateElementText('player-health', currentHealth);
				}
			}
			break;
		case 1: //chest
			let coinsInChest = Math.floor(Math.random() * 11);
			totalCoins += coinsInChest;
			if (coinsInChest === 0) {
				console.log(`You found: ${coinsInChest} coins!`);
				updateGameLog(`The chest is empty!`);
				updateElementText('player-chests', chestCounter);

				//Да се генерира от бутон
				// coins += coinsInChest;
				// console.log(`Total coins are: ${coins} coins!`);
			} else {
				console.log(`You found: ${coinsInChest} coins!`);
				updateGameLog(`You found: ${coinsInChest} coins!`);
				chestCounter++;
				updateElementText('player-chests', chestCounter);
				updateElementText('player-total-coins', totalCoins);
				//Да се генерира от бутон
				// coins += coinsInChest;
				// console.log(`Total coins are: ${coins} coins!`);
			}
			break;
		case 2: // monster
			let randomMonster = pickRandomElement(monsters);
			let monsterDmg = Math.floor(Math.random() * 51 + 10); // 10 to 60
			if (monsterDmg === 0) {
				console.log(`The monster ${randomMonster} missed and you escape!`);
				updateGameLog(`${randomMonster} missed and you dodge the attack!`);
				killsCounter++;
				updateElementText('player-monster-kills', killsCounter);
			} else {
				console.log(`${randomMonster} take you ${monsterDmg} damage!`);
				updateGameLog(`${randomMonster} take you ${monsterDmg} damage!`);
				currentHealth -= monsterDmg;
				killsCounter++;
				updateElementText('player-monster-kills', killsCounter);
				if (currentHealth > 0) {
					console.log(`Your current health is ${currentHealth}!`);
					updateElementText('player-health', currentHealth);
				}
			}
			break;
	}
}

let defaultHealth = 100;
let currentHealth = defaultHealth;
let totalCoins = 0;
let chestCounter = 0;
let killsCounter = 0;
let randomEvent;
const items = ['potion', 'chest', 'monster'];
const monsters = [
	'Dracula 🧛‍♂️',
	'Frankenstein 🧟‍♂️',
	'Werewolf 🐺',
	'Mummy 💀',
	'Zombie 🧟‍♀️',
	'Gargoyle 🗿',
	'Skeleton 💀',
	'Vampire 🧛‍♂️',
	'Ghost 👻',
	'Yeti 🐻',
];

takeUserNameBtn.addEventListener('click', () => {
	if (userName.value === '') {
		alertPrompt.style.display = 'block';
		alertPrompt.textContent = 'Enter you username before playing the game!';
		setTimeout(() => {
			alertPrompt.style.display = 'none';
			alertPrompt.textContent = '';
		}, 2000);
	} else {
		playerStats.style.display = 'block';
		userNameLabel.style.display = 'none';
		userName.style.display = 'none';
		takeUserNameBtn.style.display = 'none';
		welcomeMsg.innerHTML = `Work done ${userName.value}! Adventure time!`;
		potionChestMonsterBtn.disabled = false;
		generateValue.disabled = true;
	}
});
potionChestMonsterBtn.addEventListener('click', () => {
	if (potionChestMonsterBtn.disabled === false) {
		potionChestMonsterBtn.disabled = true;
	} else {
		potionChestMonsterBtn.disabled = false;
	}
	generateValue.disabled = false;
	outputPotionChestMonster();
});
generateValue.addEventListener('click', () => {
	if (generateValue.disabled === true) {
		generateValue.disabled === false;
	} else {
		generateValue.disabled = true;
	}
	potionChestMonsterBtn.disabled = false;
	outputPotionChestMonsterValues();
	if (currentHealth <= 0) {
		console.log(`${userName.value}, you lost the game! Your health is 0!`);
		welcomeMsg.innerHTML = `${userName.value}, you died! Your health is 0! <br>`;
		generateValue.style.display = 'none';
		potionChestMonsterBtn.style.display = 'none';
		newGameBtn.style.display = 'flex';
		newGameBtn.style.display = 'flex';
		updateElementText('player-health', 0);
		if (totalCoins >= 25) {
			welcomeMsg.innerHTML += `You have ${totalCoins} coins. Do you want a extra live for 25 coins?<br>`;
			const buttonYes = document.createElement('button');
			buttonYes.textContent = 'YES';
			const buttonNo = document.createElement('button');
			buttonNo.textContent = 'NO';
			const parentElement = document.querySelector('#welcome-msg');
			parentElement.appendChild(buttonYes);
			parentElement.appendChild(buttonNo);
		}
	}
});
newGameBtn.addEventListener('click', () => {
	console.log('The game will restart after 3 seconds!');
	welcomeMsg.innerHTML = `Hey, ${userName.value}. The game will restart after 3 seconds!`;
	setTimeout(() => {
		location.reload();
	}, 3000);
});
