import React, { forwardRef, useEffect, useState } from "react";

const style = {
  player: {
    background: "red",
    height: "100px",
    width: "100px",
    position: "absolute",
  },
};

const Player = forwardRef((props, ref) => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  function handleMouseMove(e) {
    if (e) {
      // 50 -> metade do tamanho da box
      setTop(e.y - 50);
      setLeft(e.x - 50);
    }
  }

  return (
    <div ref={ref} style={{ ...style.player, top, left }}>
      i am the player
    </div>
  );
});

export default Player;
