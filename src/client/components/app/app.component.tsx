import * as React from 'react';
import { Location } from 'redux-little-router';
import { appClass } from './app.styles';

import { RouterPaths } from '../../store';
import { About } from '../about';
import { FavoriteList } from '../favorite-list';
import { FilterControls } from '../filter-controls';
import { MarketDetail } from '../market-detail';
import { MarketList } from '../market-list';
import { NavBar } from '../nav-bar';
import { Spinner } from '../spinner';

interface AppProps {
  loading: boolean;
  location: Location;
  favoritesCount: number;
  updatedAt: Date | undefined;
}

export class App extends React.PureComponent<AppProps> {
  renderContent() {
    const { loading, location } = this.props;

    if (loading) {
      return <Spinner />;
    }

    switch (location.route) {
      case RouterPaths.HOME: {
        return (
          <>
            <FilterControls />
            <MarketList />
          </>
        );
      }

      case RouterPaths.ABOUT: {
        return <About />;
      }

      case RouterPaths.MARKET: {
        return <MarketDetail />;
      }

      case RouterPaths.FAVORITES: {
        return <FavoriteList />;
      }
    }
  }

  render() {
    const { loading, updatedAt, favoritesCount } = this.props;

    return (
      <div className={appClass}>
        <NavBar updatedAt={updatedAt} favoritesCount={favoritesCount} />
        {this.renderContent()}
      </div>
    );
  }
}
