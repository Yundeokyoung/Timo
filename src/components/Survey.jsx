import '../Survey.css';

function Survey() {

    return(
        <>
        <div className="top">
            <img src="/Lumi_image.png" className='Logo' alt='Logo' />
            <h1>Lumi</h1>
            <p>당신의 생활 패턴을 알려주세요</p>
        </div>
        <div className='survey_container_box'>
            <div className='main'>
                <h4>개인 정보 설문</h4>
                <p>시간 관리를 최적화하기 위해 몇 가지 질문에 답해주세요</p>
                <div className='question'>
                    <div className='questions'>
                        <h3>1.아침형 인간인가? 저녁형 인간인가?</h3>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='1' /> 0: 아침형 (아침에 에너지 터져요)
                            </label>
                        </button>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='1' /> 1: 저녁형 (밤에 진짜 살아나요)
                            </label>
                        </button>
                    </div>
                    <div className='questions'>
                        <h3>2. 평소 집중을 잘 하는 편이야?</h3>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='2' /> 0: 잘 함 (방해 좀 받아도 괜찮아)
                            </label>
                        </button>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='2' /> 1: 보통 (조용해야 좀 됨)
                            </label>
                        </button>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='2' /> 2: 잘 못 함 (쉽게 딴짓함)
                            </label>
                        </button>
                    </div>
                    <div className='questions'>
                        <h3>3. 한 번 앉았을 때 최대 몇 분 정도 집중할 수 있어?</h3>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='3' /> 0: 25분 이하
                            </label>
                        </button>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='3' /> 1: 50분 정도
                            </label>
                        </button>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='3' /> 2: 1시간 30분 정도
                            </label>
                        </button>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='3' /> 3: 2시간 이상
                            </label>
                        </button>
                    </div>
                    <div className='questions'>
                        <h3>4. 보통 몇 시에 자? (24시간 기준)</h3>
                        <label>
                                <input type="time" className='time'/>
                        </label>
                    </div>
                    <div className='questions'>
                        <h3>5. 보통 몇 시에 일어나?</h3>
                        <label>
                                <input type="time" className='time'/>
                        </label>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                <input type="submit" value='설문완료' className='completion_btn' />
            </div>
        </div>
        </>
    )
}

export default Survey