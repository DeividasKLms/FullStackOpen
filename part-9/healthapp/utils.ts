export const isNumber = (argument: unknown): boolean =>
  !isNaN(Number(argument));

export const isArray = (argument: unknown): boolean =>
  Array.isArray(argument) && argument !== null;

export default "this is the default...";