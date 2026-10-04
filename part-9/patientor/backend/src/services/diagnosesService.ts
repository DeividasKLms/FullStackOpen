import diagnosesData from '../../data/diagnoses.ts';
import patientsData from '../../data/patients.ts';
import type { Diagnosis, NonSsnPatient } from '../types.ts';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesData;
};

const getPatients = (): NonSsnPatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }))
}

const addDiary = () => {
  return null;
};

export default {
  getDiagnoses,
  getPatients,
  addDiary,
}