import { Action } from './actions';
import { ControlState } from './controls';
import { MarketsState } from './markets';
import { RouterState } from './router';

/**
 * application state stored in redux
 */
export interface State {
  markets: MarketsState;
  router: RouterState;
  controls: ControlState;
}

export type Dispatch = (action: Action | ThunkAction) => void;

export type ThunkAction = (
  dispatch: Dispatch,
  getState: () => State
) => void | Promise<void>;
