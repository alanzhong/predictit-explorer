import * as React from 'react';
import { IconMonstrProps } from './icon.types';

export class MinusIcon extends React.PureComponent<IconMonstrProps> {
  render() {
    const { className, style } = this.props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={className}
        style={style}
      >
        <path d="M0 9h24v6h-24z" />
      </svg>
    );
  }
}
