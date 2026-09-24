import express,{ type Request, type Response } from 'express';
import { isNumber, isNumberArray } from './utils.ts';
import calculateBmi from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  console.log('height:', height);
  console.log('weight:', weight);

  if (!isNumber(height) || !isNumber(weight)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  };

  res.send({
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight),
  });
});

app.post('/exercises', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }

  if (!isNumber(target) || !isNumberArray(daily_exercises)) {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }

  console.log(target, daily_exercises);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = calculateExercises(target, daily_exercises);
  console.log(result);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});