import { DndContext } from "@dnd-kit/core";
import Column from "../componenets/Column/Column";
import { Category, Column as ColumnType, Exercise } from "../types/Exercis";
import { useState } from "react";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const AddExercises = ({
  exercis,
  handleDragEnd,
  message,
  toggleModalExercis,
  saveExercises,
  selectedCategory,
  handleCategoryChange,
}: any) => {
  const [isSaved, setIsSaved] = useState(false);

  const filteredExercises: Exercise[] = selectedCategory
    ? exercis
        .filter(
          (category: Category) => category.exercises.title === selectedCategory
        )
        .flatMap((category: Category) => category.exercises.workout)
    : [];

  const handleSave = () => {
    saveExercises();
    setIsSaved(true);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded-lg w-11/12">
        <h1>Exercises</h1>
        <div className="p-4 rounded-lg w-11">
          <div>
            {/* Category Select */}
            <select onChange={handleCategoryChange} value={selectedCategory}>
              <option value="">Select Category</option>
              {exercis.map((category: Category) => (
                <option value={category.exercises.title} key={category.id}>
                  {category.exercises.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-8">
            <DndContext onDragEnd={handleDragEnd}>
              {COLUMNS.map((column) => (
                <Column
                  key={column.id}
                  column={column}
                  exercis={filteredExercises.filter(
                    (exercise: Exercise) => exercise.status === column.id
                  )}
                />
              ))}
            </DndContext>
          </div>
        </div>
        <div className="btn-action">
          <button
            type="button"
            onClick={toggleModalExercis}
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className={`px-4 py-2 rounded mr-2 ${
              isSaved ? "bg-gray-400" : "bg-green-500 text-white"
            }`}
            disabled={isSaved}
          >
            {isSaved ? "Saved" : "Save"}
          </button>
          {isSaved && (
            <p className="message mt-4 text-green-600">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddExercises;
