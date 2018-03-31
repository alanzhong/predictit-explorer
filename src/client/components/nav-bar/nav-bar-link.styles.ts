import { style } from 'typestyle';
import { Colors } from '../colors';

export const linkClass = style({
  color: '#000000',
  textDecoration: 'none',
  $nest: {
    '&:hover': {
      textDecoration: 'underline'
    },
    '&:visited': {
      color: 'inherit'
    },
    '&:not(:first-child)': {
      marginLeft: 10,
      borderLeft: '1px solid #000',
      paddingLeft: 10
    }
  }
});

export const activeLinkClass = style({
  textDecoration: 'underline'
});
