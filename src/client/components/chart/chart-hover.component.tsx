import * as React from 'react';
import { ChartObservation } from '../../../types/client';
import { last, shallowEqual, uid } from '../../utils';
import { MOBILE_WIDTH } from '../constants';
import { Axis } from './axis.component';
import {
  circleClass,
  mouseoverLineClass,
  mouseoverTextClass,
  mouseRectClass
} from './chart-svg.styles';

export interface ChartHoverProps {
  height: number;
  width: number;
  onMouseOver(): void;
  onMouseOut(): void;
  getPointInformation(
    xPosition: number
  ): { x: number; y: number; text: string } | void;
}

export interface ChartHoverState {
  hoverX: number;
  hoverY: number;
  text: string;
}

export class ChartHover extends React.PureComponent<
  ChartHoverProps,
  ChartHoverState
> {
  static HIDE = -999;

  state: ChartHoverState = {
    hoverX: ChartHover.HIDE,
    hoverY: ChartHover.HIDE,
    text: ''
  };

  hoverRect: SVGRectElement | null = null;

  getRectRef = (rect: SVGRectElement | null) => (this.hoverRect = rect);

  onRectMouseOver = () => {
    const { onMouseOver } = this.props;
    onMouseOver();
  };

  onRectMouseMove = (event: React.MouseEvent<SVGRectElement>) => {
    const { getPointInformation } = this.props;
    const pos = this.getMousePosition(event);
    const point = getPointInformation(pos.x);

    if (
      point &&
      (point.x !== this.state.hoverX || point.y !== this.state.hoverY)
    ) {
      const hoverX = point.x;
      const hoverY = point.y;
      const text = point.text;

      this.setState({
        hoverX,
        hoverY,
        text
      });
    }
  };

  onRectMouseOut = (event: React.MouseEvent<SVGRectElement>) => {
    const { onMouseOut } = this.props;

    this.setState(
      {
        hoverX: ChartHover.HIDE
      },
      onMouseOut
    );
  };

  getMousePosition(event: React.MouseEvent<SVGRectElement>) {
    if (this.hoverRect) {
      const bbox = this.hoverRect.getBoundingClientRect();
      const x = event.clientX - bbox.left;
      const y = event.clientY - bbox.top;
      return { x, y };
    }
    return { x: 0, y: 0 };
  }

  render() {
    const { hoverX, hoverY, text } = this.state;
    const { height, width } = this.props;
    const halfWay = hoverX > width / 2;

    return (
      <>
        <line
          className={mouseoverLineClass}
          y1={-10}
          y2={height}
          x1={hoverX}
          x2={hoverX}
        />
        <circle r={3} cx={hoverX} cy={hoverY} className={circleClass} />
        <text
          x={halfWay ? hoverX - 4 : hoverX + 3}
          y={-2}
          className={mouseoverTextClass}
          textAnchor={halfWay ? 'end' : 'start'}
        >
          {text}
        </text>
        <rect
          ref={this.getRectRef}
          width={width}
          height={height}
          className={mouseRectClass}
          onMouseOver={this.onRectMouseOver}
          onMouseOut={this.onRectMouseOut}
          onMouseMove={this.onRectMouseMove}
        />
      </>
    );
  }
}
