import { useState } from "react";
import "../Feedback.css";

function Feedback() {

    const [option, setOption] = useState("");
    const nickname = localStorage.getItem("nickname");

    const backBtn = () => {
        window.location.href = "/calendar";
    };

    const sendFeedback = async () => {
        if (!option.trim()) {
            alert("의견을 입력해주세요.");
            return;
        }

        try {
            console.log("보내는 데이터:", {
                nickname: String(nickname),
                description: String(option),
            });

            const res = await fetch(
                "https://volcanic-lilla-unenamelled.ngrok-free.dev/Timo/Py/FeedBack",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        nickname: String(nickname),
                        description: String(option),
                    }),
                }
            );

            const text = await res.text();
            console.log("응답 status:", res.status);
            console.log("응답 body:", text);

            if (!res.ok) throw new Error("서버 오류");

            alert("피드백이 전송되었습니다!");
            setOption("");
        } catch (err) {
            console.error(err);
            alert("전송 실패");
        }
    };

    return (
        <>
            <div className="the_top">
                <button className="back_button" onClick={backBtn}><ion-icon name="arrow-back-outline" className="back_icon"></ion-icon> 뒤로가기</button>
                <h1>피드백</h1>
                <p>당신의 경험을 들려주세요</p>
            </div>
            <div className="feedback_container">
                <h2>오늘 하루는 어떤가요?</h2>
                <div className="example">
                    <p>예:</p>
                    <div className="ex"><span>집중이 잘 됐어요</span></div>
                    <div className="ex"><span>산만했어요</span></div>
                    <div className="ex"><span>피곤했어요</span></div>
                    <div className="ex"><span>생산적이었어요</span></div>
                </div>
                <div className="line"></div>
                <textarea className="opinion_box" placeholder="오늘 일정이 어땠는지 자유롭게 작성하세요." value={option} onChange={(e) => setOption(e.target.value)}></textarea>
                <button className="feedbackbtn" onClick={sendFeedback}><ion-icon name="paper-plane-outline"></ion-icon> 피드백 보내기</button>
            </div>
        </>
    )
}

export default Feedback;