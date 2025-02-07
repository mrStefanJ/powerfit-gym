import { Workout } from "./Exercis";

export type User = {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  birthDate?: string;
  exercis?: UserExercise;
  image?: string;
  gender?: string;
  group?: string;
};

export type UserExercise = {
  id: number;
  title: string;
  date?: string;
  workout: Workout[];
}
