// the complexity of all this is unnecessarily high, consider rewriting this without regex, reading char by char and implement splitting rules

export const parseNotationInput = (notation: string) => {
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
};
