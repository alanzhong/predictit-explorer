import { connect } from 'react-redux';
import {
  Dispatch,
  getFilter,
  MarketFilters,
  setFilter,
  State,
  ThunkAction
} from '../../store';
import { FilterCheckbox as FilterCheckboxComponent } from './filter-checkbox.component';

function hasFilterHelper(mask: MarketFilters, filter: number) {
  return Boolean(mask & filter);
}

function mapStateToProps(state: State, ownProps: { mask: MarketFilters }) {
  const filter = getFilter(state);
  return {
    ...ownProps,
    hasFilter(mask: MarketFilters) {
      return hasFilterHelper(mask, filter);
    }
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    setFilter(mask: MarketFilters, show: boolean) {
      dispatch(setFilter(mask, show));
    }
  };
}

export const FilterCheckbox = connect(mapStateToProps, mapDispatchToProps)(
  FilterCheckboxComponent
);
