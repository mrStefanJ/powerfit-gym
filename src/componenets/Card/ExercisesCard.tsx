import { useState } from "react";
import { Category, Workout } from "../../types/Exercis";
import { useDraggable } from "@dnd-kit/core";

type ExercisCardProps = {
  exercise: Workout;
  columnId: string;
  setExercises: React.Dispatch<React.SetStateAction<Category[]>>;
};

const ExercisesCard = ({ exercise, columnId, setExercises }: ExercisCardProps) => {
  const [inputValue, setInputValue] = useState<number>(5);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: exercise.id.toString(),
  });

  // useEffect(() => {
  //   setInputValue(exercise.sets ?? 5);
  // }, [exercise.sets]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newValue = value >= 0 ? value : 0;
    
    setInputValue(newValue);
  
    setExercises((prev) => {
      if (!prev || !Array.isArray(prev)) return [];
  
      return prev.map((category) => ({
        ...category,
        exercises: {
          ...category.exercises,
          workout: category.exercises.workout.map((ex) =>
            ex.id === exercise.id ? { ...ex, sets: newValue } : ex
          ),
        },
      }));
    });
  };  

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;
    
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="cursor-grab rounded-lg bg-neutral-700 p-6 w-2xs shadow-sm hover:shadow-md"
      style={style}
    >
      <h3 className="w-[60px] font-medium text-neutral-100">{exercise.title}</h3>

      {columnId === "IN_PROGRESS" && (
        <input
          type="number"
          min="0"
          value={inputValue}
          onChange={handleInputChange}
          className="w-[80px] p-2 rounded"
        />
      )}

      {columnId === "DONE" && (
        <input
          type="number"
          value={inputValue}
          className="w-[80px] p-2 rounded"
          disabled
        />
      )}
    </div>
  );
};

export default ExercisesCard;
