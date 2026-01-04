import { ScrollText } from "lucide-react";
import useTexts from "src/hooks/useTexts";
import FilterDialogsTrigger from "./FilterDialogs/FilterDialogsTrigger";

function BoardList() {
  const { cardList } = useTexts()

  return (
    <div className="rounded shadow-md flex p-3 gap-1 justify-between bg-light-2/50 dark:bg-dark-2/50">
      <div className='flex gap-5 pt-1'>
        <ScrollText />{cardList}
      </div>
      <div className="flex gap-1">
        <FilterDialogsTrigger />
      </div>
    </div>
  );
}

export default BoardList;
