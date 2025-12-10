import { useState } from 'react';
import '../Survey.css';

function Survey() {
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [sleepTime, setSleepTime] = useState("");
    const [wakeTime, setWakeTime] = useState("");

     const handleSubmit = async () => {
        const data = {
            q1,
            q2,
            q3,
            sleepTime,
            wakeTime,
        };
        
        const res = await fetch("http://localhost:8000/survey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        console.log(result);
    };

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
                                <input type="radio" name='1' onChange={() => setQ1("0")} /> 0: 아침형 (아침에 에너지 터져요)
                            </label>
                        </button>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='1' onChange={() => setQ1("1")} /> 1: 저녁형 (밤에 진짜 살아나요)
                            </label>
                        </button>
                    </div>
                    <div className='questions'>
                        <h3>2. 평소 집중을 잘 하는 편이야?</h3>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='2' onChange={() => setQ2("0")} /> 0: 잘 함 (방해 좀 받아도 괜찮아)
                            </label>
                        </button>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='2' onChange={() => setQ2("1")} /> 1: 보통 (조용해야 좀 됨)
                            </label>
                        </button>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='2' onChange={() => setQ2("2")} /> 2: 잘 못 함 (쉽게 딴짓함)
                            </label>
                        </button>
                    </div>
                    <div className='questions'>
                        <h3>3. 한 번 앉았을 때 최대 몇 분 정도 집중할 수 있어?</h3>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='3' onChange={() => setQ3("0")} /> 0: 25분 이하
                            </label>
                        </button>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='3' onChange={() => setQ3("1")} /> 1: 50분 정도
                            </label>
                        </button>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='3' onChange={() => setQ3("2")} /> 2: 1시간 30분 정도
                            </label>
                        </button>
                        <button className='question_box'>
                            <label>
                                <input type="radio" name='3' onChange={() => setQ3("3")} /> 3: 2시간 이상
                            </label>
                        </button>
                    </div>
                    <div className='questions'>
                        <h3>4. 보통 몇 시에 자? (24시간 기준)</h3>
                        <label>
                            <input type="time" className='time' onChange={(e) => setSleepTime(e.target.value)}/>
                        </label>
                    </div>
                    <div className='questions'>
                        <h3>5. 보통 몇 시에 일어나?</h3>
                        <label>
                            <input type="time" className='time' onChange={(e) => setWakeTime(e.target.value)}/>
                        </label>
                    </div>
                </div>
            </div>
            <div className='bottom'>
                <input type="submit" value='설문완료' className='completion_btn' onClick={handleSubmit} />
            </div>
        </div>
        </>
    )
}

export default Survey