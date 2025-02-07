import { useDroppable } from "@dnd-kit/core";
import { Column as ColumnType, Workout } from "../../types/Exercis";
import ExercisesCard from "../Card/ExercisesCard";

type ColumnProps = {
  column: ColumnType;
  exercis: Workout[];
  setExercises: React.Dispatch<React.SetStateAction<any[]>>;
};

const Column = ({ column, exercis, setExercises }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div className="flex flex-col rounded-lg bg-neutral-800 p-5">
      <h2 className="w-[150px] mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4 w-2xs">
        {exercis.map((task) => {
          return <ExercisesCard key={task.id} exercise={task} columnId={column.id} setExercises={setExercises} />;
        })}
      </div>
    </div>
  );
};

export default Column;
