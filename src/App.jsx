import "./App.css";
import React, { useState, useEffect, useRef } from "react";

// TODO
// 1. Add a common thread generation to avoid creating 2 of the same fret
// 2. Add a two/three space hit window
// 3. Add a difficulty slider

function Fret({ active, button = false, playGreen, color }) {
  const buttonColor = active ? color : "gray";

  const buttonStyle = { backgroundColor: buttonColor,     border: button ? '5px solid gold' : '1px solid' // Add border conditionally
 };

  return (
    <tr style={buttonStyle}>
      <td >
        
      </td>
    </tr>
  );
}

function Fretboard({ color, setScore, setMaxScore, score, maxScore }) {
  const [frets, setFrets] = useState(Array(10).fill(false));
  // const [score, setScore] = useState(0);
  // const [maxScore, setMaxScore] = useState(0);

  const buttonPos = frets.length - 2;

  function nextFrame() {
    setFrets((prevData) => {
      const newFrets = [Math.random() < 0.05, ...prevData.slice(0, -1)];

      if (newFrets[newFrets.length - 1] === true) {
        setScore(0);
      }

      return newFrets;
    });
  }

  function playGreen() {
    if (frets[buttonPos] === true) {
      const nextFrets = frets.map((f, i) => {
        if (i === buttonPos) {
          return false;
        } else {
          return f;
        }
      });

      setFrets(nextFrets);
      setScore(() => score + 1);

      if (score >= maxScore) {
        setMaxScore(() => score + 1);
      }
    } else {
      setScore(0);
    }
  }

  useEffect(() => {
    const intervalId = setInterval(nextFrame, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <table onClick={playGreen}>
        <tbody>
          {frets.map((fret, index) => (
            <Fret
              active={fret}
              button={index === buttonPos}
              color={color}
              playGreen={playGreen}
            />
          ))}
          {/* <tr>
            <td>
              <button onClick={nextFrame}>Move forward in time</button>
            </td>
          </tr> */}
        </tbody>
      </table>
      {/* <p>Score: {score}</p>
      <p>Max Score: {maxScore}</p> */}
      {/* <p>Shifting State List: {frets.map(item => item ? 'T ' : 'F ').join('')}</p> */}
    </div>
  );
}

function Game() {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  return (
    <div class='display'>
      <div class='results'>
        <p>Tap anywhere to play the frets!</p>
        <p>Score: {score} - Max Score: {maxScore}</p>
      </div>
      <div class='game'>
        <Fretboard color="green" setScore={setScore} setMaxScore={setMaxScore} score={score} maxScore={maxScore} />
        <Fretboard color="red" setScore={setScore} setMaxScore={setMaxScore} score={score} maxScore={maxScore} />
        <Fretboard color="yellow" setScore={setScore} setMaxScore={setMaxScore} score={score} maxScore={maxScore} />
        <Fretboard color="blue" setScore={setScore} setMaxScore={setMaxScore} score={score} maxScore={maxScore} />
        <Fretboard color="orange" setScore={setScore} setMaxScore={setMaxScore} score={score} maxScore={maxScore} />
      </div>

      <div class='results'>
        <p>Tap anywhere to play the frets!</p>
        <p>Score: {score} - Max Score: {maxScore}</p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <main>
      <div class='introtext'>
        <h1>Score Hero!</h1>
      </div>
      {/* <div class='game'>
        <Fretboard color="green" />
        <Fretboard color="red" />
        <Fretboard color="yellow" />
        <Fretboard color="blue" />
        <Fretboard color="orange" />
      </div> */}
      <Game />
    </main>
  );
}
