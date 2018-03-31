import * as React from 'react';
import { MarketFilters } from '../../store';
import { checkboxClass, filterOptionClass } from './filter-checkbox.styles';

interface FilterCheckboxProps {
  mask: MarketFilters;
  hasFilter(mask: MarketFilters): boolean;
  setFilter(mask: MarketFilters, show: boolean): void;
}

export class FilterCheckbox extends React.PureComponent<FilterCheckboxProps> {
  public onChange = () => {
    const { setFilter, hasFilter, mask } = this.props;
    setFilter(mask, !hasFilter(mask));
  };

  public render() {
    const { hasFilter, mask, children } = this.props;
    return (
      <div className={filterOptionClass}>
        <input
          type="checkbox"
          checked={hasFilter(mask)}
          className={checkboxClass}
          onChange={this.onChange}
        />
        {children}
      </div>
    );
  }
}
