import React, { forwardRef, useEffect, useState, memo } from "react";

const style = {
  box: {
    background: "blue",
    height: "50px",
    width: "50px",
    position: "absolute",
  },
};

const Box = forwardRef((props, ref) => {
  const [top, setTop] = useState(-50);
  const [left, setLeft] = useState(
    Math.floor(Math.random() * window.innerWidth) + 0
  );

  useEffect(() => {
    if (top > window.innerHeight) {
      setTop(-50);
    }
  }, [top]);

  useEffect(() => {
    const interval = setInterval(() => {
      moveBox();
    }, 100);
    return () => clearInterval(interval);
  });

  function moveBox() {
    setTop(top + 5);
  }

  return <div ref={ref} style={{ ...style.box, top, left }} />;
});

export default memo(Box);
