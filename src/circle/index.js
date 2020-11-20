import React, { forwardRef, useEffect, useState, memo } from "react";

const style = {
  box: {
    background: "green",
    color: "green",
    height: "50px",
    width: "50px",
    position: "absolute",
    borderRadius: "50%",
    margin: "auto",
  },
};

const Circle = forwardRef((props, ref) => {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(
    Math.floor(Math.random() * window.innerWidth) + 0
  );

  useEffect(() => {
    const interval = setInterval(() => {
      moveBox();
    }, 100);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (top > window.innerHeight) {
      setTop(-50);
    }
  }, [top]);

  function moveBox() {
    setTop(top + 5);
  }

  return <div ref={ref} style={{ ...style.box, top, left }} />;
});

export default memo(Circle);
