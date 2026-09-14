import { isNumber } from "./utils.ts";

interface weeklyValues {
  value1: number;
  value2: number[];
}

const parseArguments2 = (args: string[]): weeklyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (isNumber(args[2]) && isNumber(args[3])) {
    console.log(args)
    return {
      value1: Number(args[2]),
      value2: args.slice(3).map(Number)
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

const calculateExercises = (goal: number, weekDays: number[]) => {
  let trainingDays = 0
  let ratingDescription = ''
  let rating = 0
  let sum = 0

  console.log(weekDays)

  for (let i = 0; i < weekDays.length; i++) {
    if (weekDays[i] > 0) {
      trainingDays += 1
    }
    sum += weekDays[i]
  }

  let average = sum / weekDays.length
  let goalReached = rating >= goal
  
  if (goal <= average) {
    rating = 3
    ratingDescription = 'goal reached'
  } else if (goal / 2 <= average) {
    rating = 2
    ratingDescription = 'not too bad, but could be better'
  } else if (goal / 3 <= average) {
    rating = 1
    ratingDescription = 'poor effort, try harder'
  }

  return console.log({
    periodLength: weekDays.length,
    trainingDays: trainingDays,
    success: goalReached,
    rating: rating,
    ratingDesctiption: ratingDescription,
    target: goal,
    average: average
  })
}

try {
  const { value1, value2 } = parseArguments2(process.argv);
  calculateExercises(value1, value2);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}