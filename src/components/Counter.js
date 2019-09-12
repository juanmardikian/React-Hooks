import React, { useState } from 'react';

const Counter = () => {
  const [counter, setCounter] = useState(0);

  function handleIncrease(e) {
    e.preventDefault();
    setCounter(counter + 1);
  }

  function handleDecrease(e) {
    e.preventDefault();
    setCounter(counter - 1);
  }

  return (
    <div>
      <a className="App-link" href="#" onClick={handleIncrease}>
        Increase Count
      </a>
      <br />
      <a className="App-link" href="#" onClick={handleDecrease}>
        Decrease Count
      </a>
      <p>Current Count: {counter}</p>
    </div>
  );
};

export default Counter;
