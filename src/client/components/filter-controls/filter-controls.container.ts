import { connect } from 'react-redux';
import {
  Dispatch,
  getFilter,
  getFilterCount,
  getSearchQuery,
  getShowFilters,
  setShowFilters,
  State,
  updateSearchQuery
} from '../../store';
import { FilterControls as FilterControlsComponent } from './filter-controls.component';

function mapStateToProps(state: State) {
  return {
    query: getSearchQuery(state),
    filterCount: getFilterCount(state),
    showFilters: getShowFilters(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onSearch(query: string) {
      dispatch(updateSearchQuery(query));
    },
    onToggleFilters(show: boolean) {
      dispatch(setShowFilters(show));
    }
  };
}

export const FilterControls = connect(mapStateToProps, mapDispatchToProps)(
  FilterControlsComponent
);
