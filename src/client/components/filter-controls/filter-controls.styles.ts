import { style } from 'typestyle';
import { Colors } from '../colors';

export const filterControlsClass = style({
  display: 'flex',
  flexDirection: 'column',
  margin: '20px 0px'
});

export const filterSearchContainerClass = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});

export const filterOptionsContainerClass = style({
  display: 'flex',
  flexDirection: 'column',
  marginTop: 20
});

export const searchInputClass = style({
  width: '100%'
});

export const showFiltersContainerClass = style({
  position: 'relative',
  marginRight: 10
});

export const clearSearchClass = style({
  position: 'absolute',
  right: 10,
  top: 10,
  width: 20,
  height: 20,
  fill: Colors.LIGHT_GRAY,
  $nest: {
    '&:hover': {
      fill: Colors.DARK_GRAY,
      cursor: 'pointer'
    }
  }
});

export const showFiltersClass = style({
  cursor: 'pointer',
  whiteSpace: 'nowrap'
});

export const inputClass = style({
  background: 'none',
  fontSize: '1em',
  borderRadius: 3,
  border: '1px solid ' + Colors.LIGHT_GRAY,
  padding: 10,
  $nest: {
    '&:hover': {
      borderColor: '#000'
    }
  }
});

export const searchInputContainerClass = style({
  position: 'relative',
  width: '100%'
});

export const outlineClass = style({
  $nest: {
    '&:focus': { outline: 'thin dotted' }
  }
});

export const filterCountClass = style({
  position: 'absolute',
  top: -5,
  right: -5,
  color: 'white',
  background: Colors.BLUE,
  borderRadius: '50%',
  width: 18,
  height: 18,
  fontSize: 12,
  lineHeight: '18px',
  fontWeight: 'bold',
  textAlign: 'center'
});

export const filterIconClass = style({
  height: 18,
  width: 18
});
