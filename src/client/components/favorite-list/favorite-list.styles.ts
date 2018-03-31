import { style } from 'typestyle';
import { Colors } from '../colors';

export const favoriteListClass = style({
  $nest: {
    h2: {
      fontWeight: 300
    }
  }
});

export const favoriteIconClass = style({
  height: 18,
  width: 18,
  fill: Colors.LIGHT_GRAY
});
