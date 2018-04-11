import { Container } from '../src/unstated';

class CounterStore extends Container {
  state = { count: 0 };

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}

const sharedCounterContainer = new CounterStore();

export default sharedCounterContainer;
