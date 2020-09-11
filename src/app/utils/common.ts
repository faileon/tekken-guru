import {NumberRange} from '../types';

// tslint:disable-next-line:no-any
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

export const getDebouncedFilterRange = debounce(() => {}, 500);
