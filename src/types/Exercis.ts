export type ExercisStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Category = {
  id: number;
  exercises: {
    id: number;
    title: string;
    workout: Workout[];
  };
};

export type Workout = {
  id: number;
  status: ExercisStatus;
  sets: number;
  title: string;
};

export type Column = {
  id: ExercisStatus;
  title: string;
};
