import { isNumber } from './utils.ts';

interface bmiValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): bmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNumber(args[2]) && isNumber(args[3])) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number) => {
  const result = weight / ((height / 100) ** 2);
  
  if (weight === 0 || height === 0) {
    return 'This cannot be done';
  } else if (result < 18.5) {
    return 'Underweight';
  } else if (result < 24.9) {
    return 'Normal weight';
  } else if (result < 29.9) {
    return 'Overweight';
  } else {
    return 'Obese';
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  calculateBmi(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;