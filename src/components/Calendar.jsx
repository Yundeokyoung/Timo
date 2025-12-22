import { useState } from "react";
import "../Calendar.css";

function Calendar() {

    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const [selectedDay, setSelectedDay] = useState(null);

    const [activityName, setActivityName] = useState("");
    const [activityTime, setActivityTime] = useState("");
    const [timeTaken, setTimeTaken] = useState("");
    const [showAddTime, setShowAddTime] = useState(false);
    const [activities, setActivities] = useState([]);

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(i);

    const token = localStorage.getItem("token");
    console.log("Calendar에서 가져온 토큰:", token);

    const getNicknameFromToken = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            console.log("JWT payload:", payload); 
            return (payload.nickname || payload.name || payload.username || payload.sub || null);
        } catch (e) {
            console.error("토큰 디코딩 실패", e);
            return null;
        }
    };

    const nickname = getNicknameFromToken();
    if (nickname) {
        console.log("로그인한 사용자:", nickname);
    } else {
        console.log("토큰 없음 또는 로그인 필요");
    }

    const showpopup = () => document.getElementById("overlay").style.display = "block";
    const closepopup = () => document.getElementById("overlay").style.display = "none";
    const closeBtn = () => document.getElementById("addTime_container").style.display = "none";

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
    const signout_btn = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };
    const dashboaed_btn = () => {
        window.location.href = "/dashboard";
    }
    const toggleAddTime = () => setShowAddTime(!showAddTime);

    const handleAddActivity = async () => {
        const token = localStorage.getItem("token");
        const nickname = getNicknameFromToken();

        if (!token || !nickname) {
            alert("로그인이 필요합니다!");
            return;
        }

        if (!selectedDay) {
            alert("날짜를 선택해주세요!");
            return;
        }

        if (!activityName || !activityTime || !timeTaken) {
            alert("모든 항목을 입력해주세요!");
            return;
        }

        const newActivity = {
            title: activityName,
            time: activityTime,
            time_taken: Number(timeTaken),
            category: "수업"
        };

        try {
            const res = await fetch("https://87186275bd7f.ngrok-free.app/schedule/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: activityName,
                    time: activityTime,
                    time_taken: Number(timeTaken),
                    nickname: String(nickname),
                    date: `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`
                })
            });

            if (!res.ok) {
                alert("서버 오류 발생");
                return;
            }

            setActivities(prev => [...prev, newActivity]);
            setActivityName("");
            setActivityTime("");
            setTimeTaken("");
            setShowAddTime(false);

        } catch (err) {
            console.error(err);
            alert("데이터 전송 실패");
        }
    };

    return (
        <>
            <div className="top">
                <div className="title">
                    <img src="/Lumi_image.png" className='Logo_img' alt="Logo" />
                    <h1>Lumi</h1>
                    <p>당신의 하루를 똑똑하게 계획하세요</p>
                </div>
                <div className="btns">
                    <button className="dashboard_btn" onClick={dashboaed_btn}>대시보드</button>
                    <button className="signout_btn" onClick={signout_btn}>로그아웃</button>
                </div>
            </div>
            <div className="calendar_wrap">
                <div className="calendar-header">
                    <h2 className="calendar-title">
                        {year}년 {month + 1}월
                    </h2>
                </div>
                <div className="nav-btn">
                    <button className="setting-btn"><ion-icon name="settings-outline"></ion-icon></button>
                    <button onClick={prevMonth} className="nav-btn-L"><ion-icon name="chevron-back-outline"></ion-icon></button>
                    <button onClick={nextMonth} className="nav-btn-R"><ion-icon name="chevron-forward-outline"></ion-icon></button>
                </div>
                <div className="calendar-grid">
                    {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                        <div key={d} className="calendar-day-header">{d}</div>
                    ))}
                    {days.map((day, index) => (
                        <button
                            key={index}
                            className="calendar-day"
                            onClick={() => {
                                setSelectedDay(day);
                                showpopup();
                            }}>
                            {day}
                        </button>
                    ))}

                    <div className="overlay" id="overlay">
                        <div className="popup">
                            <button className="close-btn" onClick={closepopup}><ion-icon className="close_outline" name="close-outline"></ion-icon></button>
                            <h2><ion-icon className="time-outline" name="time-outline"></ion-icon>{year}년 {month + 1}월 {selectedDay}일</h2>
                            <h3>일정</h3>
                            <div className="button">
                                <button className="addTime_btn" id="addtimeBtn" onClick={toggleAddTime}>+ 시간 추가</button>
                                <button className="AI_btn">AI 추천</button>
                            </div>
                            <div className="addTime" id="addTime_container" style={{ display: showAddTime ? "block" : "none", transition: "all 0.3s" }}>
                                <div className="addTime_box">
                                    <h3>새로운 시간 추가</h3>
                                    <button className="closeBtn" onClick={closeBtn}><ion-icon className="close_outline" name="close-outline"></ion-icon></button>
                                </div>
                                <div className="activity_name">
                                    <h4>활동 이름</h4>
                                    <input type="text" className="activityName_box" value={activityName} onChange={(e) => setActivityName(e.target.value)} placeholder="예: 개별 공부, 휴식, 운동" />
                                </div>
                                <div className="times">
                                    <h4>시간</h4>
                                    <input type="time" className="time_box" value={activityTime} onChange={(e) => setActivityTime(e.target.value)} />
                                </div>
                                <div className="time_required">
                                    <h4>소요 시간(분)</h4>
                                    <input type="number" min="0" className="timeRequired_box" value={timeTaken} onChange={(e) => setTimeTaken(e.target.value)} />
                                </div>
                                <button className="add_btn" onClick={handleAddActivity}>추가하기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Calendar