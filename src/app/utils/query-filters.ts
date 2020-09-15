import {NumberRange} from '../types';
import {DEF_BLOCK_MAX_VAL, DEF_BLOCK_MIN_VAL, DEF_STARTUP_MAX_VAL, DEF_STARTUP_MIN_VAL} from '../config/default-frames.config';
// tslint:disable:no-any


export const filterByRange = <T extends { [key: string]: any }>(
  array: T[],
  path: keyof T | string,
  range: NumberRange,
  lowerBound: number,
  upperBound: number) => {
  // destructure the number range
  const {to, from} = range;

  // get parts from the path ("hit.onBlock" -> [hit, onBlock])
  const parts = (path as string).split('.');

  // filter array depending depending on the interval
  // (-inf, to>
  if (from === lowerBound && to !== upperBound) {
    return array.filter(element => getPropertyByPath(element, parts) <= to);
  }
  // <from, +inf)
  else if (from !== lowerBound && to === upperBound) {
    return array.filter(element => getPropertyByPath(element, parts) >= from);
  }
  // <from, to>
  else {
    return array.filter(element => {
      const property = getPropertyByPath(element, parts);
      return property >= from && property <= to;
    });
  }
};

// tslint:disable-next-line:no-any
const getPropertyByPath = (element: any, parts: string[]): number | null => {
  return parts.reduce((acc, curr) => acc && acc[curr] || null, element);
};

const shouldFilter = (range: NumberRange, lowerBound: number, upperBound: number): boolean => {
  const {to, from} = range;

  return from !== lowerBound || to !== upperBound;
};

export const shouldFilterStartup = (range: NumberRange): boolean => {
  return shouldFilter(range, DEF_STARTUP_MIN_VAL, DEF_STARTUP_MAX_VAL);
};

export const shouldFilterBlock = (range: NumberRange): boolean => {
  return shouldFilter(range, DEF_BLOCK_MIN_VAL, DEF_BLOCK_MAX_VAL);
};
