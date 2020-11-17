'use strict';

let secretNumber;
let score = 20;
let highscore = 0;

//Get random number
const createSecretNumber = function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
};
createSecretNumber();

//Display text
const displayText = function (className, text) {
  document.querySelector(className).textContent = text;
};

//Decrease score when guess is wrong
const decreaseScore = function () {
  let newScore = (document.querySelector('.score').textContent = score - 1);
  score = newScore;
};
//Change background color
const changeBackground = function (backgroundColor) {
  document.querySelector('body').style.backgroundColor = backgroundColor;
};

//When the player lost
const lostGame = function () {
  displayMessage('You lose');
  score = 0;
  displayScore();
};

//When player clicks check button
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //When there is no input
  if (!guess) {
    displayText('.message', 'Please type a number');
    //When the guessed number is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayText('.message', guess > secretNumber ? 'Too high' : 'Too low');
      decreaseScore();
    } else {
      lostGame();
    }
    //When the secret number is guessed
  } else if (guess === secretNumber) {
    displayText('.message', 'Correct number!');
    changeBackground('#60b347');
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.number').textContent = secretNumber;
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
});

//When the player wants to play again
document.querySelector('.again').addEventListener('click', function () {
  displayText('.number', '?');
  document.querySelector('.number').style.width = '15rem';
  changeBackground('#222');
  displayText('.message', 'Start guessing...');
  document.querySelector('.guess').value = '';
  createSecretNumber();
  score = 20;
  displayScore();
});
