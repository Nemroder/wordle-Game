import { fromEvent, Subject } from "rxjs";
import WORDS_LIST from "./wordsList.json";

const letterRows = document.getElementsByClassName("letter-row");
const messageText = document.getElementById('message-text')
const onKeyDown$ = fromEvent(document, "keydown");

let letterIndex = 0;
let letterRowIndex = 0;
let userAnswer = [];
const getRandomWord = () =>
    WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
let rightWord = getRandomWord();
console.log(`Right word: ${rightWord}`);

console.log(rightWord);


const userWinOrLoose$ = new Subject();

const insertLetter = {
  next: (event) => {
    const pressedKey = event.key.toUpperCase();

    if (pressedKey.length === 1 && pressedKey.match(/[a-z]/i)) {
      let letterBox =
        Array.from(letterRows)[letterRowIndex].children[letterIndex];
      letterBox.textContent = pressedKey;
      letterBox.classList.add("filled-letter");
      letterIndex++;
      userAnswer.push(pressedKey);
    }
  },
};

const deleteLetter = {
    next: (event) => {
        const pressedKey = event.key;

        if (pressedKey === "Backspace" && letterIndex !== 0) {
            let letterBox = letterRows[letterRowIndex].children[userAnswer.length - 1];
            letterBox.textContent = "";
            letterBox.classList.remove("filled-letter");
            letterIndex--;
            userAnswer.pop();
        }
    },
};

const checkWord = {
    next: (event) => {
        if (event.key === "Enter"){
            const rightWordArray = Array.from(rightWord);

            if (userAnswer.length !== 5) {
                messageText.textContent = "¡Te faltan algunas letras!";
                return;
            }

            for (let i = 0; i < 5; i++) {
                let letterColor = "";
                let letterBox = Array.from(letterRows)[letterRowIndex].children[i]
                console.log(letterBox);
                let letterPosition = rightWord.indexOf(userAnswer[i]);
                console.log(letterPosition);

            if (letterPosition === -1) {
                 letterColor = "letter-grey";
            }   else {
                    if (rightWord[i] === userAnswer[i]) {
                        letterColor = "letter-green";
                    }   else {
                        letterColor = "letter-yellow";
                    }
            }

            letterBox.classList.add(letterColor);

            // if (userAnswer.length === 5) {
            //     letterIndex = 0;
            //     userAnswer = [];
            //     letterRowIndex++;
            // }   else {
            //     messageText.textContent = "¡Te faltan algunas letras!";
            // }
            if (userAnswer.join("") === rightWord) {
                userWinOrLoose$.next();
            }
            }
        }
    },
};


onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(checkWord);
onKeyDown$.subscribe(deleteLetter);


userWinOrLoose$.subscribe((value) => {
    let letterRowsWinned = Array.from(letterRows)[letterRowIndex];
    console.log(letterRowsWinned);
    for (let i = 0; i < 5; i++) {
      letterRowsWinned.children[i].classList.add("letter-green");
    }
  });