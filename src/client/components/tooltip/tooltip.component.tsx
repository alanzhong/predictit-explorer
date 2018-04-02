import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { shallowEqual } from '../../utils';
import { MOBILE_WIDTH } from '../constants';
import { Portal } from '../portal';
import { tooltipClass } from './tooltip.styles';

export interface TooltipProps {
  text: string;
}

export interface TooltipState {
  show?: boolean;
  position?: {
    top: number;
    left: number;
  };
}

export class Tooltip extends React.PureComponent<TooltipProps, TooltipState> {
  state: TooltipState = {};

  element?: Element;
  stringEl: Element | null = null;
  tooltipEl: HTMLDivElement | null = null;

  getStringRef = (el: Element | null) => {
    this.stringEl = el;
  };

  getTooltipRef = (el: HTMLDivElement | null) => {
    this.tooltipEl = el;
  };

  onChildMouseOver = () => {
    this.setState({ show: true, position: this.getPosition() });
  };

  onChildMouseOut = () => {
    if (this.state.show) {
      this.setState({ show: false });
    }
  };

  getElement() {
    let element: Element | undefined;
    const ref = this.refs[0];

    if (ref) {
      element = findDOMNode(ref);
    }

    if (this.stringEl) {
      element = this.stringEl;
    }

    return element;
  }

  getPosition() {
    if (this.element && this.tooltipEl) {
      const bbox = this.element.getBoundingClientRect();
      const tooltipBBox = this.tooltipEl.getBoundingClientRect();

      return {
        top: bbox.top - tooltipBBox.height - 10,
        left: bbox.left + bbox.width / 2 - tooltipBBox.width / 2
      };
    }
  }

  componentDidMount() {
    const element = (this.element = this.getElement());
    if (element) {
      document.addEventListener('scroll', this.onChildMouseOut);
      element.addEventListener('mouseover', this.onChildMouseOver);
      element.addEventListener('mouseout', this.onChildMouseOut);
    }
  }

  componentDidUpdate() {
    this.element = this.getElement();
    const position = this.getPosition();
    const oldPosition = this.state.position;

    if (position && (!oldPosition || !shallowEqual(position, oldPosition))) {
      this.setState({ position });
    }
  }

  componentWillUnmount() {
    if (this.element) {
      document.removeEventListener('scroll', this.onChildMouseOut);
      this.element.removeEventListener('mouseover', this.onChildMouseOver);
      this.element.removeEventListener('mouseout', this.onChildMouseOut);
    }
  }

  render() {
    const { children, text } = this.props;
    const { show, position } = this.state;

    // hack to disable on mobile for now...
    if (MOBILE_WIDTH > window.innerWidth) {
      return children;
    }

    return (
      <>
        {React.Children.map(this.props.children, (element, idx) => {
          if (idx > 0) {
            throw new Error(`Tooltip Elements can only have one child!`);
          }

          if (typeof element === 'string' || typeof element === 'number') {
            return <span ref={this.getStringRef}>{element}</span>;
          }

          return React.cloneElement(element, { ref: idx });
        })}
        <Portal>
          <div
            ref={this.getTooltipRef}
            className={tooltipClass}
            style={{
              ...position,
              ...(show ? {} : { left: -9999 })
            }}
          >
            {text}
          </div>
        </Portal>
      </>
    );
  }
}
