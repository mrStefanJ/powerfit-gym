import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import Column from "../componenets/Column/Column";
import { Category, Column as ColumnType, Workout } from "../types/Exercis";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../configuration";

interface AddExerciesProps {
  exercis: Category[];
  setExercis: React.Dispatch<React.SetStateAction<Category[]>>;
  selectedCategory: any;
  setSelectedCategory: any;
  selectedUser: any;
  message: string;
  toggleModalExercis: () => void;
  saveExercises: () => void;
}

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const AddExercises = ({
  exercis,
  setExercis,
  selectedUser,
  message,
  toggleModalExercis,
  saveExercises,
  selectedCategory,
  setSelectedCategory
}: AddExerciesProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedExercises, setSelectedExercises] = useState<Workout[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [hasMovedExercise, setHasMovedExercise] = useState(false);

  const handleSelectExercise = (
    e: React.ChangeEvent<HTMLInputElement>,
    workout: Workout,
    categoryTitle: string
  ) => {
    if (e.target.checked) {
      setSelectedExercises((prev) => [...prev, { ...workout, status: "TODO" }]);
      setSelectedCategory(categoryTitle); // Store selected category
    } else {
      setSelectedExercises((prev) => prev.filter((w) => w.id !== workout.id));
    }
  };

  const isExerciseSelected = (workout: Workout) =>
    selectedExercises.some((selected) => selected.id === workout.id);

  const handleNextStep = () => {
    if (selectedExercises.length > 1) {
      setCurrentStep(2);
    } else {
      alert("Please select at least one exercise to proceed.");
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
  
    const draggedItemId = active.id as string;
    const targetStatus = over.id as Workout["status"];
  
    setSelectedExercises((prev) =>
      prev.map((exercise) =>
        exercise.id.toString() === draggedItemId
          ? { ...exercise, status: targetStatus }
          : exercise
      )
    );
  
    try {
      const userRef = doc(db, "users", selectedUser as string);
      const userDoc = await getDoc(userRef);
  
      if (!userDoc.exists()) return;
  
      const currentExercises = userDoc.data()?.exercis || [];
      const updatedExercises = currentExercises.map((category: any) => {
        if (category.title === selectedCategory) {
          return {
            ...category,
            workout: category.workout.map((workout: Workout) =>
              workout.id.toString() === draggedItemId
                ? { ...workout, status: targetStatus } // Keep the sets value
                : workout
            ),
          };
        }
        return category;
      });
  
      await updateDoc(userRef, { exercis: updatedExercises });
    } catch (error) {
      console.error("Error updating Firestore:", error);
    }
  };
  

  const handleSave = () => {
    saveExercises();
    setIsSaved(true);
    setHasMovedExercise(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-11/12">
        {/* FIRST STEP */}
        {currentStep === 1 && (
          <div className="setp-1">
            <h1>Step 1</h1>
            <div className="list-exercise">
              {exercis.map((category: Category) => (
                <div key={category.exercises.id}>
                  <h1 className="font-semibold uppercase">
                    {category.exercises.title}
                  </h1>
                  {category.exercises.workout.map((w: Workout) => (
                    <div key={w.id}>
                      <input
                        type="checkbox"
                        id={w.title}
                        value={w.title}
                        checked={isExerciseSelected(w)}
                        onChange={(e) => handleSelectExercise(e, w, category.exercises.title)}
                      />
                      <label htmlFor={w.title}>{w.title}</label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              onClick={toggleModalExercis}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              onClick={handleNextStep}
            >
              Next
            </button>
          </div>
        )}

        {/* SECOND STEP */}
        {currentStep === 2 && (
          <div className="setp-2">
            <h1>Step 2</h1>
            <h1>Exercises</h1>
            <div className="my-2 py-4 rounded-lg max-w-auto overflow-y-scroll h-[500px]">
              <div className="flex gap-8 md:flex-nowrap">
                <DndContext onDragEnd={handleDragEnd}>
                  {COLUMNS.map((column) => (
                    <Column
                      key={column.id}
                      column={column}
                      exercis={selectedExercises.filter(
                        (exercise: Workout) => exercise.status === column.id
                      )}
                      setExercises={setSelectedCategory}
                    />
                  ))}
                </DndContext>
              </div>
            </div>
            <div className="btn-action">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSave}
                className={`px-4 py-2 rounded mr-2 ${
                  isSaved ? "bg-gray-400" : "bg-green-500 text-white"
                }`}
                disabled={!hasMovedExercise}
              >
                Saved
              </button>
              {isSaved && (
                <p className="message mt-4 text-green-600">{message}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddExercises;
