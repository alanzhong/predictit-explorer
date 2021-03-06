import * as React from 'react';
import { classes, style } from 'typestyle';
import { ChartObservation, DailySeriesResult } from '../../../types/client';
import { memoize, parseSeriesResult, toUTC } from '../../utils';
import { MOBILE_WIDTH } from '../constants';
import { Dimensions, Responsive } from '../responsive';
import { ChartSVG } from './chart-svg.component';
import { chartClass } from './chart.styles';

interface ChartProps {
  series: DailySeriesResult;
  dateExtent?: [number, number];
  className?: string;
}

interface ChartState {
  data: ChartObservation[];
  extent: [Date, Date];
}

export class Chart extends React.PureComponent<ChartProps, ChartState> {
  static getDerivedStateFromProps(newProps: ChartProps, oldState: ChartState) {
    return {
      extent: getDateExtent(oldState.data, newProps.dateExtent)
    };
  }

  constructor(props: ChartProps) {
    super(props);

    const { series, dateExtent } = this.props;
    const data = parseSeriesResult(series);
    const extent = getDateExtent(data, dateExtent);

    this.state = { data, extent };
  }

  renderChart = (dimensions: Dimensions) => {
    const { data, extent } = this.state;

    return (
      <ChartSVG
        containerWidth={dimensions.width}
        containerHeight={dimensions.height}
        data={data}
        extent={extent}
      />
    );
  };

  render() {
    const { className } = this.props;
    return (
      <Responsive className={classes(chartClass, className)}>
        {this.renderChart}
      </Responsive>
    );
  }
}

const getDateExtentForObservations = memoize((data: ChartObservation[]) => {
  let min = Infinity;
  let max = -Infinity;
  for (const { date } of data) {
    const time = date.getTime();
    if (min > time) {
      min = time;
    }
    if (max < time) {
      max = time;
    }
  }

  return [toUTC(min), toUTC(max)] as [Date, Date];
});

function getDateExtent(
  data: ChartObservation[],
  dateExtent?: [number, number]
): [Date, Date] {
  if (dateExtent) {
    const [min, max] = dateExtent;
    return [toUTC(min), toUTC(max)];
  }
  return getDateExtentForObservations(data);
}
