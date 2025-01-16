import { Category } from "../types/Exercis";

export const listExercis: Category[] = [
    {
      id: 111,
      exercises: {
        id: 1,
        title: "abs",
        workout: [
          { id: 101, title: "Crunch", status: "TODO" },
          { id: 102, title: "V-sit", status: "TODO" },
          { id: 103, title: "Cable crunch", status: "TODO" },
        ],
      },
    },
    {
      id: 112,
      exercises: {
        id: 2,
        title: "legs",
        workout: [
          { id: 201, title: "Split squats", status: "TODO" },
          { id: 202, title: "Walking lunges", status: "TODO" },
          { id: 203, title: "Squat", status: "TODO" },
        ],
      },
    },
    {
      id: 113,
      exercises: {
        id: 3,
        title: "lowerBack",
        workout: [
          { id: 301, title: "Knee to chest stretch", status: "TODO" },
          { id: 302, title: "Superman", status: "TODO" },
          { id: 303, title: "Plank", status: "TODO" },
        ],
      },
    },
    {
      id: 114,
      exercises: {
        id: 4,
        title: "shoulder",
        workout: [
          { id: 401, title: "Front raise", status: "TODO" },
          { id: 402, title: "Y raise", status: "TODO" },
          { id: 403, title: "Push press", status: "TODO" },
        ],
      },
    },
  ];