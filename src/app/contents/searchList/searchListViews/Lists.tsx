import { DrawerClose } from 'src/components/ui/drawer'
import ListsView from './ListsView'

function Lists({ elements, multiple, userSearch, ranking, handleUser }) {
  if (!ranking)
    return (
      <DrawerClose>
        <ListsView
          elements={elements}
          userSearch={userSearch}
          multiple={multiple}
          handleUser={handleUser}
        />
      </DrawerClose>
    )
  return (
    <ListsView
      elements={elements}
      userSearch={userSearch}
      multiple={multiple}
      handleUser={handleUser}
    />
  )
}

export default Lists
