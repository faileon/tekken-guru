import {FilterType, HitProperty, MoveProperty, NumberRange} from '../types';
import {
  DEF_BLOCK_MAX_VAL,
  DEF_BLOCK_MIN_VAL, DEF_COUNTER_MAX_VAL, DEF_COUNTER_MIN_VAL,
  DEF_NORMAL_MAX_VAL,
  DEF_NORMAL_MIN_VAL,
  DEF_STARTUP_MAX_VAL,
  DEF_STARTUP_MIN_VAL
} from '../config/default-frames.config';


export const satisfiesRangeFilter = (range: NumberRange, property: number[], lowerBound: number, upperBound: number): boolean => {
  const {to, from} = range;

  // (-inf, to>
  if (from === lowerBound && to !== upperBound) {
    // return property <= to;
    return property.some(n => n <= to);
  }
  // <from, +inf)
  else if (from !== lowerBound && to === upperBound) {
    // return property >= from;
    return property.some(n => n >= from);
  }
  // <from, to>
  else {
    // return property >= from && property <= to;
    return property.some(n => n >= from && n <= to);
  }
};

export const satisfiesPropertyFilter = <T>(selectedProperties: T[], properties: T[], filterType?: FilterType): boolean => {
  switch (filterType) {
    case 'only':
      // if multiple selected, its ALL of each. e.g. if Low and High is selected, move that contains either all Low or all High will be filtered
      return properties.length > 0 ? selectedProperties.some(selProp => properties.every(prop => prop === selProp)) : false;
    case 'ends-with':
      return properties.length > 0 ? selectedProperties.some(selProp => properties[properties.length - 1] === selProp) : false;
    case 'starts-with':
      return properties.length > 0 ? selectedProperties.some(selProp => properties[0] === selProp) : false;
    case 'contains':
    default:
      // if multiple selected, its AND. eg if low and mid is selected, move that contains Low and Mid will be filtered
      return selectedProperties.every(selectedProperty => properties?.includes(selectedProperty) ?? false);
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
