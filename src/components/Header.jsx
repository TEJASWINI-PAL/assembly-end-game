import React, { useState } from "react";
import { languages } from "./languages";

const Header = () => {

const[currentLetter,setCurrentLetter]=useState("react")
const alphabets="abcdefghijklmnopqrstuvwxyz";

  const languageElements = languages.map(lang => {
    const styles = {
      backgroundColor: lang.backgroundColor,
      color: lang.color,
    };
    return (
        <span className= "chip" 
        key={lang.name}
        style={styles}
        >{lang.name}</span>
    )
  });


  const letterElement=currentLetter.split("").map((letter,index)=>(
    <span key={index}>{letter.toUpperCase()}</span>
  ))

  const keyboardElements=alphabets.split("").map(letter=>(
    <button key={letter}>{letter.toUpperCase()}</button>
  ))

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
        <section className="game-status">
          <h2>You win !</h2>
          <p>Well done 🎉</p>
        </section>

        <section className="languages-chip">{languageElements}</section>

        <section className="word">{letterElement}</section>

        <section className="keyboard">{keyboardElements}</section>
      </main>
    </>
  );
};

export default Header;
