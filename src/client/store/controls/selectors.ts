import { createSelector } from '../../utils';
import { State } from '../state';

export const getControls = (state: State) => state.controls;

export const getShowFilters = createSelector(
  getControls,
  controls => !!controls.showFilters
);
