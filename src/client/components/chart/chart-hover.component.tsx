import { area, bisector, scaleLinear, scaleTime } from 'd3-virtual';
import * as React from 'react';
import { last, shallowEqual, uid } from '../../utils';
import { MOBILE_WIDTH } from '../constants';
import { Axis } from './axis.component';
import {
  circleClass,
  mouseoverLineClass,
  mouseoverTextClass,
  mouseRectClass
} from './chart-svg.styles';
import { ChartObservation } from './types';

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
  public static HIDE = -999;

  public state: ChartHoverState = {
    hoverX: ChartHover.HIDE,
    hoverY: ChartHover.HIDE,
    text: ''
  };

  public hoverRect: SVGRectElement | null = null;

  public getRectRef = (rect: SVGRectElement | null) => (this.hoverRect = rect);

  public onRectMouseOver = () => {
    const { onMouseOver } = this.props;
    onMouseOver();
  };

  public onRectMouseMove = (event: React.MouseEvent<SVGRectElement>) => {
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

  public onRectMouseOut = (event: React.MouseEvent<SVGRectElement>) => {
    const { onMouseOut } = this.props;

    this.setState(
      {
        hoverX: ChartHover.HIDE
      },
      onMouseOut
    );
  };

  public getMousePosition(event: React.MouseEvent<SVGRectElement>) {
    if (this.hoverRect) {
      const bbox = this.hoverRect.getBoundingClientRect();
      const x = event.clientX - bbox.left;
      const y = event.clientY - bbox.top;
      return { x, y };
    }
    return { x: 0, y: 0 };
  }

  public render() {
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
