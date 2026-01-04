import Divider from "@mui/material/Divider";
import { MessageCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import useSelectors from 'src/hooks/useSelectors';
import { messageOff, messageOn } from "src/stateSlices/messageAccordionSlice";

const NavigationTopMessages = () => {
  const messageAccordion = useSelectors((state) => state.messageAccordion.value);
  const dispatch = useDispatch();
  const theme = useSelectors((state) => state.theme.value)
  const color = theme === 'light' ? '#1976D2' : '#90CAF9'

  return (
    <div className="flex flex-col">
      <div className="flex justify-center w-16 h-[45px] pt-3">
        <MessageCircle
          color={messageAccordion? color:undefined}
          onClick={() => {
            if (messageAccordion) {
              dispatch(messageOff())
            } else {
              dispatch(messageOn())
            }
          }}
        />
      </div>
      <Divider
        sx={{
          width: "100%",
          height: "1px",
          backgroundColor: messageAccordion && color,
        }}
      />
    </div >
  );
};

export default NavigationTopMessages;
