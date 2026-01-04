import { DrawerClose } from 'src/components/ui/drawer';
import ListsView from '../search/searchList/searchListViews/ListsView';

const ProfileDrawersAllies = ({ companies }) => {

  return (
    <div className="flex flex-col justify-center p-5">
      <DrawerClose>
        <ListsView
          elements={companies}
          multiple={true}
          userSearch={null}
          handleUser={null}
        />
      </DrawerClose>
    </div>
  );
}

export default ProfileDrawersAllies
