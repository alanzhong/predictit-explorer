import * as React from 'react';
import { classes } from 'typestyle';
import { FavoriteIcon } from '../icon';
import { Tooltip } from '../tooltip';
import { favoriteClass, favoriteIconClass } from './favorite.styles';

export interface FavoriteProps {
  id: number;
  className?: string;

  isFavorite: boolean;
  addFavorite(id: number): void;
  removeFavorite(id: number): void;
}

export class Favorite extends React.PureComponent<FavoriteProps> {
  toggleFavorite = (event: React.MouseEvent<SVGElement>) => {
    event.stopPropagation();
    const { id, isFavorite, addFavorite, removeFavorite } = this.props;
    const method = isFavorite ? removeFavorite : addFavorite;
    method(id);
  };

  render() {
    const { isFavorite, id, className } = this.props;

    return (
      <Tooltip text={`${isFavorite ? 'Un-f' : 'F'}avorite this market`}>
        <FavoriteIcon
          onClick={this.toggleFavorite}
          className={classes(
            className,
            favoriteIconClass,
            isFavorite && favoriteClass
          )}
        />
      </Tooltip>
    );
  }
}
