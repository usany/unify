import { useEffect, useState } from "react";
import PageTitle from "src/pages/core/pageTitle/PageTitle";
// import { useImmer } from "use-immer";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Chip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changeBottomNavigation } from "src/stateSlices/bottomNavigationSlice";
import useTexts from "src/hooks/useTexts";

interface Props {
  isBorrow: boolean
}
function LayoutBoard({ isBorrow }: Props) {
  const [mapAccordion, setMapAccordion] = useState(false)
  const mapAccordionToggle = () => setMapAccordion(!mapAccordion)
  const { borrowing, lending, registeredMap, cardList, pleaseSignIn, allItems, allLocations, recent } = useTexts()
  const dispatch = useDispatch()
  const selectedValues = [
    {
      id: "selectedValueOne",
      value: allItems,
    },
    {
      id: "selectedValueTwo",
      value: allLocations,
    },
    {
      id: "selectedValueThree",
      value: recent,
    },
  ];
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, []);

  return (
    <div className='flex flex-col h-screen'>
      <PageTitle title={isBorrow ? `${borrowing} ${cardList}` : `${lending} ${cardList}`} />
      <div className='blur-md'>
        <Accordion type="single" collapsible className="px-3" disabled>
          <AccordionItem value="item-1">
            <AccordionTrigger onClick={() => mapAccordionToggle()}>
              {registeredMap}
            </AccordionTrigger>
          </AccordionItem>
        </Accordion>
        <div className="flex p-3 sticky top-16 z-30 justify-between bg-light-3 dark:bg-dark-3">
          <div className="pt-1">{cardList}</div>
          <div className="flex gap-1 pt-1">
            {selectedValues.map((element) => {
              return (
                <Chip label={element.value} />
              )
            })}
          </div>
        </div>
      </div>
      <Link to='/'>
        <div className='flex fixed justify-center top-[30%] left-[10%] right-[10%]' onClick={() => dispatch(changeBottomNavigation(1))}>
          <div className='flex rounded bg-light-1 dark:bg-dark-1 w-1/2 p-5 justify-center shadow-md'>{pleaseSignIn}</div>
        </div>
      </Link>
    </div>
  );
}

export default LayoutBoard;
