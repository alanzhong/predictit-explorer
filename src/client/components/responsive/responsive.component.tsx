import * as React from 'react';
import { debounce, memoize, uid } from '../../utils';

export interface Dimensions {
  width: number;
  height: number;
}

interface ResponsiveProps {
  children: (dimensions: Dimensions) => JSX.Element;
  className?: string;
}

interface ResponsiveState {
  dimensions?: Dimensions;
}

export class Responsive extends React.Component<
  ResponsiveProps,
  ResponsiveState
> {
  public state: ResponsiveState = {};

  public resize = debounce(() => this.getDimensions(), 100);

  public container: HTMLDivElement | null = null;

  public getContainerRef = (el: HTMLDivElement | null) => (this.container = el);

  public getDimensions() {
    const { dimensions } = this.state;

    if (this.container) {
      const { clientWidth, clientHeight } = this.container;
      const { width = 0, height = 0 } = dimensions || {};

      if (!dimensions || width !== clientWidth || height !== clientHeight) {
        this.setState({
          dimensions: { width: clientWidth, height: clientHeight }
        });
      }
    }
  }

  public componentDidMount() {
    this.getDimensions();
    window.addEventListener('resize', this.resize);
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  public render() {
    const { children, className } = this.props;
    const { dimensions } = this.state;
    return (
      <div ref={this.getContainerRef} className={className}>
        {dimensions ? children(dimensions) : null}
      </div>
    );
  }
}
