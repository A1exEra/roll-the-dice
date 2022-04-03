'use strict';
//import 'core-js/stable';
//import 'regenerator-runtime/runtime';
//<<<Selecting elements>>>
const player0Element = document.querySelector(`.player--0`);
const player1Element = document.querySelector(`.player--1`);
const score0Element = document.querySelector(`#score--0`);
const score1Element = document.getElementById(`score--1`);
const current0Element = document.getElementById(`current--0`);
const current1Element = document.getElementById(`current--1`);
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);
//<<<Starting conditions>>>
// score0Element.textContent = 0;
// score1Element.textContent = 0;
// diceElement.classList.add('hidden');

//<<<initializing the game
let scores, currentScore, activePlayer, playing;
const initializeGame = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  diceElement.classList.add('hidden');
  player0Element.classList.remove(`player--winner`);
  player1Element.classList.remove(`player--winner`);
  player0Element.classList.add(`player--active`);
  player1Element.classList.remove(`player--active`);
};
initializeGame();
//<<<FInishing the game>>>

//<<<switch active palyer function>>>
const switchActivePlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  //changing the background of the player on switching
  player0Element.classList.toggle(`player--active`);
  player1Element.classList.toggle(`player--active`);
};
//<<<rolling dice functionality>>>
btnRoll.addEventListener(`click`, function () {
  if (playing) {
    //generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //display result
    diceElement.classList.remove(`hidden`);
    diceElement.src = `dice-${dice}.png`;
    //check if not 1 => scrore = 0 or roll again
    if (dice !== 1) {
      //Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //current0Element.textContent = currentScore; //Change later to display the current player!!!
    } else {
      // //switch to next player
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // //changing the background of the player on switching
      // player0Element.classList.toggle(`player--active`);
      // palyer1Element.classList.toggle(`player--active`);
      switchActivePlayer();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    console.log(`Hold Button`);
    //add current score to the score of the active player and check if score is 100 => finish game, if !not => switch to next player
    scores[activePlayer] += currentScore;
    console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if players score is >=100
    if (scores[activePlayer] >= 100) {
      //Game is won!
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
    } else {
      switchActivePlayer();
    }
  }
});
//<<<Resetting the game>>>
btnNew.addEventListener('click', initializeGame);
//hide the dice and set the value to 0
//diceElement.classList.add('hidden');
//console.log((document.querySelector('dice').value = 0));

//reset both total scores to 0
//   document.getElementById(`score--0`).textContent = 0;
//   document.getElementById(`score--1`).textContent = 0;
//reset each player score to zero
//document.querySelector(`.current-score`).textContent = 0;
//make player 1 active again
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove(`player--winner`);
//   document.querySelector(`.player--0`).classList.add(`player--active`);
//   playing = true;
