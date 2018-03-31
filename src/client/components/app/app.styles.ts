import { media, style } from 'typestyle';
import { MOBILE_WIDTH } from '../constants';

export const appClass = style(
  {
    maxWidth: 900,
    width: 'calc(100% - 60px)',
    margin: '0px auto',
    marginBottom: '50px',
    padding: '50px 30px',
    display: 'flex',
    flexDirection: 'column'
  },
  media(
    { maxWidth: MOBILE_WIDTH },
    {
      width: 'calc(100% - 20px)',
      paddingLeft: 10,
      paddingRight: 10
    }
  )
);
