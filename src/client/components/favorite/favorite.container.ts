import { connect } from 'react-redux';
import {
  addFavoriteMarket,
  Dispatch,
  isFavorite,
  removeFavoriteMarket,
  State
} from '../../store';
import { Favorite as FavoriteComponent } from './favorite.component';

interface FavoriteOwnProps {
  id: number;
}

function mapStateToProps(state: State, ownProps: FavoriteOwnProps) {
  const { id } = ownProps;
  return {
    id,
    isFavorite: isFavorite(state, id)
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addFavorite(id: number) {
      dispatch(addFavoriteMarket(id));
    },
    removeFavorite(id: number) {
      dispatch(removeFavoriteMarket(id));
    }
  };
}

export const Favorite = connect(mapStateToProps, mapDispatchToProps)(
  FavoriteComponent
);
