import {directionMap} from './input-map';

export const parseNotation = (notation: string): string[] => {
  return notation.split(',').reduce((acc, curr) => {
    if (curr.includes('~')) {
      acc.push(...parseImmediateInputs(curr));
    } else if (curr.includes('_')) {
      acc.push(...parseOrInputs(curr));
    } else {
      acc.push(...parseDirectionAttackInput(curr));
    }

    return acc;
  }, [] as string[]);
};

// expected output = [ '[', '2', 'f', '1+2', 'or', 'b', '1+2', ']' ]
const parseImmediateInputs = (input: string): string[] => {
  // 2 ~ f+1+2_b+1+2
  // [2, f+1+2_b+1+2]
  const immediateParts = input.split('~');
  const result = immediateParts.reduce((acc, curr) => {
    if (!curr.includes('_')) {
      acc.push(...parseDirectionAttackInput(curr));
    } else {
      acc.push(...parseOrInputs(curr));
    }
    return acc;
  }, [] as string[]);

  result.unshift('[');
  result.push(']');
  return result;
};

const parseOrInputs = (input: string): string[] => {
  // f+1+2_b+1+2 => [f+1+2,or,b+1+2]
  return input.replace('_', ',or,')
    .split(',')
    .reduce((acc, curr) => {
      acc.push(...parseDirectionAttackInput(curr));
      return acc;
    }, [] as string[]);
};

const parseDirectionAttackInput = (input: string): string[] => {
  // f+2
  // 1+2
  const firstPlusIndex = input.indexOf('+');
  if (firstPlusIndex > 0 && directionMap[input[firstPlusIndex - 1]] !== undefined) {
    // direction + attack (u/f+3+4, b+1+2)
    return [input.substr(0, firstPlusIndex), input.substr(firstPlusIndex + 1)];
  }
  // only attacks (1+2, 1+3, ...)
  return [input];
};










/*export const parseNotationInput = (notation: string): string[] => {
  return notation
    .split(',')
    // trim and parse simultaneous inputs
    .reduce((acc, part) => {
      if (part.length === 0) {
        return acc;
      }
      const trimmedPart = part.trim();
      acc.push(...parseSimultaneousInputs(trimmedPart));
      return acc;
    }, [] as string[])
    // parse immediate after inputs
    .reduce((acc, part) => {
      acc.push(...parseImmediateAfterInputs(part));
      return acc;
    }, [] as string[])
    // parse or inputs e.g. 1_2 becoming ["1", "or", "2"]
    .reduce((acc, part) => {
      acc.push(...parseOrInputs(part));
      return acc;
    }, [] as string[]);


  // deal with immediately after inputs 3~4 becoming an array with elements: [ , 3 , 4 , ]
};

const parseSimultaneousInputs = (input: string): string[] => {
  // plus symbol preceded by non-digit symbol
  const result = input.split(/(\D+)+\+/g);

  // get rid of the empty ""
  if (result.length > 1) {
    result.shift();
  }
  return result;
};

const parseImmediateAfterInputs = (input: string): string[] => {
  if (!input.includes('~')) {
    return [input];
  }
  const result = input.split('~');
  result.unshift('[');
  result.push(']');
  return result;
};

const parseOrInputs = (input: string): string[] => {
  if (!input.includes('_')) {
    return [input];
  }

  const result = input.replace(/_/g, ',or,');
  return result.split(',');
};*/
