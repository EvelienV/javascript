'use strict';

//Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

let scores, currentScore, activePlayer;

//Starting conditions
const startGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  dice.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  btnHold.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  dice.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
startGame();

//switch player
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//show current score
const showCurrentScore = function () {
  document.getElementById(
    `current--${activePlayer}`
  ).textContent = currentScore;
};

//Roll dice
btnRoll.addEventListener('click', function () {
  //Generate random dice roll
  const diceRoll = Math.trunc(Math.random() * 6) + 1;
  //Display dice roll
  dice.classList.remove('hidden');
  dice.src = `dice-${diceRoll}.png`;
  if (diceRoll !== 1) {
    //Add dice roll to score
    currentScore += diceRoll;
    showCurrentScore();
  } else {
    //Is it a 1 -> switch to other player
    //current score to zero
    currentScore = 0;
    showCurrentScore();
    //player active class to other player
    switchPlayer();
    //dice hidden again
  }
  //Display new score
});

btnHold.addEventListener('click', function () {
  //Add current score to score of active playes
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  currentScore = 0;
  showCurrentScore();
  //Check if score >100
  if (scores[activePlayer] >= 100) {
    //finish the game
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    btnHold.classList.add('hidden');
    btnRoll.classList.add('hidden');
    dice.classList.add('hidden');
  } else {
    //switch player
    switchPlayer();
  }
});

btnNew.addEventListener('click', startGame);
