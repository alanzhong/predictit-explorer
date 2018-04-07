import * as React from 'react';

export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?(event: React.MouseEvent<SVGElement>): void;
}

export function createIcon(children: JSX.Element) {
  return class Icon extends React.PureComponent<IconProps> {
    render() {
      const { className, onClick, style } = this.props;
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
          {children}
        </svg>
      );
    }
  };
}
