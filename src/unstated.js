// @flow
import { Component } from 'inferno';
import createContext from 'create-inferno-context';
import PropTypes from 'prop-types';

const StateContext = createContext(null);

export class Container {
  state;
  _listeners = [];

  setState(state) {
    this.state = Object.assign({}, this.state, state);
    this._listeners.forEach(fn => fn());
  }

  subscribe(fn) {
    this._listeners.push(fn);
  }

  unsubscribe(fn) {
    this._listeners = this._listeners.filter(f => f !== fn);
  }
}

const DUMMY_STATE = {};

export class Subscribe extends Component {
  static propTypes = {
    to: PropTypes.array.isRequired,
    children: PropTypes.func.isRequired
  };

  state = {};
  instances = [];

  componentWillUnmount() {
    this._unsubscribe();
  }

  _unsubscribe() {
    this.instances.forEach(container => {
      container.unsubscribe(this.onUpdate);
    });
  }

  onUpdate = () => {
    this.setState(DUMMY_STATE);
  };

  _createInstances(map, container) {
    this._unsubscribe();

    if (map === null) {
      throw new Error(
        'You must wrap your <Subscribe> components with a <Provider>'
      );
    }

    let safeMap = map;
    let instances = containers.map(ContainerItem => {
      let instance;

      if (
        typeof ContainerItem === 'object' &&
        ContainerItem instanceof Container
      ) {
        instance = ContainerItem;
      } else {
        instance = safeMap.get(ContainerItem);

        if (!instance) {
          instance = new ContainerItem();
          safeMap.set(ContainerItem, instance);
        }
      }

      instance.unsubscribe(this.onUpdate);
      instance.subscribe(this.onUpdate);

      return instance;
    });

    this.instances = instances;
    return instances;
  }

  render() {
    return (
      <StateContext.Consumer>
        {map =>
          this.props.children.apply(
            null,
            this._createInstances(map, this.props.to)
          )
        }
      </StateContext.Consumer>
    );
  }
}

export function Provider(props) {
  return (
    <StateContext.Consumer>
      {parentMap => {
        let childMap = new Map(parentMap);

        if (props.inject) {
          props.inject.forEach(instance => {
            childMap.set(instance.constructor, instance);
          });
        }

        return (
          <StateContext.Provider value={childMap}>
            {props.children}
          </StateContext.Provider>
        );
      }}
    </StateContext.Consumer>
  );
}
