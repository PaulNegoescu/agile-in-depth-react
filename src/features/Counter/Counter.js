import { useReducer } from 'react';

export function Counter() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  function counterReducer(oldState, action) {
    let newState;
    switch (action.type) {
      case 'INC': {
        newState = oldState + 1;
        break;
      }
      case 'DEC': {
        newState = oldState - 1;
        break;
      }
      default: {
        newState = oldState;
      }
    }
    return newState;
  }

  return (
    <>
      <output>{count}</output>
      <div>
        <button onClick={() => dispatch({ type: 'DEC' })}>-</button>
        <button onClick={() => dispatch({ type: 'INC' })}>+</button>
      </div>
    </>
  );
}
