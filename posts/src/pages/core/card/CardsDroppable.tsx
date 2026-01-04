import { Ban } from 'lucide-react'
import Droppable from 'src/pages/main/menu/Droppable'

const CardDroppable = () => {
  return (
    <Droppable>
      <div className="px-10">
        <div className="flex justify-center rounded bg-light-2 dark:bg-dark-2 p-5">
          <Ban />
        </div>
      </div>
    </Droppable>
  )
}

export default CardDroppable
