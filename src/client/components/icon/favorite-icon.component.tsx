import * as React from 'react';
import { IconMonstrProps } from './icon.types';

export class FavoriteIcon extends React.PureComponent<IconMonstrProps> {
  render() {
    const { style, className, onClick } = this.props;
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={className}
        style={style}
        onClick={onClick}
      >
        <path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" />
      </svg>
    );
  }
}
