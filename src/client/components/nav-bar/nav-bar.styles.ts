import { media, style } from 'typestyle';
import { MOBILE_WIDTH } from '../constants';

export const navBarClass = style(
  {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottom: '1px solid #000000'
  },
  media(
    { maxWidth: MOBILE_WIDTH },
    {
      flexDirection: 'column',
      alignItems: 'center'
    }
  )
);

export const tabClass = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  flexGrow: 1
});

export const titleTextClass = style(
  {
    fontWeight: 300,
    margin: 0
  },
  media(
    { maxWidth: MOBILE_WIDTH },
    {
      marginBottom: 10
    }
  )
);

export const linkClass = style({
  color: '#000000',
  textDecoration: 'none',
  $nest: {
    '&:hover': {
      textDecoration: 'underline'
    },
    '&:visited': {
      color: 'inherit'
    }
  }
});

export const updatedTextClass = style(
  {
    marginLeft: 10,
    fontSize: '0.7em'
  },
  media(
    { maxWidth: MOBILE_WIDTH },
    {
      display: 'none'
    }
  )
);
