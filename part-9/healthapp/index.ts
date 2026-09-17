import express,{ type Request, type Response } from 'express';
import { isNumber, isArray } from './utils.ts';
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

  if (isNumber(height) && isNumber(weight)) {
    res.send({
      weight: weight,
      height: height,
      bmi: calculateBmi(height, weight),
    });
  } else {
    throw new Error('malformed parameters');
  }
});

app.post('/exercises', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    res.status(400).send({ error: 'parameters missing' });
    return;
  }

  if (isNumber(target) && isArray(daily_exercises)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(target, daily_exercises);
    res.send({ result });
  } else {
    res.status(400).send({ error: 'malformed parameters' });
    return;
  }
  
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});