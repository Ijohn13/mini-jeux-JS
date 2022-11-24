import {Confetti} from '../lib/confetti.js';

let numberToFind = 0;
const resultDiv = document.getElementById('resultDiv');
const userPropal = document.getElementById('userPropal');
const reboursDiv = document.getElementById('compteARebours');
const gamePropalDiv = document.getElementById('containerTwo');
let tempsRestant = 0;
let compteurInterval = null;

document.getElementById('startGame').addEventListener("click", function() {
    launchGame();
})

document.getElementById('checkPropal').addEventListener('click', function() {
    checkPropal();
})

document.getElementById('userPropal').addEventListener('keyup', function(e) {
    if(e.key == 'Enter') {
        checkPropal();
        resetInputCheckPropal();
    }
})

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function checkPropal() {
    let numberPropal = document.getElementById('userPropal').value;
    if(numberToFind > numberPropal) {
        resultDiv.style.display = 'block';
        resultDiv.style.color = 'green';
        resultDiv.innerHTML = `C'est plus !!`;
    }else if (numberToFind < numberPropal) {
        resultDiv.style.display = 'block';
        resultDiv.style.color = 'red';
        resultDiv.innerHTML = `C'est moins !!`;
    }else if (numberToFind == numberPropal) {
        resultDiv.style.color = 'blue';
        resultDiv.innerHTML = `C'est gagné !!`;
        endGame(true);
    }
}

function resetInputCheckPropal() {
    userPropal.value = '';
}

function launchGame() {
    Confetti.stopAnimationConfeti();
    numberToFind = getRandomInt(1000);
    console.log(numberToFind);
    tempsRestant = 30;
    gamePropalDiv.style.display = 'block';

    resultDiv.style.display = 'none';

    if(compteurInterval != null) {
        clearInterval(compteurInterval);
    }
    compteurInterval = setInterval(() => {
        reboursDiv.innerHTML = tempsRestant;
        tempsRestant--;

        if(tempsRestant >= 20) {
            reboursDiv.classList.remove("warning");
            reboursDiv.classList.remove('danger');
            reboursDiv.classList.add('cool');
        }
        else if(tempsRestant >= 10) {
            reboursDiv.classList.remove("cool");
            reboursDiv.classList.remove('danger');
            reboursDiv.classList.add('warning');
        }
        else if(tempsRestant >= 0) {
            reboursDiv.classList.remove('cool');
            reboursDiv.classList.remove('warning');
            reboursDiv.classList.add('danger');
        }
        else if (tempsRestant < 0) {
            clearInterval(compteurInterval);
            endGame(false);
        }
    },1000);
}

function endGame(winner) {
    if(winner) {
        resultDiv.style.display = 'block';
        resultDiv.style.color = 'blue';
        resultDiv.innerHTML = `C'est gagné !!`;
        Confetti.launchAnimationConfeti();
    }
    else {
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = `Cest perdu !!\n Dans le cul lulu !!!`
    }
    gamePropalDiv.style.display = 'none';
    clearInterval(compteurInterval);
}

//animation title
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml11 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
.add({
    targets: '.ml11 .line',
    scaleY: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 700
})
.add({
    targets: '.ml11 .line',
    translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100
}).add({
    targets: '.ml11 .letter',
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: (el, i) => 34 * (i+1)
}).add({
    targets: '.ml11',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
});