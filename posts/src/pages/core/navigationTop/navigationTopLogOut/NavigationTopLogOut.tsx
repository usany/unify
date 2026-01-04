import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import useSelectors from 'src/hooks/useSelectors';

const NavigationTopLogOut = () => {
  const languages = useSelectors((state) => state.languages.value)
  return (
    <div className="flex flex-col">
      <Link to="/">
        <div className="flex justify-center pt-5 min-w-36">{languages === 'ko' ? '로그인을 해 주세요' : 'Please sign in'}</div>
      </Link>
      <Divider sx={{ width: "100%" }} />
    </div>
  );
};

export default NavigationTopLogOut;
