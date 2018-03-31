import { ActionType } from '../action-types';

export type ControlsAction = SetShowFilters;

interface SetShowFilters {
  type: ActionType.SET_SHOW_FILTERS;
  payload: {
    show: boolean;
  };
}

export const setShowFilters = (show: boolean): SetShowFilters => {
  return {
    type: ActionType.SET_SHOW_FILTERS,
    payload: { show }
  };
};
