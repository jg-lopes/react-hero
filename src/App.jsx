import "./App.css";
import React, { useState, useEffect, useRef } from "react";

function Fret({ active, button = false, playGreen, color }) {
  const buttonColor = active ? color : "gray";

  const buttonStyle = { backgroundColor: buttonColor };

  return (
    <tr>
      <td style={buttonStyle}>
        {button && '==================='}
      </td>
    </tr>
  );
}

function Fretboard({ color }) {
  const [frets, setFrets] = useState(Array(10).fill(false));
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  const buttonPos = frets.length - 2;

  function nextFrame() {
    setFrets((prevData) => {
      const newFrets = [Math.random() < 0.3, ...prevData.slice(0, -1)];

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
      <p>Score: {score}</p>
      <p>Max Score: {maxScore}</p>
      {/* <p>Shifting State List: {frets.map(item => item ? 'T ' : 'F ').join('')}</p> */}
    </div>
  );
}

export default function App() {
  return (
    <main>
      <p>Tap anywhere to play the frets!</p>

      <div class='game'>
        <Fretboard color="green" />
        <Fretboard color="red" />
        {/* <Screen color="yellow" /> */}
        {/* <Screen color="blue" />
        <Screen color="orange" /> */}
      </div>
    </main>
  );
}
