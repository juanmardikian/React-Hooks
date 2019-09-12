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

// https://media.giphy.com/media/fdvhxNoDHfaZW/giphy.gif

// Review Counter Lifecycle
// Counter initialized on page load
// User taps "increase" button, handleIncrease runs
// After a brief pause, React automatically re-renders this component
// Counter is not initialized again
// counter value is increased by 1
// return some JSX that references the updated value

// Array Destructuring
// const colors = ['red', 'green'];
// colors[0] == 'red'
// const [colorOne, colorTwo] = colors;
// colorOne == 'red'
// colorTwo == 'green'

// setCounter == setState
// this.setState({
//	counter: counter + 1
// });
