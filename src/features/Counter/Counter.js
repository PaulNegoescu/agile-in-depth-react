import { useReducer } from 'react';
import clsx from 'clsx';

import styles from './Counter.module.css';

export default function Counter({ step = 1 }) {
  const [count, dispatch] = useReducer(counterReducer, 0);

  function counterReducer(oldState, action) {
    let newState;
    switch (action.type) {
      case 'INC': {
        newState = oldState + action.payload.delta;
        break;
      }
      case 'DEC': {
        newState = oldState - action.payload.delta;
        break;
      }
      default: {
        newState = oldState;
      }
    }
    return newState;
  }

  function handleButtonClick(type) {
    dispatch({ type, payload: { delta: step } });
  }

  // let cName = '';
  // if (count > 0) {
  //   cName = styles.positive;
  // } else if (count < 0) {
  //   cName = styles.negative;
  // }

  return (
    <>
      <output
        className={clsx({
          [styles.positive]: count > 0,
          [styles.negative]: count < 0,
        })}
      >
        {count}
      </output>
      <div>
        <button onClick={() => handleButtonClick('DEC')}>-</button>
        <button onClick={() => handleButtonClick('INC')}>+</button>
      </div>
    </>
  );
}
