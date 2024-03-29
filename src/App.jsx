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
    var random_boolean = Math.random() < 0.3;
    frets.pop();
    frets.unshift(random_boolean);
    setFrets([...frets]);
  }

  function playGreen() {
    if (frets[frets.length - 1] === true) {
      frets[frets.length - 1] = false;
      setFrets([...frets]);
      setScore(() => score + 1);

      if (score >= maxScore) {
        setMaxScore(() => score + 1);
      }
    } else {
      setScore(0);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextFrame();
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <table>
        <tbody>
          {frets.map((fret, index) => (
            <Fret
              active={fret}
              button={index === frets.length - 1}
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
