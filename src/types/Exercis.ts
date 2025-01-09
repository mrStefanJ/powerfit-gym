export type ExercisStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Category = {
  id: number;
  exercises: {
    id: number;
    title: string;
    workout: Exercise[];
  };
};

export type Exercise = {
  id: number;
  status: ExercisStatus;
  title: string;
};

export type Column = {
  id: ExercisStatus;
  title: string;
};
