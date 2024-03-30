import "./App.css";
import React, { useState, useEffect } from "react";

function Fret({ active, button = false, playGreen }) {
  const class_name = active ? "active" : "inactive";

  if (button === true) {
    return (
      <tr>
        <td className={class_name}>
          <button onClick={playGreen}>Play!</button>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td className={class_name}></td>
    </tr>
  );
}

function Screen() {
  const [frets, setFrets] = useState([true, false, false, false, false]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  function nextFrame() {
    var random_boolean = Math.random() < 0.7;
    //var last_note = frets.pop();
    var last_note = frets.pop();
    if (last_note === true) {
      setScore(0);
    }

    setFrets([random_boolean, ...frets]);
  }

  function playGreen() {
    console.log(frets);
    if (frets[frets.length - 2] === true) {
      console.log(frets);
      frets[frets.length - 2] = false;
      console.log(frets);
      setFrets([...frets]);
      setScore(() => score + 1);

      if (score >= maxScore) {
        setMaxScore(() => score + 1);
      }
    } else {
      setScore(0);
    }
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     nextFrame();
  //   }, 1500);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div>
      <table>
        <tbody>
          {frets.map((fret, index) => (
            <Fret
              active={fret}
              button={index === frets.length - 2}
              playGreen={playGreen}
            />
          ))}
          <tr>
            <td>
              <button onClick={nextFrame}>Move forward in time</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p>Score: {score}</p>
      <p>Max Score: {maxScore}</p>
    </div>
  );
}

export default function App() {
  return (
    <main>
      <Screen />
    </main>
  );
}
