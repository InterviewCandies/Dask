export interface State {
  counter: number;
}

export const INCREMENT = "INCREMENT";

interface IncrementAction {
  type: typeof INCREMENT;
}

export type ActionTypes = IncrementAction;

export type DispatchType = (arg: ActionTypes) => ActionTypes;
