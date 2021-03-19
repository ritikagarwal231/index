'use strict';
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const curr0 = document.querySelector('#current--0');
const curr1 = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');

let score ,currentScore ,activePlayer=0;
let gamePlaying;
const func = function(){
    score =[0,0] , currentScore = 0 ;
    document.querySelector('#name--'+activePlayer).textContent = "Player-"+(activePlayer+1); 
    activePlayer =0;
    gamePlaying = true;    
    score0.textContent = 0;
    score1.textContent = 0;
    curr0.textContent =0;
    curr1.textContent =0;
    diceEl.classList.add('hidden');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--0').classList.add('player--active');       
};
func();
var nextPlayer  = function(){
    document.querySelector('.player--'+activePlayer).classList.remove('player--active');
    document.querySelector('#current--' + activePlayer).textContent = 0;
    document.querySelector('#score--'+ activePlayer).textContent = score[activePlayer];
    activePlayer = activePlayer==1 ? 0 : 1;
    document.querySelector('.player--'+activePlayer).classList.add('player--active');
    currentScore =0;
}
btnRoll.addEventListener('click',function() 
{
    if(gamePlaying===true)
    {
        let dice = Math.floor(Math.random() * 6 + 1);
        diceEl.src =  'dice-' + dice + '.png';
        diceEl.classList.remove('hidden');
        // check for rolled 1
        if(dice!==1){
            currentScore += dice ;
            document.querySelector('#current--' + activePlayer).textContent = currentScore;
        }
        else{
            nextPlayer();
        }
    }
});
btnHold.addEventListener('click',function(){
    if(gamePlaying===true){
        score[activePlayer] +=  currentScore;
        currentScore =0;
        if(score[activePlayer]< 10){
            nextPlayer();
        }
        else
        {
            document.querySelector('#score--'+ activePlayer).textContent = score[activePlayer];
            document.querySelector('.player--'+activePlayer).classList.remove('active');
            document.querySelector('.player--'+activePlayer).classList.add('player--winner');
            document.querySelector('#name--'+activePlayer).textContent="WINNER!";
            gamePlaying = false;
        }
    }
});
btnNew.addEventListener('click',func);