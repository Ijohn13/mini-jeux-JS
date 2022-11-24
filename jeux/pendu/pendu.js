import {Confetti} from '../lib/confetti.js';

const buttonPlay = document.getElementById('startGame');
const allWords = ['maison', 'amoureux', 'construire', 'donner', 'exister', 'angleterre', 'exterminer'];
const wordToFindDiv = document.getElementById('wordToFindDiv');
const keyboardDiv = document.getElementById('keyboard');
const cptErreurDiv = document.getElementById('cptErreur');
let imgPendu = document.getElementById('imagePendu');
let wordToFind;
let wordToFindArray;
let cptErreur = 0;
let cptLetterFind = 0;


buttonPlay.addEventListener('click', function(){
    beginGame();
});

function beginGame() {
    //Générer un mot
    imgPendu.className = '';
    imgPendu.classList.add('etat0');
    Confetti.stopAnimationConfeti();
    cptErreurDiv.innerHTML = '';
    cptErreur = 0;
    wordToFindDiv.innerHTML = '';
    wordToFind = generateWord();
    wordToFindArray = Array.from(wordToFind);

    let table = document.createElement('table');
    let line = document.createElement('tr');
    line.id = 'lineOfWord';
    wordToFindArray.forEach(letter => {
        //créer un TD (case du tableau) par lettre
        let td = document.createElement('td');
        td.dataset.letter = letter;
        td.innerText = '_';
        line.appendChild(td);
    })

    table.appendChild(line);
    wordToFindDiv.appendChild(table);

    generateKeyboard();
}

function generateWord() {
    let indexWord = getRandomInt(allWords.length);

    return allWords[indexWord];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateKeyboard() {
    keyboardDiv.innerHTML = '';
    let alphabet = generateAlphabet();
    alphabet.forEach(letter => {
        let letterDiv = document.createElement('div');
        letterDiv.innerHTML = letter;
        letterDiv.classList.add('letterKeyboard')
        keyboardDiv.appendChild(letterDiv);

        letterDiv.addEventListener('click', () => {
            if (checkLetterInWord(letter)) {
                let lineOfWord = document.getElementById('lineOfWord');
                let allTdOfWord = lineOfWord.children;
                Array.from(allTdOfWord).forEach(td => {
                    if(td.dataset.letter == letter) {
                        td.innerHTML = letter;
                        cptLetterFind++;
                    }
                });

                if(cptLetterFind == wordToFindArray.length) {
                    keyboardDiv.innerHTML = '';
                    cptErreurDiv.innerHTML = 'YOU WIN !!!';
                    Confetti.launchAnimationConfeti();
                    // setTimeout(() => {
                    //     Confetti.stopAnimationConfeti();
                    // }, 5000);
                }
            }else {
                cptErreur++;
                cptErreurDiv.innerHTML = cptErreur + ' ERREUR(S) !!';

                imgPendu.className = '';
                imgPendu.classList.add('etat'+cptErreur);
                if(cptErreur >= 4) {
                    cptErreurDiv.innerHTML = 'Perdu, vous avez fait plus de 4 erreurs';
                    let lineOfWord = document.getElementById('lineOfWord');
                    let allTdOfWord = lineOfWord.children;
                    Array.from(allTdOfWord).forEach(td => {
                        td.innerHTML = td.dataset.letter;
                    });
                    keyboardDiv.innerHTML = '';
                }
            }

            letterDiv.style.visibility = 'hidden';
        })
    });
}

function generateAlphabet(capital = false) {
    return [...Array(26)].map((_, i) => String.fromCharCode(i +(capital ? 65 : 97)));
    
    // let tab = [];
    // for(i=0; i<26; i++) {
    //     if(capital) {
    //         tab.push(String.fromCharCode(i + 65));
    //     } else {
    //         tab.push(String.fromCharCode(i + 97));
    //     }
    // }

    // return tab
}

function checkLetterInWord(letter) {
    let findLetter = false;
    
    wordToFindArray.forEach(letterOfWord => {

        if (letter == letterOfWord) {
            findLetter = true;
        }
    });
    return findLetter;
}

//animation tilte H1
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml10 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
.add({
    targets: '.ml10 .letter',
    rotateY: [-90, 0],
    duration: 1300,
    delay: (el, i) => 45 * i
}).add({
    targets: '.ml10',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
});

//animation title H2
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml12');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
.add({
    targets: '.ml12 .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i
}).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
});