import * as Inferno from 'inferno';

export class Container<State extends object> {
  state: State;
  setState(state: Partial<State>): void;
  subscribe(fn: Function): void;
  unsubscribe(fn: Function): void;
}

export interface ContainerType<State extends object> {
  new (): Container<State>;
}

interface SubscribeProps {
  to: ContainerType<any>[];
  children(...instances: Container<any>[]): Inferno.VNode;
}

export class Subscribe extends Inferno.Component<SubscribeProps> {}

export interface ProviderProps {
  inject?: Container<any>[];
  children: Inferno.VNode;
}

export const Provider: Inferno.SFC<ProviderProps>;
