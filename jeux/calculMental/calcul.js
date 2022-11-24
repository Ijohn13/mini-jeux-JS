const reboursDiv = document.getElementById('minuteur');
const calculDiv = document.getElementById('calcul');
const propalInput = document.getElementById('resultPropal');
const messengerDiv = document.getElementById('messenger');
const showPlayingDiv = document.querySelectorAll('.showPlayingDiv');
const nbSecondsGameInput = document.getElementById('nbSecondGame');
const maxNumberCalcInput = document.getElementById('maxNumberCalc');
const containerParamatersDiv = document.querySelectorAll('.container-paramaters');

let tempsMinuteurBase = 21;
let maxCalculNumber = 20;
let compteurInterval = null;
let tempsRestant = 0;
let calculEnCours = null;
let cptGoodAnswer = 0;
let cptBadAnswer = 0;
let allCalculRecap = '';

document.getElementById('validPropal').addEventListener('click', () => {
    checkPropal();
})

propalInput.addEventListener('keyup', (e) => {
    if(e.key == 'Enter') {
        checkPropal();
    }
})

function checkPropal() {
    if(propalInput.value == calculEnCours.result) {
        messengerDiv.innerHTML = '<span>Bravo tu as trouvé !!</span><br>';
        cptGoodAnswer++;
        allCalculRecap += `${calculEnCours.showCalculWithResult} || <span class="goodAnswer">${propalInput.value}</span><br>`;
    } else {
        messengerDiv.innerHTML =`<span>Ce n'est pas ça !!</span><br>`;
        cptBadAnswer++;
        allCalculRecap += `${calculEnCours.showCalculWithResult} || <span class="badAnswer">${propalInput.value}</span><br>`;
    }
    propalInput.value = "";
    generateCalcul();
}

function launchGame() {
    if(nbSecondsGameInput.value != undefined) {
        tempsMinuteurBase = nbSecondsGameInput.value;
    }

    if(maxNumberCalcInput.value != undefined) {
        maxCalculNumber = maxNumberCalcInput.value;
    }

    allCalculRecap = "";
    cptGoodAnswer = 0;
    cptBadAnswer = 0;
    messengerDiv.innerHTML = "";
    reboursDiv.style.display = "block";
    lancerMinuteur(tempsMinuteurBase);
    generateCalcul();
    displayPlayingDiv(true);

}

function lancerMinuteur(tempsMinuteurBase) {
    clearInterval(compteurInterval);
    tempsRestant = tempsMinuteurBase;
    compteurInterval = setInterval(() => {
        tempsRestant --;
        reboursDiv.innerHTML = tempsRestant;
        if(tempsRestant == 0) {
            clearInterval(compteurInterval);
            displayPlayingDiv(false);
            // messengerDiv.innerHTML = "";
            messengerDiv.innerHTML += `Bonne(s) Réponse(s) : <span class="goodAnswer">${cptGoodAnswer}</span><br/>`;
            messengerDiv.innerHTML += `Mauvaise(s) Réponse(s) : <span class="badAnswer">${cptBadAnswer}</span><br/>`;
            messengerDiv.innerHTML += 
                `<form>
                    <fieldset>
                        <legend>Résultat(s)</legend>
                            ${allCalculRecap}
                    </fieldset>
                </form>`;
            containerParamaters(true);
        }
    }, 1000)
}

function generateCalcul() {
    calculEnCours = new Calcul(maxCalculNumber);
    calculDiv.innerText = calculEnCours.showCalcul;
}

function displayPlayingDiv(show) {
    let displayProperty = "none";
    if(show) {
        displayProperty = "block";
    }
    showPlayingDiv.forEach(el => {
        el.style.display = displayProperty;
    })
}

function containerParamaters(show) {
    let displayParameter = 'block';
    if(show) {
        displayParameter = 'none';
    }
    containerParamatersDiv.forEach(el => {
        el.style.display = displayParameter;
    })
}

//A mettre les classes dans un fichier different
class Calcul {
    #operators = ['*', '+', '-'];
    nombre1;
    nombre2;
    operator;

    constructor(maximum) {
        this.nombre1 = this.#getRandomInt(maximum);
        this.nombre2 = this.#getRandomInt(maximum);
        this.operator = this.#operators[this.#getRandomInt(3)];
    }

    get result() {
        return eval(this.nombre1+this.operator+this.nombre2);
    }

    get showCalcul() {
        return `${this.nombre1} ${this.operator} ${this.nombre2}`
    }

    get showCalculWithResult() {
        return `${this.showCalcul} = ${this.result}`;
    }

    #getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}

// ANIMATION title
// Wrap every letter in a span
var textWrapper = document.querySelector('.ml14 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
.add({
    targets: '.ml14 .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeInOutExpo",
    duration: 900
}).add({
    targets: '.ml14 .letter',
    opacity: [0,1],
    translateX: [40,0],
    translateZ: 0,
    scaleX: [0.3, 1],
    easing: "easeOutExpo",
    duration: 800,
    offset: '-=600',
    delay: (el, i) => 150 + 25 * i
}).add({
    targets: '.ml14',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
});