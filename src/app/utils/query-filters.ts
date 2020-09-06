import {NumberRange} from '../types';

// tslint:disable-next-line:no-any
export const filterByRange = <T extends { [key: string]: any }>(array: T[], path: keyof T | string, range: NumberRange) => {
  return array.filter(element => {
    // destructure the range
    const {to, from} = range;

    // get parts from the path
    const parts = (path as string).split('.');

    // get the deepest nested property
    let target = element;
    while (parts.length > 1) {
      const part = parts.shift();
      target = target[part] || {};
    }

    // if we have "to" filter by both, otherwise filter by from only
    return to ?
      target[parts[0]] >= from && target[parts[0]] <= to :
      target[parts[0]] >= from;

  });
};
