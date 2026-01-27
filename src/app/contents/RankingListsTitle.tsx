import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useLanguage } from '@/context/LanguageContext'
import { useEffect, useState } from 'react';

interface Props {
  multiple: boolean
}
function RankingListsTitle({ multiple }: Props) {
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
  
  const { language } = useLanguage()
  return (
    <div className="flex truncate justify-center w-full">
      <div className={`flex justify-around w-full`}>
        {isLargeScreen ? (
          <div className="flex items-center justify-center">
            {multiple ? (language === 'en' ? 'User' : '유저') : language === 'en' ? 'My' : '내'} {multiple ? (language === 'en' ? 'Ranking' : '랭킹') : language === 'en' ? 'Ranking' : '랭킹'}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div>{multiple ? (language === 'en' ? 'User' : '유저') : language === 'en' ? 'My' : '내'}</div>
            <div>{multiple ? (language === 'en' ? 'Ranking' : '랭킹') : language === 'en' ? 'Ranking' : '랭킹'}</div>
          </div>
        )}
        <div className="flex items-center">
          <Avatar className={`bg-light-2 dark:bg-dark-2 border border-dashed`}>
            <AvatarImage src={''} />
            <AvatarFallback className="text-xl border-none">?</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-center overflow-hidden px-3 w-32">
          <div>
            {multiple ? (language === 'en' ? 'User' : '유저') : language === 'en' ? 'My' : '내'} {multiple ? (language === 'en' ? 'Name' : '이름') : language === 'en' ? 'Name' : '이름'}
          </div>
          <div>{multiple ? (language === 'en' ? 'Points' : '포인트') : language === 'en' ? 'Points' : '포인트'}</div>
        </div>
        <div className="flex flex-col justify-center items-center w-[100px]">
          <div>{language === 'en' ? 'Campus' : '캠퍼스'}</div>
          <div>{language === 'en' ? 'Verification' : '확인'}</div>
        </div>
      </div>
    </div>
  )
}

export default RankingListsTitle
