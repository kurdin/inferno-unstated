import { Subscribe } from '../src/unstated';
import sharedCounterContainer from './counterstore';

function Counter() {
  return (
    <Subscribe to={[sharedCounterContainer]}>
      {counter => (
        <div>
          <button onClick={() => counter.decrement()}>-</button>{' '}
          <span>{counter.state.count}</span>{' '}
          <button onClick={() => sharedCounterContainer.increment()}>+</button>
        </div>
      )}
    </Subscribe>
  );
}

export default Counter;
