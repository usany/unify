// import Stack from '@mui/material/Stack';
import { User } from 'firebase/auth';
// import { changeNewMessage, changeNewMessageTrue, changeNewMessageFalse } from 'src/stateSlices/newMessageSlice'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";

interface Props {
  userObj: User
  chattings: {}
  handleChattings: ({ }) => void
}

const ChattingDrawers = ({ conversation, displayName }: Props) => {
  console.log(conversation)
  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <div id={conversation} />
        </DrawerTrigger>
        <DrawerContent className='bg-light-3 dark:bg-dark-3'>
          <div>{conversation}</div>
          <div>{displayName}</div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ChattingDrawers
