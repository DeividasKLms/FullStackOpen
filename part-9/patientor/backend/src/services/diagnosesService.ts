import diagnosesData from '../../data/diagnoses.ts';
import type { Diagnosis, DiagnosesEntry } from '../types.ts';

const diagnoses: DiagnosesEntry[] = diagnosesData as DiagnosesEntry[];

const getEntries = (): DiagnosesEntry[] => {
  return diagnoses;
};

const getNonLatinEntries = (): Diagnosis[] => {
  return diagnoses.map(({ code, name, latin }) => ({
    code,
    name,
    latin
  }));
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  addDiary,
  getNonLatinEntries
}