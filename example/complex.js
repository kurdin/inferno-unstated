import { render } from 'inferno';
import { Provider, Subscribe, Container } from '../lib/unstated';

class AppContainer extends Container {
  state = {
    amount: 1
  };

  setAmount(amount) {
    this.setState({ amount });
  }
}

class CounterContainer extends Container {
  state = {
    count: 0
  };

  increment(amount) {
    this.setState({ count: this.state.count + amount });
  }

  decrement(amount) {
    this.setState({ count: this.state.count - amount });
  }
}

function Counter() {
  return (
    <Subscribe to={[AppContainer, CounterContainer]}>
      {(app, counter) => (
        <div>
          <span>Count: {counter.state.count}</span>
          <button onClick={() => counter.decrement(app.state.amount)}>-</button>
          <button onClick={() => counter.increment(app.state.amount)}>+</button>
        </div>
      )}
    </Subscribe>
  );
}

function App() {
  return (
    <Subscribe to={[AppContainer]}>
      {app => (
        <div>
          <Counter />
          <label>Amount: </label>
          <input
            type="number"
            value={app.state.amount}
            onChange={event => {
              app.setAmount(parseInt(event.currentTarget.value, 10));
            }}
          />
        </div>
      )}
    </Subscribe>
  );
}

render(
  <Provider>
    <App />
  </Provider>,
  window.complex
);
