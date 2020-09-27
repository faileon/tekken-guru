// tslint:disable-next-line:no-any
import {HitProperty} from '../types';

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: number;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};

export const getDebouncedFilterRange = debounce(() => {
}, 500);

export const getToggleProperties = <T>(properties: T[], property: T): T[] => {
  const hasProperty = properties.includes(property);
  let res: T[];
  if (hasProperty) {
    // checkbox-like
    // res = this.hitProperties.filter(p => p !== property);

    // radio-like
    res = [];
  } else {
    // checkbox-like
    // res = [...this.hitProperties, property];

    // radio-like
    res = [property];
  }
  return res;
};
