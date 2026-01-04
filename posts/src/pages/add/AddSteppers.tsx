import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
// import { useSelector } from 'react-redux';
import useSelectors from 'src/hooks/useSelectors';

interface Props {
  addSteps: number
  borrow: boolean
}

const stepOneItems = '우산 / 양산 선택'
const stepsTwoToFour = [
  ['장소 입력'],
  ['시간 입력'],
  ['등록 완료'],
]
const borrowSteps = [
  ['무엇을 빌리세요?', stepOneItems],
  ...stepsTwoToFour
];
const lendSteps = [
  ['무엇을 빌려주세요?', stepOneItems],
  ...stepsTwoToFour
];
const stepsCollection = [borrowSteps, lendSteps]
const stepsTwoToFourLanguages = [
  ['Location', 'Input'],
  ['Time', 'Input'],
  ['Registeration', 'Complete'],
]
const borrowStepsLanguages = [
  ['What are you', 'borrowing?'],
  ...stepsTwoToFourLanguages
]
const lendStepsLanguages = [
  ['What are you', 'lending?'],
  ...stepsTwoToFourLanguages
]
const stepsCollectionLanguages = [borrowStepsLanguages, lendStepsLanguages]
function AddSteppers({ addSteps, borrow }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const collection = languages === 'ko' ? stepsCollection : stepsCollectionLanguages
  return (
    <div className='w-full'>
      <Stepper
        activeStep={addSteps}
        alternativeLabel
      >
        {
          collection[[true, false].indexOf(borrow)].map((label, index) => {
            return (
              <Step key={index}>
                <StepLabel>
                  {label.map((element, index) => {
                    return (
                      <div key={index} className={`${languages !== 'ko' && 'text-xs'} truncate`}>{element}</div>
                    )
                  })}
                </StepLabel>
              </Step>
            )
          })
        }
      </Stepper>
    </div>
  )
}

export default AddSteppers
