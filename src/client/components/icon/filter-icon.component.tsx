import * as React from 'react';
import { IconMonstrProps } from './icon.types';

export class FilterIcon extends React.PureComponent<IconMonstrProps> {
  public render() {
    const { className, style } = this.props;
    return (
      <svg
        xmlns="https://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={className}
        style={style}
      >
        <path d="M1 0l9 15.094v5.906l4 3v-8.906l9-15.094h-22zm18.479 2l-2.981 5h-8.996l-2.981-5h14.958z" />
      </svg>
    );
  }
}
