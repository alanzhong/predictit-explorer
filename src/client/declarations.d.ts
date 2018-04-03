declare module 'rollup-plugin-node-resolve';
declare module 'rollup-plugin-serve';
declare module 'rollup-plugin-livereload';
declare module 'rollup-plugin-typescript2';
declare module 'rollup-plugin-commonjs';
declare module 'rollup-plugin-uglify';
declare module 'rollup-plugin-replace';
declare module 'rollup-plugin-virtual';
declare module 'rollup-plugin-visualizer';

declare module 'd3-virtual' {
  export { area, Area } from 'd3-shape';
  export { bisector, histogram, HistogramGenerator, Bin } from 'd3-array';
  export { scaleLinear, scaleUtc, ScaleLinear, ScaleTime } from 'd3-scale';
}

declare module 'fuse-virtual' {
  import * as FuseModule from 'fuse.js';

  export interface TextMatch {
    arrayIndex: number;
    indices: [number, number][];
    key: string;
    value: string;
  }

  class Fuse {
    constructor(list: any[], options?: FuseModule.FuseOptions);
    search<T>(pattern: string): T[];
    search(pattern: string): any[];
  }
  export default Fuse;
}

/**
 * copy pasted from https://github.com/FormidableLabs/redux-little-router/blob/a417dbe4033ab0448af1865b196b9472b501658b/index.d.ts
 */
declare module 'redux-little-router' {
  // Type definitions for redux-little-router 15.0.0
  // Project: https://github.com/FormidableLabs/redux-little-router
  // Definitions by: priecint <https://github.com/priecint>
  //                 parkerziegler <https://github.com/parkerziegler>
  // TypeScript version: 2.4

  import * as React from 'react';
  import { Action, Reducer, Middleware, StoreEnhancer } from 'redux';

  export type Query = { [key: string]: string };
  export type Params = { [key: string]: string };

  /* check out https://basarat.gitbooks.io/typescript/docs/types/index-signatures.html to read more
about what is happening here. */
  export interface Routes {
    [key: string]: {
      [key: string]: any;
    };
  }

  export type LocationOptions = {
    persistQuery?: boolean;
    updateRoutes?: boolean;
  };

  export interface HistoryLocation {
    hash?: string;
    key?: string;
    pathname: string;
    search?: string;
    state?: {};
  }

  export interface Location extends HistoryLocation {
    basename?: string;
    options?: LocationOptions;
    params?: Params;
    previous?: Location;
    query?: Query;
    queue?: Array<Location>;
    result?: {};
    routes?: Routes;
    route?: string;
  }

  export interface State {
    router: Location;
  }

  export type Href = string | Location;

  export const LOCATION_CHANGED = 'ROUTER_LOCATION_CHANGED';
  export const PUSH = 'ROUTER_PUSH';
  export const REPLACE = 'ROUTER_REPLACE';
  export const GO = 'ROUTER_GO';
  export const GO_BACK = 'ROUTER_GO_BACK';
  export const GO_FORWARD = 'ROUTER_GO_FORWARD';
  export const POP = 'ROUTER_POP';
  export const BLOCK = 'ROUTER_BLOCK';
  export const UNBLOCK = 'ROUTER_UNBLOCK';
  export const REPLACE_ROUTES = 'ROUTER_REPLACE_ROUTES';
  export const DID_REPLACE_ROUTES = 'ROUTER_DID_REPLACE_ROUTES';

  export type LocationChangedAction = {
    type: typeof LOCATION_CHANGED;
    payload: Location;
  };
  export type PushAction = {
    type: typeof PUSH;
    payload: Location;
  };
  export type ReplaceAction = {
    type: typeof REPLACE;
    payload: Location;
  };
  export type GoAction = {
    type: typeof GO;
    payload: number;
  };
  export type GoBackAction = {
    type: typeof GO_BACK;
  };
  export type GoForwardAction = {
    type: typeof GO_FORWARD;
  };
  export type BlockAction = {
    type: typeof BLOCK;
    payload: BlockCallback;
  };
  export type UnblockAction = {
    type: typeof UNBLOCK;
  };
  export type ReplaceRoutesAction = {
    type: typeof REPLACE_ROUTES;
    payload: {
      routes: Routes;
      options: {
        updateRoutes: boolean;
      };
    };
  };

