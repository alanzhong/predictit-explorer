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
