import express from 'express';
import diagnosesService from '../services/diagnosesService.ts';
const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getPatients());
});

router.post('/', (_req, res) => {
  res.send('add a new patient');
});

export default router;