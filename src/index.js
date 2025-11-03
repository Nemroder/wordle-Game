import { fromEvent, Subject } from "rxjs";
import WORDS_LIST from "./wordsList.json";

const letterRows = document.getElementsByClassName("letter-row");
const messageText = document.getElementById("message-text");
const onKeyDown$ = fromEvent(document, "keydown");

let letterIndex = 0;
let letterRowIndex = 0;
let userAnswer = [];
let rightWord = getRandomWord();
let gameOver = false;

console.log(`Right word: ${rightWord}`);

const userWinOrLoose$ = new Subject();

// 👉 Función para obtener palabra aleatoria
function getRandomWord() {
  return WORDS_LIST[Math.floor(Math.random() * WORDS_LIST.length)];
}

// 👉 Reiniciar el tablero
function resetGame() {
  // limpiar todas las letras y clases
  Array.from(letterRows).forEach((row) => {
    Array.from(row.children).forEach((box) => {
      box.textContent = "";
      box.className = "letter-box";
    });
  });

  // resetear variables
  letterIndex = 0;
  letterRowIndex = 0;
  userAnswer = [];
  rightWord = getRandomWord();
  gameOver = false;
  messageText.textContent = "New game started!";

  console.log(`Right word: ${rightWord}`);
}

// 👉 Insertar letras
const insertLetter = {
  next: (event) => {
    if (gameOver) return;

    const pressedKey = event.key.toUpperCase();

    if (pressedKey.length === 1 && pressedKey.match(/[A-Z]/i)) {
      const rows = Array.from(letterRows);
      if (letterRowIndex >= rows.length) return;

      const currentRow = rows[letterRowIndex];
      const boxes = currentRow.children;
      if (letterIndex >= boxes.length) return;

      const letterBox = boxes[letterIndex];
      if (!letterBox) return;

      letterBox.textContent = pressedKey;
      letterBox.classList.add("filled-letter");
      userAnswer.push(pressedKey);
      letterIndex++;
    }
  },
};

// 👉 Borrar letras
const deleteLetter = {
  next: (event) => {
    if (gameOver) return;

    const pressedKey = event.key;
    if (pressedKey === "Backspace" && letterIndex > 0) {
      const currentRow = Array.from(letterRows)[letterRowIndex];
      const boxes = currentRow.children;
      const letterBox = boxes[letterIndex - 1];
      if (!letterBox) return;

      letterBox.textContent = "";
      letterBox.classList.remove("filled-letter");
      userAnswer.pop();
      letterIndex--;
    }
  },
};

// 👉 Comprobar palabra
const checkWord = {
  next: (event) => {
    if (event.key === "Enter") {
      if (gameOver) {
        // si ya terminó, reinicia el juego
        resetGame();
        return;
      }

      if (userAnswer.length !== 5) {
        messageText.textContent = "¡Te faltan algunas letras!";
        return;
      }

      const currentRow = Array.from(letterRows)[letterRowIndex];

      for (let i = 0; i < 5; i++) {
        let letterBox = currentRow.children[i];
        let letterColor = "";
        let letterPosition = rightWord.indexOf(userAnswer[i]);

        if (letterPosition === -1) {
          letterColor = "letter-grey";
        } else if (rightWord[i] === userAnswer[i]) {
          letterColor = "letter-green";
        } else {
          letterColor = "letter-yellow";
        }

        letterBox.classList.add(letterColor);
      }

      const guessedWord = userAnswer.join("");

      if (guessedWord === rightWord) {
        messageText.textContent = "🎉 ¡Ganaste! Presiona ENTER para jugar de nuevo";
        gameOver = true;
        userWinOrLoose$.next();
        return;
      }

      // Pasar a la siguiente fila
      letterRowIndex++;
      letterIndex = 0;
      userAnswer = [];

      if (letterRowIndex >= letterRows.length) {
        messageText.textContent = `😢 Game Over! La palabra era: ${rightWord}. Presiona ENTER para jugar de nuevo.`;
        gameOver = true;
      } else {
        messageText.textContent = "Intenta de nuevo...";
      }
    }
  },
};

// 👉 Suscripciones
onKeyDown$.subscribe(insertLetter);
onKeyDown$.subscribe(checkWord);
onKeyDown$.subscribe(deleteLetter);

// 👉 Si gana, pintar toda la fila en verde
userWinOrLoose$.subscribe(() => {
  let letterRowsWinned = Array.from(letterRows)[letterRowIndex];
  for (let i = 0; i < 5; i++) {
    letterRowsWinned.children[i].classList.add("letter-green");
  }
});
