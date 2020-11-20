import React, { useRef, useEffect, createRef, useState } from "react";
import Player from "./player";
import Circle from "./circle";
import Box from "./box";
import circle from "./circle";

const style = {
  bannerBox: {
    background: "yellow",
    padding: 20,
    margin: 5,
  },
  bannerCircle: {
    background: "aliceblue",
    padding: 20,
    margin: 5,
  },
};

const boxes = Array(3)
  .fill(0)
  .map((_, i) => ({
    id: i,
    ref: createRef(),
  }));

const circles = Array(2)
  .fill(0)
  .map((_, i) => ({
    id: i,
    ref: createRef(),
  }));

function App() {
  const [circleCollided, setCircleCollided] = useState(null);
  const [boxCollided, setBoxCollided] = useState(null);

  const playerRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      detectCollision();
    }, 100);
    return () => clearInterval(interval);
  }, []);

  function detectCollision() {
    const colisionBox = boxes.find((box) => {
      if (box.ref && box.ref.current) {
        return isColiding(box.ref.current, playerRef.current);
      }
      return false;
    });

    const colisionCircle = circles.find((circle) => {
      if (circle.ref && circle.ref.current) {
        return isColiding(circle.ref.current, playerRef.current);
      }
      return false;
    });

    if (colisionCircle) {
      setCircleCollided(colisionCircle);
    } else {
      setCircleCollided(null);
    }

    if (colisionBox) {
      setBoxCollided(colisionBox);
    } else {
      setBoxCollided(null);
    }
  }

  function isColiding(elem1, elem2) {
    if (
      elem1.offsetLeft < elem2.offsetLeft + elem2.offsetWidth &&
      elem1.offsetLeft + elem1.offsetWidth > elem2.offsetLeft &&
      elem1.offsetTop < elem2.offsetTop + elem2.offsetHeight &&
      elem1.offsetTop + elem1.offsetHeight > elem2.offsetTop
    ) {
      return true;
    }
  }
  return (
    <div className="App">
      {boxCollided && (
        <div style={style.bannerBox}>
          colliding with box id: {boxCollided.id}
        </div>
      )}
      {circleCollided && (
        <div style={style.bannerCircle}>
          colliding with circle id: {circleCollided.id}
        </div>
      )}
      <Player ref={playerRef} />
      {boxes.map((b, i) => (
        <Box ref={b.ref} key={`box-${i}`} />
      ))}

      {circles.map((c, i) => (
        <Circle ref={c.ref} key={`circle-${i}`} />
      ))}
    </div>
  );
}

export default App;
