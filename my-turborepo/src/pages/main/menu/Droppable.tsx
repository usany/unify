import { useDroppable } from '@dnd-kit/core';

function Droppable(props) {
  const { isOver, over, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'red' : undefined,
  };
  // console.log(isOver)
  // console.log(over)
  return (
    <div ref={setNodeRef} className={isOver ? 'text-profile-red' : undefined
    }>
      {props.children}
    </div >
  );
}

export default Droppable
