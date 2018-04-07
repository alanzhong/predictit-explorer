import { style } from 'typestyle';

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
