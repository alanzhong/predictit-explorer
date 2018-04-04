import { style } from 'typestyle';
import { Colors } from '../colors';

export const marketListItemClass = style({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.8em',
  border: '1px solid ' + Colors.LIGHT_GRAY,
  borderRadius: 3,
  padding: 5,
  marginBottom: 20,
  cursor: 'pointer',
  $nest: {
    '&:hover': {
      borderColor: '#000'
    }
  }
});

export const marketListItemHeaderClass = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: 5,
  paddingBottom: 0
});

export const sparkLineContainer = style({
  display: 'flex',
  flexDirection: 'column',
  padding: 5,
  paddingTop: 0
});

export const sparkLineClass = style({
  height: 100
});

export const indicatorContainerClass = style({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end'
});

export const indicatorClass = style({
  height: 20,
  width: 20,
  marginRight: 5
});

export const marketNameClass = style({
  paddingRight: 10
});

export const contractNameClass = style({
  marginTop: 5,
  fontSize: '0.8em',
  fontWeight: 'bold'
});

export const showAllContractsButtonClass = style({
  border: 'none',
  background: 'inherit',
  textDecoration: 'underline',
  cursor: 'pointer'
});

export const showAllContractsClass = style({
  textAlign: 'center',
  width: '100%',
  marginTop: 10,
  marginBottom: 10
});

export const outlineClass = style({
  $nest: {
    '&:focus': { outline: 'thin dotted' }
  }
});
