export const isNumber = (argument: unknown): boolean =>
  !isNaN(Number(argument));

export const isNumberArray = (argument: unknown): boolean =>
  Array.isArray(argument) && argument !== null &&
  argument.every((num: unknown) => isNumber(num));

export default "this is the default...";