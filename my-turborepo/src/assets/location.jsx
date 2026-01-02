import { useState, useEffect } from 'react'
import Lottie from 'react-lottie-player'
import rain from './assets/Animation.json'

const location = {
    '중도' : ['1열(1F)', '2열(2F)', '3열(2F)', '4열(4F)', '1층 책상', '1층 세미나실', '1층 집중열', '매점(2F)', '카페(1F)', '중앙자료실 책상(3F)', '참고열람실 책상(4F)', '정기간행물 책상(4F)'],
    '청운' : ['매점(B1)', '글로벌존(B1)'],
    '푸른솔' : ['매점(1F)'],
    '간호이과대' : ['카페(B2)', '열람실(B2)'],
    '경영대' : ['카페'],
    '문과대' : ['복사실'],
    '의과대' : ['1열(5F)', '2열(6F)'],
    '치과병원' : ['1층 로비'],
}

export default location