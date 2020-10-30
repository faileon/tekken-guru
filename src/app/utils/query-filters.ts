import {HitProperty, MoveProperty, NumberRange} from '../types';
import {
  DEF_BLOCK_MAX_VAL,
  DEF_BLOCK_MIN_VAL, DEF_COUNTER_MAX_VAL, DEF_COUNTER_MIN_VAL,
  DEF_NORMAL_MAX_VAL,
  DEF_NORMAL_MIN_VAL,
  DEF_STARTUP_MAX_VAL,
  DEF_STARTUP_MIN_VAL
} from '../config/default-frames.config';


export const satisfiesRangeFilter = (range: NumberRange, property: number, lowerBound: number, upperBound: number): boolean => {
  const {to, from} = range;

  // (-inf, to>
  if (from === lowerBound && to !== upperBound) {
    return property <= to;
  }
  // <from, +inf)
  else if (from !== lowerBound && to === upperBound) {
    return property >= from;
  }
  // <from, to>
  else {
    return property >= from && property <= to;
  }
};

export const satisfiesPropertyFilter = <T>(selectedProperties: T[], properties: T | T[], atLeastOne = false): boolean => {
  if (Array.isArray(properties)) {
    if (atLeastOne) {
      // a OR b
      return selectedProperties.some(property => properties?.includes(property) ?? false);
    }
    // a AND b
    return selectedProperties.every(property => properties?.includes(property) ?? false);
  } else {
    // property is not array, check if we include
    return selectedProperties.includes(properties);
  }
};

/*export const satisfiesHitPropertyFilter = (hitProperties: HitProperty[], moveHitProperty: HitProperty): boolean => {
  return hitProperties.includes(moveHitProperty);
};

export const satisfiesMovePropertyFilter = (selectedProperties: MoveProperty[], moveProperties?: MoveProperty[]): boolean => {
  return selectedProperties.every(property => moveProperties?.includes(property) ?? false);
};*/

// tslint:disable-next-line:no-any
const getPropertyByPath = (element: any, parts: string[]): number | string | null => {
  return parts.reduce((acc, curr) => acc && acc[curr] || null, element);
};

const shouldFilter = (range: NumberRange, lowerBound: number, upperBound: number): boolean => {
  const {to, from} = range;

  return from !== lowerBound || to !== upperBound;
};

export const shouldFilterStartupFrame = (range: NumberRange): boolean => {
  return shouldFilter(range, DEF_STARTUP_MIN_VAL, DEF_STARTUP_MAX_VAL);
};

export const shouldFilterBlockFrame = (range: NumberRange): boolean => {
  return shouldFilter(range, DEF_BLOCK_MIN_VAL, DEF_BLOCK_MAX_VAL);
};

export const shouldFilterNormalFrame = (range: NumberRange): boolean => {
  return shouldFilter(range, DEF_NORMAL_MIN_VAL, DEF_NORMAL_MAX_VAL);
};

export const shouldFilterCounterFrame = (range: NumberRange): boolean => {
  return shouldFilter(range, DEF_COUNTER_MIN_VAL, DEF_COUNTER_MAX_VAL);
};

export const shouldFilterByProperties = <T>(properties: T[]): boolean => properties.length > 0;
