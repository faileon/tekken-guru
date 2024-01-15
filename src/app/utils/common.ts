// tslint:disable-next-line:no-any
import {ContentOrder} from '../types';

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: any;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};

export const getDebouncedFilterRange = debounce(() => {
}, 175);

export const getToggledProperties = <T>(properties: T[], property: T, multiple = false): T[] => {
  const hasProperty = properties.includes(property);
  let res: T[];
  if (hasProperty) {
    // checkbox-like
    if (multiple) {
      res = properties.filter(p => p !== property);
    } else {
      res = [];
    }
  } else {
    // checkbox-like
    if (multiple) {
      res = [...properties, property];
    } else {
      res = [property];
    }
  }
  return res;
};


export const getRandomNumber = (lower: number, upper: number) => Math.floor(Math.random() * upper) + lower;
// tslint:disable-next-line:no-any
/*export const flatten = (arr: any[]): string => {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
};*/

/**
 * Compares if both arrays are truthfully equal (e.g. [true, true] === [true, true] would result in true)
 * @param a1 boolean array of size N
 * @param a2 boolean array of size N
 * @return boolean result if arrays
 */
export const compareBoolArrays = (a1: boolean[], a2: boolean[]): boolean => {
  // assumes a1 and a2 are equal length
  for (let i = 0; i < a1.length; i++) {
    if (a1[i] !== a2[i]) {
      return false;
    }
  }

  return true;
};

export const getValueFromLocalStorage = <T>(key: string): T => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value) as T;
  }
  return null;
};

export const isDateAfterInDays = (date1: number, date2: number, days: number) => (date1 - date2) > (days * 24 * 60 * 60 * 1000);
