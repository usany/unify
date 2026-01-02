import Divider from "@mui/material/Divider";
import { CreditCard } from "lucide-react";
import { useDispatch } from "react-redux";
import useSelectors from 'src/hooks/useSelectors';
import {
  cardOff,
  cardOn
} from "src/stateSlices/cardAccordionSlice";

const NavigationTopCards = () => {
  const cardAccordion = useSelectors((state) => state.cardAccordion.value);
  const theme = useSelectors((state) => state.theme.value)
  const color = theme === 'light' ? '#1976D2' : '#90CAF9'
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col h-[48px]">
      <div className="flex justify-center w-16 h-[45px] pt-3">
        <CreditCard
          color={cardAccordion? color:undefined}
          onClick={() => {
            if (cardAccordion) {
              dispatch(cardOff())
            } else {
              dispatch(cardOn())
            }
          }}
        />
      </div>
      <Divider
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: cardAccordion && color,
        }}
      />
    </div>
  );
};

export default NavigationTopCards;
