import { Exercise } from "../../types/Exercis";
import { useDraggable } from "@dnd-kit/core";

type ExercisCardProps = {
  task: Exercise;
};

const ExercisesCard = ({ task }: ExercisCardProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

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
      className="cursor-grab rounded-lg bg-neutral-700 p-4 shadow-sm hover:shadow-md"
      style={style}
    >
      <h3 className="font-medium text-neutral-100">{task.title}</h3>
    </div>
  );
};

export default ExercisesCard;
