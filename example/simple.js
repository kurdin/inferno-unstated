import { render } from 'inferno';
import { Provider, Subscribe, Container } from '../lib/unstated';

class CounterContainer extends Container {
  state = { count: 0 };

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}

function Counter() {
  return (
    <Subscribe to={[CounterContainer]}>
      {counter => (
        <div>
          <button onClick={() => counter.decrement()}>-</button>
          <span>{counter.state.count}</span>
          <button onClick={() => counter.increment()}>+</button>
        </div>
      )}
    </Subscribe>
  );
}

render(
  <Provider>
    <Counter />
  </Provider>,
  window.simple
);
