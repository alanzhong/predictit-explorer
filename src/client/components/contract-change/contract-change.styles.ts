import { style } from 'typestyle';
import { Colors } from '../colors';

export const contractChangeClass = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '0px 5px'
});

export const contractChangePositiveClass = style({
  fill: Colors.GREEN,
  transform: 'rotate(180deg)'
});

export const contractChangeNegativeClass = style({
  fill: Colors.RED
});

export const contractChangeArrowClass = style({
  height: 10,
  width: 10
});

export const contractChangeNeutralClass = style({
  fill: Colors.LIGHT_GRAY
});

export const contractChangePercentClass = style({
  marginLeft: 3
});