  export type RouterActions =
    | LocationChangedAction
    | PushAction
    | ReplaceAction
    | GoAction
    | GoBackAction
    | GoForwardAction
    | BlockAction
    | UnblockAction
    | ReplaceRoutesAction;

  export function initializeCurrentLocation(
    location: Location
  ): LocationChangedAction;

  export function push(href: Href, options?: LocationOptions): PushAction;
  export function replace(href: Href, options?: LocationOptions): ReplaceAction;
  export function go(index: number): GoAction;
  export function goBack(): GoBackAction;
  export function goForward(): GoForwardAction;
  export function block(historyShouldBlock: BlockCallback): BlockAction;
  export function unblock(): UnblockAction;
  export function replaceRoutes(routes: Routes): ReplaceRoutesAction;

  type ListenCallback = (location: Location, action?: Action) => void;
  type BlockCallback = (location: Location, action?: Action) => string;
  type Unsubscribe = () => void;

  export interface History {
    length: number;
    location: Location;
    action: Action;
    listen(callback: ListenCallback): Unsubscribe;
    push(path: string, state?: {}): void;
    push(location: Location): void;
    replace(path: string, state?: {}): void;
    replace(location: Location): void;
    go(n: number): void;
    goBack(): void;
    goForward(): void;
    block(message: string): void;
    block(callback: BlockCallback): Unsubscribe;
  }

  export interface Router {
    reducer: Reducer<Location>;
    middleware: Middleware;
    enhancer: StoreEnhancer<Location>;
  }

  export interface BrowserRouterArgs {
    routes: Routes;
    basename?: string;
    history?: History;
  }

  export interface HashRouterArgs {
    routes: Routes;
    basename?: string;
    hashType?: string;
    history?: History;
  }

  export interface ExpressRouterArgs {
    routes: Routes;
    request: {
      path: string;
      baseUrl: string;
      url: string;
      query: {
        [key: string]: string;
      };
      passRouterStateToReducer?: boolean;
    };
  }

  export interface HapiRouterArgs {
    routes: Routes;
    request: {
      path: string;
      url: string;
      query: {
        [key: string]: string;
      };
    };
  }

  export function routerForBrowser(options: BrowserRouterArgs): Router;
  export function routerForExpress(options: ExpressRouterArgs): Router;
  export function routerForHapi(options: HapiRouterArgs): Router;
  export function routerForHash(options: HashRouterArgs): Router;
  export function immutableRouterForBrowser(options: BrowserRouterArgs): Router;
  export function immutableRouterForExpress(options: ExpressRouterArgs): Router;
  export function immutableRouterForHapi(options: HapiRouterArgs): Router;
  export function immutableRouterForHash(options: HashRouterArgs): Router;

  export interface LinkProps {
    className?: string;
    href: Href;
    persistQuery?: boolean;
    replaceState?: boolean;
    target?: string;
    onClick?: (event: Event) => any;
    style?: {};
    location?: Location;
    push?: (
      href: Href,
      options: LocationOptions
    ) => {
      type: string;
      payload: Location;
    };
    replace?: (
      href: Href,
      options: LocationOptions
    ) => {
      type: string;
      payload: Location;
    };
    activeProps?: {};
  }

  export class Link extends React.Component<LinkProps, {}> {}
  export class ImmutableLink extends React.Component<LinkProps, {}> {}

  export class PersistentQueryLink extends React.Component<LinkProps, {}> {}
  export class ImmutablePersistentQueryLink extends React.Component<
    LinkProps,
    {}
  > {}

  export interface FragmentProps {
    location?: Location;
    matchRoute?: Function;
    matchWildcardRoute?: Function;
    forRoute?: string;
    parentRoute?: string;
    withConditions?: (location: Location) => boolean;
    forNoMatch?: boolean;
    parentId?: string;
    style?: {};
  }

  export class Fragment extends React.Component<FragmentProps, {}> {}
  export class ImmutableFragment extends React.Component<FragmentProps, {}> {}
}
