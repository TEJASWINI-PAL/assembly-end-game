import React, { useState } from "react";
import { languages } from "./languages";
import clsx from "clsx";
import { getText, getRandomWord } from "./getText";

const Header = () => {
  // state values
  const [currentLetter, setCurrentLetter] = useState(() => getRandomWord());
  const [guessLetter, setGuessLetter] = useState([]);

  // derived values
  const numGuessLeft = languages.length - 1;

  const wrongGuessCount = guessLetter.filter(
    (letter) => !currentLetter.includes(letter)
  ).length;

  const isGameWon = currentLetter
    .split("")
    .every((letter) => guessLetter.includes(letter));
  const isGameLost = wrongGuessCount >= numGuessLeft;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessLetter = guessLetter[guessLetter.length - 1];
  const isLastGuessIncorrect =
    lastGuessLetter && !currentLetter.includes(lastGuessLetter);

  // static values
  const alphabets = "abcdefghijklmnopqrstuvwxyz";

  const addLetters = (letter) => {
    setGuessLetter((prevLetter) =>
      prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]
    );
  };

  // show languages
  const languageElements = languages.map((lang, index) => {
    const isLanguageLost = index < wrongGuessCount;
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    const className = clsx("chip", isLanguageLost && "lost");

    return (
      <span className={className} key={lang.name} style={styles}>
        {lang.name}
      </span>
    );
  });
  // show current letter
  const letterElement = currentLetter.split("").map((letter, index) => {
    const revealLetter = isGameLost || guessLetter.includes(letter);
    const letterClassName = clsx(
      isGameLost && !guessLetter.includes(letter) && "missed-letter"
    )
    return <span key={index} className={letterClassName}>{revealLetter ? letter.toUpperCase() : ""}</span>;
  });

  // show keyboards
  const keyboardElements = alphabets.split("").map((letter) => {
    const isGuessed = guessLetter.includes(letter);
    const isCorrect = isGuessed && currentLetter.includes(letter);
    const isWrong = isGuessed && !currentLetter.includes(letter);

    const className = clsx({
      correct: isCorrect,
      wrong: isWrong,
    });
    return (
      <button
        className={className}
        disabled={isGameOver}
        aria-disabled={guessLetter.includes(letter)}
        aria-label={`Letter ${letter}`}
        key={letter}
        onClick={() => addLetters(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const gameStatus = clsx("game-status", {
    won: isGameWon,
    lost: isGameLost,
    farewell: !isGameOver && isLastGuessIncorrect,
  });

  const renderGameStatus = () => {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="farewell-message">
          {getText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2>You win !</h2>
          <p>Well done 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2>Game Over !</h2>
          <p>You lose! Better start learning Assembly😪 </p>
        </>
      );
    }
    return null;
  };

  const startNewGame = () => {
    setCurrentLetter(getRandomWord());
    setGuessLetter([]);
  };

  return (
    <>
      <main>
        <header>
          <h1>Assembly: Endgame</h1>
          <p>
            Guess the word within 8 attempts to keep the programming world safe
            from Assembly.
          </p>
        </header>
        <section aria-live="polite" role="status" className={gameStatus}>
          {renderGameStatus()}
        </section>

        <section className="languages-chip">{languageElements}</section>

        <section className="word">{letterElement}</section>

        <section aria-live="polite" role="status" className="src-only">
          <p>
            {currentLetter.includes(lastGuessLetter)
              ? `Correct! The letter ${lastGuessLetter} is in the word.  `
              : `Sorry, the letter ${lastGuessLetter} is not in the word. `}
            You have {numGuessLeft} attempts left.
          </p>

          <p>
            Current word :
            {currentLetter
              .split("")
              .map((letter) => (guessLetter.includes(letter) ? letter : ""))
              .join("")}
          </p>
        </section>

        <section className="keyboard">{keyboardElements}</section>

        {isGameOver && (
          <button className="new-game" onClick={startNewGame}>
            New Game
          </button>
        )}
      </main>
    </>
  );
};

export default Header;
