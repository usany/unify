import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { InputOTP, InputOTPGroup, InputOTPSlot } from 'src/components/ui/input-otp';

interface Props {
  numberString: string
  handleNumberString: (newValue: string) => void
}
function AuthPassword({ numberString, handleNumberString }: Props) {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={(newValue) => handleNumberString(newValue)} value={numberString}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}

export default AuthPassword
