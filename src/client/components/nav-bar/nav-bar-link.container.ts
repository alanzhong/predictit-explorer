import { connect } from 'react-redux';
import { getPathName, RouterPaths, State } from '../../store';
import { NavBarLink as NavBarLinkComponent } from './nav-bar-link.component';

function mapStateToProps(state: State, ownProps: { path: RouterPaths }) {
  const { path } = ownProps;
  const active = getPathName(state) === path;

  return { active, path };
}

export const NavBarLink = connect(mapStateToProps)(NavBarLinkComponent);
