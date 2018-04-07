import { ChartObservation, DailySeriesResult } from '../types/client';

const nonLetterRegex = /[^a-zA-Z0-9]+/g;
const whitespaceRegex = /\s+/g;

export function noop() {} // tslint:disable-line

export function isDefined<T>(val: T | null | undefined): val is T {
  return typeof val !== 'undefined' && val !== null;
}

export function last<T>(arr: T[]) {
  if (arr.length === 0) {
    return;
  }
  return arr[arr.length - 1];
}

export function debounce(fn: () => void, rate = 1000 / 40) {
  let timeout: NodeJS.Timer | void;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn, timeout ? rate : 0);
  };
}

let id = 0;
export function uid() {
  return id++;
}

/**
 * memoize function using weakmap
 */
export function memoize<K extends object, V>(fn: (key: K) => V) {
  const cache = new WeakMap<K, V>();
  return (key: K) => {
    const cached = cache.get(key);
    if (cached) {
      return cached;
    }

    const value = fn(key);
    cache.set(key, value);
    return value;
  };
}

export function pick<O extends object, K extends keyof O>(
  obj: O,
  keys: K | K[]
): Pick<O, K> {
  const out: any = {};
  const keyArr = Array.isArray(keys) ? keys : [keys];
  for (const key of keyArr) {
    out[key] = obj[key];
  }

  return out;
}

export function createSelector<A extends object, B, C>(
  parent: (arg: A) => B,
  child: (arg: B) => C
) {
  const selector = (arg: A) => child(parent(arg));
  return memoize(selector);
}

export function shallowEqual<T extends {}>(a?: T, b?: T) {
  if (!a && !b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }

  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}

/**
 *
 * creates a mapping of key => index of item in arr
 *
 */
export function indexHash<T, V extends { toString(): string }>(
  arr: T[],
  key: ((obj: T) => string | V)
) {
  const hash: { [key: string]: number } = {};
  const n = arr.length;

  for (let i = 0; i < n; i++) {
    const value = arr[i];
    const hashKey = key(value);
    hash[hashKey.toString()] = i;
  }

  return hash;
}

export function kebab(str: string) {
  return str
    .toLocaleLowerCase()
    .replace(nonLetterRegex, ' ')
    .trim()
    .replace(whitespaceRegex, '-');
}

export function utcFormat(d: Date | number) {
  const date = typeof d === 'number' ? new Date(d) : d;
  return date.toLocaleDateString(undefined, { timeZone: 'UTC' });
}

export function toUTC(d: Date | number) {
  return new Date((typeof d === 'number' ? new Date(d) : d).toUTCString());
}

export function flatten<T>(arr: T[][]): T[] {
  const out: T[] = [];
  for (const val of arr) {
    out.push(...val);
  }
  return out;
}

export const parseSeriesResult = memoize((data: DailySeriesResult) => {
  const out: ChartObservation[] = [];
  const { start, series } = data;

  let lag = 0;

  for (const observation of series) {
    const [value, offset] = observation;

    lag += offset;

    out.push({
      date: toUTC(start + lag),
      value: parseFloat(value)
    });
  }

  return out;
});
