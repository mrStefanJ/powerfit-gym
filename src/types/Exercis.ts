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
  title: string;
};

export type Column = {
  id: ExercisStatus;
  title: string;
};


export type newTypeWorkout = {
  id: string;
  bodyPart: string;
  createAt: string;
  exercises: newTypeExercises;
}

export type newTypeExercises = {
  id: string;
  name: string;
  status: ExercisStatus;
}