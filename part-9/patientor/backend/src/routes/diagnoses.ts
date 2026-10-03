import express, { type Response } from 'express';
import type { Diagnosis } from "../types.ts";
import diagnosesService from '../services/diagnosesService.ts';
const router = express.Router();

router.get('/', (_req, res: Response<Diagnosis[]>) => {
  res.send(diagnosesService.getNonLatinEntries());
});

router.post('/', (_req, res) => {
  res.send('add a new diagnosis');
});

export default router;