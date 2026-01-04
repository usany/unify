import Switch from '@mui/material/Switch'
import { styled } from '@mui/material/styles'
import { useRef, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'src/components/ui/accordion'
import useTexts from 'src/hooks/useTexts'
const MessageSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}))

interface Props {
  agreed: boolean
  changeAgreed: () => void
  changeProgress: () => void
}
function AuthMethods({ agreed, changeAgreed, changeProgress }: Props) {
  // const [accordion, setAccordion] = useState('item')
  const { privateInformationPolicy, agreeOnPrivateInformationPolicy } =
    useTexts()
  const docRef = useRef(null)
  // const changeAccordion = () => {
  //   if (accordion) {
  //     setAccordion('')
  //   } else {
  //     setAccordion('item')
  //   }
  // }
  return (
    <div className="flex flex-col w-full">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger ref={docRef} className="px-3" onClick={(event) => {
            const newValue = event.target.dataset.state === 'open' ? false : true
            changeProgress(newValue)
          }}>
            쿠우산KHUSAN {privateInformationPolicy}
          </AccordionTrigger>
          <AccordionContent className="px-3">
            <div>
              쿠우산KHUSAN은 다음의 목적을 위하여 개인정보를 처리합니다.
              처리하고 있는 개인정보는 다음의 목적 외의 용도로는 이용되지
              않으며, 이용 목적이 변경되는 경우에는 관계 법령에 따라 별도의
              동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </div>
            <div>1. 회원 가입 및 관리</div>
            <div>
              회원 자격 유지와 관리, 서비스 부정이용 방지 목적으로 개인정보를
              처리합니다.
            </div>
            <div>2. 서비스 제공</div>
            <div>콘텐츠 제공, 본인인증의 목적으로 개인정보를 처리합니다.</div>
            <div>3. 서비스 개선 및 분석</div>
            <div>
              서비스 이용에 대한 분석, 서비스 개선을 목적으로 개인정보를
              처리합니다.
            </div>
            <div>4. 서비스 개발</div>
            <div>
              기존 서비스와 별개의 신규 서비스 개발 목적으로 개인정보를
              처리합니다.
            </div>
            <div>각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.</div>
            <div>1. 홈페이지 회원 가입: 회원 탈퇴 시까지</div>
            <div>
              다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료 시까지
              보관합니다.
            </div>
            <div>
              1. 관계 법령 위반에 따른 수사, 조사 등이 진행 중인 경우에는 해당
              수사, 조사 종료 시까지
            </div>
            <div>
              쿠우산KHUSAN은 개인정보 보유기간의 경과, 처리목적 달성 등
              개인정보가 불필요하게 되었을 떄에는 지체없이 해당 개인정보를
              파기합니다.
            </div>
            <div>
              쿠우산KHUSAN은 정보주체에게 개별적인 서비스와 편의를 제공하기 위해
              이용정보를 저장하고 수시로 불러오는 쿠키를 사용합니다.
            </div>
            <div>
              쿠우산KHUSAN은 원활한 개인정보 업무처리를 위하여 다음과 같이
              개인정보 처리 업무를 위탁하고 있습니다.
            </div>
            <div>위탁받는 자: Google구글</div>
            <div>위탁업무: 개인정보 관리</div>
            <div>
              쿠키는 웹사이트 운영에 이용되는 http 서버가 정보주체의 브라우저에
              보내는 소량의 정보로서 정보주체의 컴퓨터 또는 모바일에 저장되며,
              웹사이트 접속 시 정보주체의 브라우저에서 서버로 자동 전송됩니다.
            </div>
            <div>
              정보주체는 브라우저 옵션 설정을 통해 쿠키 허용, 차단 등의 설정을
              할 수 있습니다.
            </div>
            <div className="flex gap-5 items-center">
              <MessageSwitch checked={agreed} onClick={changeAgreed} />
              <div>{agreeOnPrivateInformationPolicy}</div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export default AuthMethods
