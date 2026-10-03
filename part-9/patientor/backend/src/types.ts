export type Gender = 'male' | 'female';

export type Diagnosis = Omit<DiagnosesEntry, 'latin'>;

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string
}