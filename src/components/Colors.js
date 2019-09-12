import React, { useState, useEffect } from 'react';

const Colors = () => {
  const [color, setColor] = useState(randomRgb());
  const [colors, setColors] = useState([]);
  const handleRandomColor = e => {
    e.preventDefault();
    setColor(randomRgb);
  };
  const handleAddColor = e => {
    e.preventDefault();
    setColors([...colors, randomRgb()]);
  };

  // useEffect runs on first render.
  useEffect(() => {
    setColors([randomRgb()]);
  }, []);

  return (
    <div>
      <a className="App-link" href="#" onClick={handleRandomColor}>
        Randomize Color
      </a>
      <div
        style={{
          padding: 25,
          height: 100,
          width: 100,
          backgroundColor: `${color}`,
          margin: 'auto'
        }}
      />
      <p>Current Color: {color}</p>

      <a className="App-link" href="#" onClick={handleAddColor}>
        Add a Color
      </a>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {colors.map(color => (
          <div
            style={{
              height: 100,
              width: 100,
              backgroundColor: `${color}`,
              margin: 'auto'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const randomRgb = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
};

export default Colors;
