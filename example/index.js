import { render } from 'inferno';
import { Provider } from '../src/unstated';
import CounterSimple from './simple';
import CounterShared from './shared';
import CounterShared2 from './shared2';
import AppComplex from './complex';

render(
  <Provider>
    <CounterSimple />
  </Provider>,
  window.simple
);

render(
  <Provider>
    <AppComplex />
  </Provider>,
  window.complex
);

render(
  <Provider>
    <CounterShared />
  </Provider>,
  window.shared
);

render(
  <Provider>
    <CounterShared2 />
  </Provider>,
  window.shared2
);
