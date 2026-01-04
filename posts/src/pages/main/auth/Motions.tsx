import { motion } from 'framer-motion';
import { TextLoop } from 'src/components/motion-primitives/text-loop';

const Motions = () => {
    const slides = [
        { musician: '에픽하이 (EPIK HIGH)', title: '우산 (Feat. 윤하)'},
        { musician: '페퍼톤스(PEPPERTONES)', title: '우산'},
        { musician: 'NCT 127', title: '우산'},
        { musician: '비', title: "It's Raining"},
        { musician: '폴킴', title: '비'},
        { musician: '이클립스(ECLIPSE)', title: '소나기'},
        { musician: '헤이즈 (Heize)', title: '비도 오고 그래서 (Feat. 신용재)'},
        { musician: '럼블 피쉬', title: '비와 당신'},
        { musician: '비스트(Beast)', title: '비가 오는 날'},
        { musician: '김태우', title: '사랑비'},
        { musician: '에픽하이 (EPIK HIGH)', title: '비 오는 날 듣기 좋은 노래'},
        { musician: '김건모', title: '잠 못 드는 밤 비는 내리고'},
        { musician: '윤하', title: '비가 내리는 날에는'},
        { musician: '정인', title: '장마'},
        { musician: '김현식', title: '비처럼 음악처럼'},
        { musician: '아이오아이 (I.O.I)', title: '소나기'},
        { musician: '윤하', title: '소나기'},
        { musician: '부활', title: '소나기'},
        { musician: '에릭남(Eric Nam)', title: '소나기'},
        { musician: '이승철', title: '비가 와'},
        { musician: '장범준', title: '추적이는 여름 비가 되어'},
        { musician: '버스커 버스커', title: '소나기 (주르르루)'},
        { musician: '토이, 윤하', title: '오늘 서울은 하루종일 맑음 (Vocal 윤하)'},
        { musician: '폴킴', title: '모든 날, 모든 순간 (Every day, Every Moment)'},
        { musician: '아이유(IU)', title: '좋은 날'},
        { musician: 'AKMU(악뮤)', title: '오랜 날 오랜 밤'},
        { musician: '김완선', title: '기분 좋은 날'},
        // { musician: '장범준', title: '추적이는 여름 비가 되어'},
        { musician: '러브홀릭스', title: 'Raining (Feat. 크리스티나 of Clazziquai)'},
        { musician: '방탄소년단', title: 'Rain'},
        { musician: 'San E(산이), 로코베리', title: '오늘 날씨 맑음'},
        { musician: 'KCM', title: '오늘도 맑음'},
        { musician: '디아(Dia)', title: '하루 종일 비가 내렸어'},
    ];
    
    let currentIndex = slides.length
    let randomIndex
    let temporaryValue
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1
        temporaryValue = slides[currentIndex];
        slides[currentIndex] = slides[randomIndex];
        slides[randomIndex] = temporaryValue;
    }
    
    // Duplicate the slides array to ensure seamless looping
    const duplicatedSlides = [...slides, ...slides];

    return (
        <div className='flex justify-center'>
            {/* <TextLoop>
                {duplicatedSlides.map((slide, index) => (
                    <span key={index} className="flex flex-shrink-0 px-5 text-sm">
                        {slide.title} - {slide.musician}
                    </span>
                ))}
            </TextLoop> */}
        <div className="relative w-1/2 overflow-hidden p-5">
            <motion.div
                className="flex"
                animate={{
                    x: ['0%', `-${(slides.length-1)*100}%`],
                    transition: {
                        ease: 'linear',
                        duration: 300,
                        repeat: Infinity,
                    }
                }}
            >
                {duplicatedSlides.map((slide, index) => (
                    <span key={index} className="flex flex-shrink-0 px-5 text-xl" 
                    >
                        {slide.title} - {slide.musician}
                    </span>
                ))}
            </motion.div>
        </div>
        </div>
    );
};

export default Motions;
