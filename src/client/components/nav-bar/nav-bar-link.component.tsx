import * as React from 'react';
import { Link } from 'redux-little-router';
import { classes } from 'typestyle';
import { RouterPaths } from '../../store';
import { activeLinkClass, linkClass } from './nav-bar-link.styles';

export interface NavBarLinkProps {
  path: RouterPaths;
  active: boolean;
}

export class NavBarLink extends React.PureComponent<NavBarLinkProps> {
  public render() {
    const { path, children, active } = this.props;
    return (
      <Link
        className={classes(linkClass, active && activeLinkClass)}
        href={path}
      >
        {children}
      </Link>
    );
  }
}
