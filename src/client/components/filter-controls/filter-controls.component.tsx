import * as React from 'react';
import { classes } from 'typestyle';
import { MarketFilters } from '../../store';
import { debounce, noop } from '../../utils';
import { FilterCheckbox } from '../filter-checkbox';
import { ClearIcon, FilterIcon } from '../icon';
import { Tooltip } from '../tooltip';
import {
  clearSearchClass,
  filterControlsClass,
  filterCountClass,
  filterIconClass,
  filterOptionsContainerClass,
  filterSearchContainerClass,
  inputClass,
  outlineClass,
  searchInputClass,
  searchInputContainerClass,
  showFiltersClass,
  showFiltersContainerClass
} from './filter-controls.styles';

export interface FilterControlsProps {
  query: string;
  filterCount: number;
  showFilters: boolean;

  onSearch(query: string): void;
  onToggleFilters(show: boolean): void;
}

export interface FilterControlsState {
  query: string;
}

export class FilterControls extends React.PureComponent<FilterControlsProps> {
  state: FilterControlsState = {
    query: this.props.query
  };

  updateSearch = () => {
    const { query } = this.state;
    const { onSearch = noop } = this.props;
    onSearch(query);
  };

  updateSearchDebounced = debounce(this.updateSearch, 200);

  onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;
    this.setState({ query }, this.updateSearchDebounced);
  };

  clearSearch = () => {
    const { onSearch = noop } = this.props;
    this.setState({ query: '' }, this.updateSearch);
  };

  onToggleFilters = () => {
    const { showFilters, onToggleFilters = noop } = this.props;
    onToggleFilters(!showFilters);
  };

  render() {
    const { showFilters = false, filterCount } = this.props;
    const { query } = this.state;

    return (
      <div className={filterControlsClass}>
        <div className={filterSearchContainerClass}>
          <div className={showFiltersContainerClass}>
            <Tooltip text={`${showFilters ? 'Hide' : 'Show'} search filters`}>
              <button
                onClick={this.onToggleFilters}
                className={classes(outlineClass, showFiltersClass, inputClass)}
              >
                <FilterIcon className={filterIconClass} />
              </button>
            </Tooltip>
            {filterCount ? (
              <div className={filterCountClass}>{filterCount}</div>
            ) : null}
          </div>
          <div className={searchInputContainerClass}>
            <input
              className={classes(outlineClass, searchInputClass, inputClass)}
              value={query}
              type="text"
              placeholder={`Search for markets...`}
              onChange={this.onInput}
            />
            <Tooltip text="Clear search">
              <ClearIcon
                className={clearSearchClass}
                onClick={this.clearSearch}
              />
            </Tooltip>
          </div>
        </div>
        {showFilters && (
          <div className={filterOptionsContainerClass}>
            <FilterCheckbox mask={MarketFilters.SHARE_DATES}>
              Use a common time period in all charts.
            </FilterCheckbox>
            <FilterCheckbox mask={MarketFilters.HIDE_INACTIVE}>
              Hide inactive markets in results.
            </FilterCheckbox>
            <FilterCheckbox mask={MarketFilters.HIDE_MULTI_CONTRACT}>
              Hide multi-contract markets in results.
            </FilterCheckbox>
          </div>
        )}
      </div>
    );
  }
}
