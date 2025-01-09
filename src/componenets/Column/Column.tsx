import { useDroppable } from "@dnd-kit/core";
import { Exercise, Column as ColumnType } from "../../types/Exercis";
import ExercisesCard from "../Card/ExercisesCard";

type ColumnProps = {
  column: ColumnType;
  exercis: Exercise[];
};

const Column = ({ column, exercis }: ColumnProps) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-5">
      <h2 className="mb-4 font-semibold text-neutral-100">{column.title}</h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {exercis.map((task) => {
          return <ExercisesCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
};

export default Column;
