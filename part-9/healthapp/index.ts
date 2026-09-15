import express from 'express';
import calculateBmi from './bmiCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get(`/bmi`, (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  res.send({
    weight: weight,
    height: height,
    bmi: calculateBmi(height, weight),
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});