import { connect } from 'react-redux';
import {
  getFavoritesCount,
  getLoading,
  getRouter,
  getUpdatedAt,
  State
} from '../../store';
import { App as AppComponent } from './app.component';

function mapStateToProps(state: State) {
  return {
    loading: getLoading(state),
    updatedAt: getUpdatedAt(state),
    favoritesCount: getFavoritesCount(state),
    location: getRouter(state)
  };
}

export const App = connect(mapStateToProps)(AppComponent);
