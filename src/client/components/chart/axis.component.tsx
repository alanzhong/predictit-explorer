import * as React from 'react';
import { classes } from 'typestyle';
import { MOBILE_WIDTH } from '../constants';
import { axisContainerClass, tickClass, tickTextClass } from './axis.styles';
import { Scale } from './types';

const tickSizeInner = 6;
const tickSizeOuter = 6;
const tickPadding = 3;
const strokeWidth = 1;

function getXAxisTicks() {
  const docWidth = window.innerWidth;
  return docWidth <= MOBILE_WIDTH ? 3 : 6;
}

function formatTick<Input>(
  value: Input,
  defaultFormat: (value: Input) => string
) {
  if (value instanceof Date) {
    return value.toLocaleDateString();
  }
  return defaultFormat(value);
}

interface AxisProps<Range, Output, Input> {
  scale: Scale<Range, Output, Input>;
  className?: string;
  transform?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 *
 * d3 based axis using react for dom
 *
 * Ideas borrowed from: https://github.com/shauns/react-d3-axis/blob/d6d38f07cdbd7bf3bf0ef22e5cfa024860450ad4/src/Axis.js#L39
 *
 */
export class Axis<Range, Output, Input> extends React.Component<
  AxisProps<Range, Output, Input>
> {
  render() {
    const { scale, className, position = 'bottom', transform } = this.props;

    const values = scale.ticks(getXAxisTicks());
    const range = scale.range();
    const defaultFormat = scale.tickFormat();

    const isRight = position === 'right';
    const isLeft = position === 'left';
    const isTop = position === 'top';
    const isBottom = position === 'bottom';

    const isHorizontal = isRight || isLeft;

    const k = isHorizontal ? -1 : 1;
    const x = isHorizontal ? 'x' : 'y';
    const y = isHorizontal ? 'y' : 'x';

    const halfWidth = strokeWidth / 2;
    const range0 = Number(range[0]) + halfWidth;
    const range1 = Number(range[range.length - 1]) + halfWidth;

    const spacing = tickSizeInner + tickPadding;

    const lineProps = {
      [`${x}2`]: k * tickSizeInner,
      [`${y}1`]: halfWidth,
      [`${y}2`]: halfWidth
    };

    return (
      <g
        className={classes(axisContainerClass, className)}
        transform={transform}
        textAnchor={isRight ? 'start' : isLeft ? 'end' : 'middle'}
      >
        <path
          d={
            isHorizontal
              ? `M${k * tickSizeOuter},${range0}H${halfWidth}V${range1}H${k *
                  tickSizeOuter}`
              : `M${range0},${k * tickSizeOuter}V${halfWidth}H${range1}V${k *
                  tickSizeOuter}`
          }
        />
        {values.map(tickValue => {
          const coordinate = scale(tickValue);

          const translate = isHorizontal
            ? `translate(0,${coordinate})`
            : `translate(${coordinate},0)`;

          const textProps = {
            [x]: k * spacing,
            [y]: halfWidth
          };

          return (
            <g
              key={tickValue.toString()}
              transform={translate}
              className={tickClass}
            >
              <line {...lineProps} />
              <text
                dy={isTop ? '0em' : isBottom ? '0.71em' : '0.32em'}
                className={tickTextClass}
                {...textProps}
              >
                {formatTick(tickValue, defaultFormat)}
              </text>
            </g>
          );
        })}
      </g>
    );
  }
}
