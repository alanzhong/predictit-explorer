import { style } from 'typestyle';
import { Colors } from '../colors';

export const marketDetailClass = style({
  $nest: {
    '& h2': {
      fontWeight: 300
    }
  }
});

export const marketDetailHeaderClass = style({});

export const marketDetailInfoClass = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});

export const marketDetailTableClass = style({
  borderTop: `1px solid ${Colors.DARK_GRAY}`,
  borderBottom: `1px solid ${Colors.DARK_GRAY}`,
  $nest: {
    td: {
      padding: `2px 10px`
    },
    'td:first-child': {
      textAlign: 'right'
    }
  }
});
