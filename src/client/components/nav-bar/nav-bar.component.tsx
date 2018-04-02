import * as React from 'react';
import { RouterPaths } from '../../store';
import { NavBarLink } from './nav-bar-link.container';
import {
  navBarClass,
  tabClass,
  titleTextClass,
  updatedTextClass
} from './nav-bar.styles';

interface NavBarProps {
  updatedAt?: Date;
  favoritesCount?: number;
}

export class NavBar extends React.PureComponent<NavBarProps> {
  render() {
    const { updatedAt, favoritesCount } = this.props;
    return (
      <div className={navBarClass}>
        <h1 className={titleTextClass}>PredictIt Explorer</h1>
        {updatedAt && (
          <div className={updatedTextClass}>
            updated: {updatedAt.toLocaleString()}
          </div>
        )}
        <div className={tabClass}>
          <NavBarLink path={RouterPaths.HOME}>browse</NavBarLink>
          {!!favoritesCount && (
            <NavBarLink path={RouterPaths.FAVORITES}>
              favorites ({favoritesCount})
            </NavBarLink>
          )}
          <NavBarLink path={RouterPaths.ABOUT}>about</NavBarLink>
        </div>
      </div>
    );
  }
}
