import { style } from 'typestyle';

export const marketDetailChartClass = style({
  height: 220
});

export const marketDetailContractClass = style({
  marginTop: 40,
  $nest: {
    h3: {
      fontWeight: 400
    }
  }
});

export const marketDetailContractInfo = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
});

export const marketDetailContractHeaderClass = style({});
