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
