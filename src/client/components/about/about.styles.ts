import { style } from 'typestyle';
import { Colors } from '../colors';

export const aboutClass = style({
  $nest: {
    h2: {
      fontWeight: 300
    },
    p: {
      lineHeight: '1.5em'
    }
  }
});

export const iconClass = style({
  height: 18,
  width: 18,
  fill: Colors.DARK_GRAY
});

export const appFooterClass = style({
  width: '100%',
  textAlign: 'center',
  fontSize: '0.8em',
  marginTop: 40
});
