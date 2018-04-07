import { style } from 'typestyle';
import { Colors } from '../colors';

const COLOR = Colors.DARK_GRAY;
const TRIANGLE_SIZE = 5;

export const tooltipClass = style({
  display: 'block',
  left: -9999,
  position: 'fixed',
  maxWidth: 120,
  textAlign: 'center',
  color: 'white',
  backgroundColor: COLOR,
  padding: 5,
  borderRadius: 3,
  fontSize: '0.8em',
  $nest: {
    '&:after': {
      content: "''",
      position: 'absolute',
      top: '100%',
      left: '50%',
      marginLeft: -TRIANGLE_SIZE,
      width: 0,
      height: 0,
      borderTop: `solid ${TRIANGLE_SIZE}px ${COLOR}`,
      borderLeft: `solid ${TRIANGLE_SIZE}px transparent`,
      borderRight: `solid ${TRIANGLE_SIZE}px transparent`
    }
  }
});
