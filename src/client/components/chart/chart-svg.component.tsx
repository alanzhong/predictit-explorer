import * as d3 from 'd3-virtual';
import * as React from 'react';
import { classes } from 'typestyle';
import { ChartObservation } from '../../../types/client';
import { last, shallowEqual, uid, utcFormat } from '../../utils';
import { MOBILE_WIDTH } from '../constants';
import { Axis } from './axis.component';
import { ChartHover } from './chart-hover.component';
import {
  aboveClass,
  belowClass,
  centerLineClass,
  circleClass,
  defaultMargin,
  gridLineClass,
  lineGClass,
  textAnnotationClass,
  yAxisTextClass
} from './chart-svg.styles';

interface ChartSVGProps {
  data: ChartObservation[];
  extent: [Date, Date];
  containerHeight: number;
  containerWidth: number;
}

interface ChartSVGState {
  showPoint: boolean;
  id: number;
  width: number;
  height: number;
  x: d3.ScaleTime<number, number>;
  y: d3.ScaleLinear<number, number>;
  line: d3.Area<ChartObservation>;
  area: d3.Area<ChartObservation>;
}

export class ChartSVG extends React.PureComponent<
  ChartSVGProps,
  ChartSVGState
> {
  static getDerivedStateFromProps(
    nextProps: ChartSVGProps,
    prevState: ChartSVGState
  ) {
    const { containerHeight, containerWidth, extent } = nextProps;
    const { x, y } = prevState;
    const margin = defaultMargin;
    const width = containerWidth - margin.left - margin.right;
    const height = containerHeight - margin.top - margin.bottom;

    return {
      width,
      height,
      x: x.range([0, width]).domain(extent),
      y: y.range([height, 0])
    };
  }

  constructor(props: ChartSVGProps) {
    super(props);

    const margin = defaultMargin;

    const width = props.containerWidth - margin.left - margin.right;
    const height = props.containerHeight - margin.top - margin.bottom;

    const x = d3
      .scaleUtc()
      .domain(props.extent)
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height, 0]);

    const line = d3
      .area<ChartObservation>()
      .x(d => x(d.date))
      .y(d => y(d.value));

    const area = d3
      .area<ChartObservation>()
      .x(d => x(d.date))
      .y1(d => y(d.value));

    this.state = {
      showPoint: true,
      id: uid(),
      width,
      height,
      x,
      y,
      line,
      area
    };
  }

  y50 = () => {
    const { y } = this.state;
    return y(50);
  };

  horizontalLine = (v = 50) => {
    const { extent } = this.props;
    const { line } = this.state;

    return line(extent.map(dateToPoint(v)));
  };

  onMouseOver = () => {
    this.setState({ showPoint: false });
  };

  onMouseOut = () => {
    this.setState({ showPoint: true });
  };

  getNearestPoint = (xPosition: number) => {
    const { x, y } = this.state;
    const { data } = this.props;
    const xVal = x.invert(xPosition);

    const d = nearestPoint(data, xVal);

    if (!d) {
      return;
    }

    return {
      x: x(d.date),
      y: y(d.value),
      text: `${d.value}%, ${utcFormat(d.date)}`
    };
  };

  renderLastPoint() {
    const { showPoint, x, y } = this.state;
    const { data } = this.props;
    const lastPoint = last(data);

    if (!lastPoint || !showPoint) {
      return null;
    }

    const { value, date } = lastPoint;
    const xVal = x(date);
    const yVal = y(value);

    return (
      <>
        <text className={textAnnotationClass} x={xVal + 5} y={yVal + 3}>
          {Math.round(value)}%
        </text>
        <circle r={3} cx={xVal} cy={yVal} className={circleClass} />
      </>
    );
  }

  render() {
    const { id, area, line, height, width, x } = this.state;
    const { data, containerWidth, containerHeight } = this.props;
    const margin = defaultMargin;

    return (
      <svg height={containerHeight} width={containerWidth}>
        <g transform={'translate(' + margin.left + ',' + margin.top + ')'}>
          <path className={gridLineClass} d={this.horizontalLine(25)!} />
          <path className={gridLineClass} d={this.horizontalLine(75)!} />
          <path className={lineGClass} d={this.horizontalLine(100)!} />

          <clipPath id={'clip-below-' + id}>
            <path d={area.y0(height)(data)!} />
          </clipPath>
          <clipPath id={'clip-above-' + id}>
            <path d={area.y0(0)(data)!} />
          </clipPath>
          <path
            className={aboveClass}
            clipPath={`url(#clip-above-${id})`}
            d={area.y0(this.y50)(data)!}
          />
          <path
            className={belowClass}
            clipPath={`url(#clip-below-${id})`}
            d={area(data)!}
          />
          <path className={lineGClass} d={line(data)!} />

          <path className={centerLineClass} d={this.horizontalLine(50)!} />
          <text
            className={classes(textAnnotationClass, yAxisTextClass)}
            x={-5}
            y={4}
          >
            100%
          </text>
          <text
            className={classes(textAnnotationClass, yAxisTextClass)}
            x={-5}
            y={height / 2 + 4}
          >
            50%
          </text>
          <text
            className={classes(textAnnotationClass, yAxisTextClass)}
            x={-5}
            y={height + 4}
          >
            0%
          </text>
          <Axis scale={x} transform={`translate(0, ${height})`} />
          {this.renderLastPoint()}
          <ChartHover
            height={height}
            width={width}
            getPointInformation={this.getNearestPoint}
            onMouseOut={this.onMouseOut}
            onMouseOver={this.onMouseOver}
          />
        </g>
      </svg>
    );
  }
}

function dateToPoint(value: number) {
  return (date: Date) => ({ date, value });
}

function getXAxisTicks() {
  const docWidth = window.innerWidth;
  return docWidth <= MOBILE_WIDTH ? 4 : 7;
}

function getDate(d: ChartObservation) {
  return d.date;
}

const bisectDate = d3.bisector(getDate).left;

function nearestPoint(
  data: ChartObservation[],
  date: Date
): ChartObservation | void {
  const i = bisectDate(data, date, 1);
  const d0 = data[i - 1];
  const d1 = data[i];

  if (!d0) {
    return d1;
  }
  if (!d1) {
    return d0;
  }

  const d =
    Number(date) - Number(d0.date) > Number(d1.date) - Number(date) ? d1 : d0;

  return d;
}
