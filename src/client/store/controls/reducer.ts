import { ActionType } from '../action-types';
import { Action } from '../actions';
import { ControlState } from './state';

export function controls(
  state: ControlState = {},
  action: Action
): ControlState {
  switch (action.type) {
    case ActionType.SET_SHOW_FILTERS: {
      return {
        ...state,
        showFilters: action.payload.show
      };
    }

    default: {
      return state;
    }
  }
}
