import * as React from 'react';
import { classes } from 'typestyle';
import { ArrowIcon, MinusIcon } from '../icon';
import { Tooltip } from '../tooltip';
import {
  contractChangeArrowClass,
  contractChangeClass,
  contractChangeNegativeClass,
  contractChangeNeutralClass,
  contractChangePercentClass,
  contractChangePositiveClass
} from './contract-change.styles';

export interface ContractChangeProps {
  change: number;
}

export class ContractChange extends React.PureComponent<ContractChangeProps> {
  render() {
    const change = Math.round(100 * this.props.change) / 100;
    const isPositive = change > 0;
    const isEqual = change === 0;

    const text = isEqual
      ? 'No change'
      : isPositive ? `Increased by ${change}%` : `Decreased by ${change}%`;

    return (
      <Tooltip text={`${text} in the past day`}>
        <div className={contractChangeClass}>
          {isEqual ? (
            <MinusIcon
              className={classes(
                contractChangeArrowClass,
                contractChangeNeutralClass
              )}
            />
          ) : (
            <ArrowIcon
              className={classes(
                contractChangeArrowClass,
                isPositive
                  ? contractChangePositiveClass
                  : contractChangeNegativeClass
              )}
            />
          )}
          <div className={contractChangePercentClass}>{change}%</div>
        </div>
      </Tooltip>
    );
  }
}
