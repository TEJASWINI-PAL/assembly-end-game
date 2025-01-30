import React, { useState } from "react";
import { languages } from "./languages";
import clsx from "clsx";

const Header = () => {
  // state values
  const [currentLetter, setCurrentLetter] = useState("react");
  const [guessLetter, setGuessLetter] = useState([]);

  // derived values
  const wrongGuessCount = guessLetter.filter(
    (letter) => !currentLetter.includes(letter)
  ).length;

  const isGameWon = currentLetter
    .split("")
    .every((letter) => guessLetter.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;

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
  const letterElement = currentLetter
    .split("")
    .map((letter, index) => (
      <span key={index}>
        {guessLetter.includes(letter) ? letter.toUpperCase() : ""}
      </span>
    ));

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
        key={letter}
        onClick={() => addLetters(letter)}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const gameStatus=clsx("game-status" , {
    won:isGameWon,
    lost:isGameLost
  })

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
        <section className={gameStatus}>
          {isGameOver ? (
            isGameWon ? (
              <>
                <h2>You win !</h2>
                <p>Well done 🎉</p>
              </>
            ) : (
              <>
                <h2>Game Over !</h2>
                <p>You lose! Better start learning Assembly😪 </p>
              </>
            )
          ) : null}
        </section>

        <section className="languages-chip">{languageElements}</section>

        <section className="word">{letterElement}</section>

        <section className="keyboard">{keyboardElements}</section>

        {isGameOver && <button className="new-game">New Game</button>}
      </main>
    </>
  );
};

export default Header;
