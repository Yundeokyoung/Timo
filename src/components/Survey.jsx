import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Survey.css';

function Survey() {
    const navigate = useNavigate();

    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [sleepTime, setSleepTime] = useState("00:00");
    const [wakeTime, setWakeTime] = useState("00:00");

    const nickname = localStorage.getItem("nickname");

    const handleSubmit = async () => {
        if (!nickname) {
            alert("닉네임 정보가 없습니다. 다시 회원가입 해주세요.");
            navigate("/register");
            return;
        }

        const data = {
            nickname: (nickname), 
            morningNight: q1 === "0" ? "아침형" : "저녁형",
            focus: parseInt(q2),
            maxFocus: parseInt(q3),
            sleep: sleepTime,  
            rising: wakeTime 
        };

        console.log("보낼 데이터:", data);

        try {
            const res = await fetch(
                "https://volcanic-lilla-unenamelled.ngrok-free.dev/Timo/Py/tendency",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json; charset=UTF-8" },
                    body: JSON.stringify(data),
                }
            );

            if (!res.ok) throw new Error("서버 요청 실패");

            const text = await res.text();
            let result = null;

            if (text) {
                try {
                    result = JSON.parse(text);
                } catch (err) {
                    console.warn("서버 응답 JSON 파싱 실패, 원본 텍스트:", text);
                }
            }

            console.log("설문 제출 성공:", result);
            navigate("/");

        } catch (error) {
            console.error("설문 제출 에러:", error);
            alert("설문 제출에 실패했습니다.");
        }
    };

    return(
        <>
        <div className="top">
            <img src="/Timo.png" className='Logo' alt='Logo' />
            <h1>Timo</h1>
            <p>당신의 생활 패턴을 알려주세요</p>
        </div>
        <div className='survey_container_box'>
            <div className='main'>
                <h4>개인 정보 설문</h4>
                <p>시간 관리를 최적화하기 위해 몇 가지 질문에 답해주세요</p>
                <div className='question'>
                    <div className='questions'>
                        <h3>1. 아침형 인간인가? 저녁형 인간인가?</h3>
                        <label className='question_box'>
                            <input type="radio" name='1' onChange={() => setQ1("0")} /> 0: 아침형 (아침에 에너지 터져요)
                        </label>
                        <label className='question_box'>
                            <input type="radio" name='1' onChange={() => setQ1("1")} /> 1: 저녁형 (밤에 진짜 살아나요)
                        </label>
                    </div>

                    <div className='questions'>
                        <h3>2. 평소 집중을 잘 하는 편이야?</h3>
                        <label className='question_box'>
                            <input type="radio" name='2' onChange={() => setQ2("0")} /> 0: 잘 함 (방해 좀 받아도 괜찮아)
                        </label>
                        <label className='question_box'>
                            <input type="radio" name='2' onChange={() => setQ2("1")} /> 1: 보통 (조용해야 좀 됨)
                        </label>
                        <label className='question_box'>
                            <input type="radio" name='2' onChange={() => setQ2("2")} /> 2: 잘 못 함 (쉽게 딴짓함)
                        </label>
                    </div>

                    <div className='questions'>
                        <h3>3. 한 번 앉았을 때 최대 몇 분 정도 집중할 수 있어?</h3>
                        <label className='question_box'>
                            <input type="radio" name='3' onChange={() => setQ3("0")} /> 0: 25분 이하
                        </label>
                        <label className='question_box'>
                            <input type="radio" name='3' onChange={() => setQ3("1")} /> 1: 50분 정도
                        </label>
                        <label className='question_box'>
                            <input type="radio" name='3' onChange={() => setQ3("2")} /> 2: 1시간 30분 정도
                        </label>
                        <label className='question_box'>
                            <input type="radio" name='3' onChange={() => setQ3("3")} /> 3: 2시간 이상
                        </label>
                    </div>

                    <div className='questions'>
                        <h3>4. 보통 몇 시에 자? (24시간 기준)</h3>
                        <input type="time" className='time' value={sleepTime} onChange={(e) => setSleepTime(e.target.value)}/>
                    </div>

                    <div className='questions'>
                        <h3>5. 보통 몇 시에 일어나?</h3>
                        <input type="time" className='time' value={wakeTime} onChange={(e) => setWakeTime(e.target.value)}/>
                    </div>
                </div>
            </div>

            <div className='bottom'>
                <input type="button" value='설문완료' className='completion_btn' onClick={handleSubmit} />
            </div>
        </div>
        </>
    );
}

export default Survey;