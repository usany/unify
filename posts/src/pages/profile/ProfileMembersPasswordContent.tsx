import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { updatePassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "src/baseApi/serverbase";
import useTexts from "src/hooks/useTexts";

const ProfileMembersPasswordContent = () => {
  const [password, setPassword] = useState({
    newPassword: '',
    newPasswordConfirm: ''
  })
  const { registerNewPassword, changePassword, newPassword, newPasswordConfirm } = useTexts()
  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'newPassword') {
      setPassword({ newPassword: value, ...password });
    } else {
      setPassword({ newPasswordConfirm: value, ...password });
    }
  };
  const onSubmit = (event) => {
    event.preventDefault()
    if (password.newPassword && password.newPassword === password.newPasswordConfirm) {
      const user = auth.currentUser
      const newPassword = password.newPassword;
      updatePassword(user, newPassword).then(() => {
        console.log('passwords')
      }).catch((error) => {
        console.log(error)
      })
    } else {
      alert('Cannot change password')
    }
  }
  return (
    <form
      id='changePassword'
      onSubmit={onSubmit}
    >
      <div className='p-5'>
        {registerNewPassword}
      </div>
      <div className="flex flex-col justify-center p-5">
        <TextField type='password' name={newPassword} label={newPassword} onChange={onChange} required />
        <TextField type='password' name={newPasswordConfirm} label={newPasswordConfirm} onChange={onChange} required />
        <div className='flex justify-center pt-5'>
          <Button className='colorOne' variant="outlined" form='changePassword' type='submit'>
            {changePassword}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProfileMembersPasswordContent;
