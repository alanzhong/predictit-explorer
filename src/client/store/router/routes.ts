export const enum RouterPaths {
  HOME = '/',
  ABOUT = '/about',
  FAVORITES = '/favorites',
  MARKET = '/market/:marketId'
}

/**
 * route structure of app
 */
export const routes = {
  [RouterPaths.HOME]: {
    title: 'Home',
    [RouterPaths.MARKET]: {
      title: 'Market'
    },
    [RouterPaths.ABOUT]: {
      title: 'About'
    },
    [RouterPaths.FAVORITES]: {
      title: 'Favorites'
    }
  }
};
