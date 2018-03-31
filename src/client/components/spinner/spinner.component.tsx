import * as React from 'react';
import { loaderClass, spinnerContainerClass } from './spinner.styles';

export class Spinner extends React.Component {
  public render() {
    return (
      <div className={spinnerContainerClass}>
        <div>Loading market data...</div>
        <div className={loaderClass} />
      </div>
    );
  }
}
