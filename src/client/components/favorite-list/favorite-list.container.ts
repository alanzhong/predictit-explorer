import { connect } from 'react-redux';
import { getFavorites, getMarketById, State } from '../../store';
import { FavoriteList as FavoriteListComponent } from './favorite-list.component';

function mapStateToProps(state: State) {
  return {
    markets: getFavorites(state).map(id => getMarketById(state, id))
  };
}

export const FavoriteList = connect(mapStateToProps)(FavoriteListComponent);
