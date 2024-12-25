import { useSortable } from '@dnd-kit/sortable';
import { TaskType } from '@/types';
import { Task } from '@/components/task';

export function SortableItem({ id, task }: { id: string, task: TaskType }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Task task={task} />
    </div>
  );
}
