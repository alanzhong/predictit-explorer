import { style } from 'typestyle';
import { Colors } from '../colors';

const dashArray = [5, 8];

export const defaultMargin = { left: 30, right: 35, bottom: 20, top: 15 };

export const lineGClass = style({
  fill: 'none',
  stroke: '#000',
  strokeWidth: 1
});

export const centerLineClass = style({
  fill: 'none',
  stroke: '#000',
  strokeWidth: 1,
  strokeDasharray: dashArray
});

export const gridLineClass = style({
  fill: 'none',
  stroke: Colors.LIGHT_GRAY,
  strokeWidth: 1,
  strokeDasharray: dashArray
});

export const belowClass = style({
  fill: Colors.GREEN,
  fillOpacity: 0.5
});

export const aboveClass = style({
  fill: Colors.RED,
  fillOpacity: 0.5
});

export const textAnnotationClass = style({
  fontSize: '0.7em'
});

export const yAxisTextClass = style({
  textAnchor: 'end'
});

export const circleClass = style({
  stroke: '#000',
  strokeWidth: 1,
  fill: '#fff'
});

export const mouseRectClass = style({
  fill: 'none',
  stroke: 'none',
  pointerEvents: 'all'
});

export const mouseoverLineClass = style({
  stroke: '#000',
  strokeWidth: 1
});

export const mouseoverTextClass = style({
  fontSize: '0.7em'
});
