import { useSelector } from "react-redux";
import useSelectors from 'src/hooks/useSelectors';

function AuthDialogsTriggerPassword({findingPassword}) {
  const theme = useSelector((state) => state.theme.value);
  const languages = useSelectors((state) => state.languages.value)
  return (
    <>
      {/* <div className="flex justify-center text-xs p-5">
        <Divider sx={{ width: "15%", padding: "5px" }} /> */}
      {/* <div>{languages === 'ko' ? '비밀번호 찾기' : 'Find Password'}</div> */}
      {/* <Divider sx={{ width: "15%", padding: "5px" }} />
      </div> */}
    </>
  );
}

export default AuthDialogsTriggerPassword;
