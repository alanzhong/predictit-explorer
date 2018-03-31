import { shallowEqual } from '../utils';
import { State } from './state';

const HAS_LOCAL_STORAGE = 'localStorage' in window;
const LOCAL_STORAGE_STATE_KEY = '___predictit_explorer___';

interface LocalStorageState {
  favorites?: State['markets']['favorites'];
}

export function createLocalStorageSubscriber() {
  let lagState: LocalStorageState | undefined;

  return (state?: State) => {
    if (!HAS_LOCAL_STORAGE || !state) {
      return;
    }

    const localStorageState: LocalStorageState = {
      favorites: state.markets.favorites
    };

    if (!shallowEqual(localStorageState, lagState)) {
      lagState = localStorageState;
      localStorage.setItem(
        LOCAL_STORAGE_STATE_KEY,
        JSON.stringify(localStorageState)
      );
    }
  };
}

export function getStateFromLocalStorage() {
  if (!HAS_LOCAL_STORAGE) {
    return {};
  }
  const value = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
  if (!value) {
    return {};
  }
  return JSON.parse(value) as LocalStorageState;
}
