import { useState } from "react";
import "../Calendar.css";

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const [selectedDay, setSelectedDay] = useState(null);
    
    const [activityName, setActivityName] = useState("");
    const [activityTime, setActivityTime] = useState("");
    const [endTime, setEndTime] = useState("");
    
    const [showAddTime, setShowAddTime] = useState(false);
    const [showAI, setShowAI] = useState(false);
    
    const [activitiesByDate, setActivitiesByDate] = useState({});
    const [aiRecommendations, setAIRecommendations] = useState([]); 

    const [aiTasks, setAITasks] = useState([{ title: "" }]);

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(i);

    const getNicknameFromToken = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        try {
            const base64 = token.split(".")[1];
            const payload = JSON.parse(decodeURIComponent(escape(window.atob(base64))));
            return payload.nickname || payload.name || payload.username || payload.sub || null;
        } catch (e) {
            console.error("토큰 오류:", e);
            return null;
        }
    };

    const nickname = getNicknameFromToken();

    const showpopup = () => {
        const overlay = document.getElementById("overlay");
        if (overlay) overlay.style.display = "block";
    };

    const closepopup = () => {
        const overlay = document.getElementById("overlay");
        if (overlay) overlay.style.display = "none";
        setShowAddTime(false);
        setShowAI(false);
        setAIRecommendations([]);
    };

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const signout_btn = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const dashboaed_btn = () => window.location.href = "/dashboard";
    const feedback_btn = () => window.location.href = "/feedback";

    const toggleAddTime = () => { setShowAddTime(!showAddTime); setShowAI(false); };
    const toggleAI = () => { setShowAI(!showAI); setShowAddTime(false); setAIRecommendations([]); };
    const closeAddTime = () => setShowAddTime(false);
    const closeAI = () => { setShowAI(false); setAIRecommendations([]); };

    const calculateEndTime = (startTime, endTimeInput) => {
        if (!startTime || !endTimeInput) return "";
        if (endTimeInput <= startTime) return "";
        return endTimeInput;
    };

    const handleDayClick = (day) => {
        if (!day) return;
        setSelectedDay(day);
        showpopup();
        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        if (!activitiesByDate[dateKey]) fetchActivities(day);
    };

    const fetchActivities = async (day) => {
        const token = localStorage.getItem("token");
        const nickname = getNicknameFromToken();
        if (!token || !nickname || !day) return;
        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        try {
            const res = await fetch(
                `https://volcanic-lilla-unenamelled.ngrok-free.dev/schedule/load?nickname=${nickname}&date=${dateKey}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (res.ok) {
                const data = await res.json();
                setActivitiesByDate(prev => ({ ...prev, [dateKey]: data }));
            }
        } catch (err) { console.error("일정 로드 실패:", err); }
    };

    const handleAddActivity = async () => {
        const token = localStorage.getItem("token");
        const nickname = getNicknameFromToken();
        if (!token || !nickname) return alert("로그인 필요");
        if (!activityName || !activityTime || !endTime) return alert("입력값 확인 필요");

        const calculatedEndTime = calculateEndTime(activityTime, endTime);
        if (!calculatedEndTime) return alert("시간 설정 오류");

        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;

        try {
            const res = await fetch("https://volcanic-lilla-unenamelled.ngrok-free.dev/schedule/add", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    title: activityName,
                    time: activityTime,
                    endtime: calculatedEndTime,
                    nickname: String(nickname),
                    date: dateKey
                })
            });
            if (res.ok) {
                const newActivity = { title: activityName, time: activityTime, end_time: calculatedEndTime };
                setActivitiesByDate(prev => ({
                    ...prev,
                    [dateKey]: [...(prev[dateKey] || []), newActivity]
                }));
                setActivityName(""); setActivityTime(""); setEndTime(""); setShowAddTime(false);
                alert("추가되었습니다!");
            }
        } catch (err) { alert("추가 실패"); }
    };

    const handleDeleteActivity = async (index) => {
        const token = localStorage.getItem("token");
        const nickname = getNicknameFromToken();
        if (!token) return;

        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;

        setActivitiesByDate(prev => ({
            ...prev,
            [dateKey]: prev[dateKey].filter((_, idx) => idx !== index)
        }));

        try {
            await fetch(`https://volcanic-lilla-unenamelled.ngrok-free.dev/schedule/delete`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    nickname: String(nickname),
                    date: dateKey,
                    index: index
                })
            });
        } catch (err) { console.error("삭제 실패", err); }
    };

    const addAITask = () => setAITasks([...aiTasks, { title: "" }]);
    const removeAITask = (index) => { if (aiTasks.length > 1) setAITasks(aiTasks.filter((_, i) => i !== index)); };
    const updateAITask = (index, value) => { 
        const updated = [...aiTasks]; 
        updated[index].title = value; 
        setAITasks(updated); 
    };

    const handleAIRecommendation = async () => {
        if (!selectedDay) { alert("날짜를 선택해주세요!"); return; }
        const token = localStorage.getItem("token");
        const nickname = getNicknameFromToken();
        if (!token || !nickname) { alert("로그인이 필요합니다!"); return; }

        const validTasks = aiTasks.filter(task => task.title && task.title.trim() !== "");
        if (validTasks.length === 0) { alert("할 일을 입력해주세요!"); return; }

        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
        const requestData = { 
            nickname, 
            date: dateKey, 
            task: validTasks.map(t => ({ title: t.title.trim() })) 
        };

        try {
            const res = await fetch("https://volcanic-lilla-unenamelled.ngrok-free.dev/Timo/Py/ai/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body: JSON.stringify(requestData)
            });

            if (!res.ok) { alert("AI 추천 실패 (서버 오류)"); return; }

            const data = await res.json();
            const rawItems = data.scheduleItems || data.schedules || [];
            
            const mappedSchedule = rawItems.map(item => ({
                title: item.taskName || item.task_name || item.title || "제목 없음",
                time: item.startTime || item.start_time || item.time || "00:00",
                end_time: item.endTime || item.end_time || item.endtime || "00:00",
                recommend: item.reason || item.description || data.recommendation || ""
            }));

            if (mappedSchedule.length === 0) { alert("추천된 일정이 없습니다."); return; }

            setAIRecommendations(mappedSchedule);
            setAITasks([{ title: "" }]); 
        } catch (err) {
            console.error("AI 에러:", err);
            alert("네트워크 오류");
        }
    };

    const applyAISchedule = () => {
        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`;
        setActivitiesByDate(prev => ({
            ...prev,
            [dateKey]: [...(prev[dateKey] || []), ...aiRecommendations]
        }));
        setAIRecommendations([]);
        setShowAI(false);
        alert("일정이 적용되었습니다!");
    };

    const activities = selectedDay 
        ? activitiesByDate[`${year}-${String(month + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`] || [] 
        : [];

    return (
        <>
            <div className="top">
                <div className="title">
                    <img src="/Timo.png" className='Logo_img' alt="Logo" />
                    <h1>Timo</h1>
                    <p>당신의 하루를 똑똑하게 계획하세요</p>
                </div>
                <div className="btns">
                    <button className="dashboard_btn" onClick={dashboaed_btn}>대시보드</button>
                    <button className="feedback_btn" onClick={feedback_btn}>피드백</button>
                    <button className="signout_btn" onClick={signout_btn}>로그아웃</button>
                </div>
            </div>

            <div className="calendar_wrap">
                <div className="calendar-header">
                    <h2 className="calendar-title">{year}년 {month + 1}월</h2>
                </div>
                <div className="nav-btn">
                    <button onClick={prevMonth} className="nav-btn-L"><ion-icon name="chevron-back-outline"></ion-icon></button>
                    <button onClick={nextMonth} className="nav-btn-R"><ion-icon name="chevron-forward-outline"></ion-icon></button>
                </div>
                <div className="calendar-grid">
                    {["일", "월", "화", "수", "목", "금", "토"].map(d => <div key={d} className="calendar-day-header">{d}</div>)}
                    {days.map((day, index) => (
                        <button key={index} className="calendar-day" onClick={() => handleDayClick(day)}>
                            {day}
                        </button>
                    ))}

                    <div className="overlay" id="overlay" style={{ display: 'none' }}>
                        <div className="popup">
                            <button className="close-btn" onClick={closepopup}>
                                <ion-icon name="close-outline"></ion-icon>
                            </button>
                            <h2>{year}년 {month + 1}월 {selectedDay}일</h2>
                            <h3>일정</h3>

                            <div className="schedule-list">
                                {activities.length === 0 ? <p style={{ marginLeft: '35px', color: '#888' }}>일정이 없습니다.</p> :
                                    activities.map((activity, idx) => (
                                        <div key={idx} className="schedule_box">
                                            <div className="schedule_side">
                                                <div className="time_badge">{activity.time}</div>
                                                <div className="schedule_info">
                                                    <div className="activity">{activity.title}</div>
                                                    <div className="details">종료: {activity.end_time}</div>
                                                </div>
                                                <div className="delete_btn" onClick={() => handleDeleteActivity(idx)}>
                                                    <ion-icon name="trash-outline"></ion-icon>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className="button">
                                <button className="addTime_btn" onClick={toggleAddTime}>+ 시간 추가</button>
                                <button className="AI_btn" onClick={toggleAI}>AI 추천</button>
                            </div>

                            <div className="addTime" style={{ display: showAddTime ? "block" : "none" }}>
                                <div className="addTime_box">
                                    <h3>새로운 시간 추가</h3>
                                    <button className="closeBtn" onClick={closeAddTime}><ion-icon name="close-outline"></ion-icon></button>
                                </div>
                                <div className="activity_name">
                                    <h4>활동 이름</h4>
                                    <input type="text" className="activityName_box" value={activityName} onChange={(e) => setActivityName(e.target.value)} placeholder="예: 운동, 공부" />
                                </div>
                                <div className="times">
                                    <h4>시작 시간</h4>
                                    <input type="time" className="time_box" value={activityTime} onChange={(e) => setActivityTime(e.target.value)} />
                                </div>
                                <div className="End_time">
                                    <h4>종료 시간</h4>
                                    <input type="time" className="EndTime_box" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                                </div>
                                <button className="add_btn" onClick={handleAddActivity}>추가하기</button>
                            </div>

                            <div className="AI_Recommendation" style={{ display: showAI ? "block" : "none" }}>
                                <div className="addTime_box">
                                    <h3>AI 일정 추천</h3>
                                    <button className="closebtn" onClick={closeAI}><ion-icon name="close-outline"></ion-icon></button>
                                </div>
                                
                                <div className="ai-content" style={{ padding: '20px', maxHeight: '400px', overflowY: 'auto' }}>
                                    {aiRecommendations.length === 0 ? (
                                        <>
                                            {aiTasks.map((task, index) => (
                                                <div key={index} style={{ marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                                    <span style={{ fontWeight: 'bold', color: '#555', width: '20px' }}>{index + 1}.</span>
                                                    <input type="text" value={task.title} onChange={(e) => updateAITask(index, e.target.value)} placeholder="할 일 입력 (예: 영어 공부)" style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '6px' }} />
                                                    {aiTasks.length > 1 && (
                                                        <button onClick={() => removeAITask(index)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#ff6b6b', fontSize: '18px' }}>
                                                            <ion-icon name="trash-outline"></ion-icon>
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            <button onClick={addAITask} style={{ width: '100%', padding: '10px', background: '#f9f9f9', border: '1px dashed #ccc', borderRadius:'6px', cursor:'pointer', marginTop:'5px', color:'#555' }}>+ 할 일 추가</button>
                                            <button onClick={handleAIRecommendation} className="ai_add_btn" style={{ width: '100%', marginTop:'15px', background:'#f4e483', border:'none', borderRadius:'8px', fontWeight:'bold', cursor:'pointer' }}>AI 일정 생성하기</button>
                                        </>
                                    ) : (
                                        <div className="recommendation-list">
                                            {aiRecommendations.map((rec, idx) => (
                                                <div key={idx} className="schedule_box" style={{ marginBottom: '10px', border:'1px solid #eee' }}>
                                                    <div className="schedule_side" style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                                                        <div className="time_badge" style={{ 
                                                            background: '#fff', color: '#000', 
                                                            minWidth:'65px', textAlign:'center', 
                                                            marginRight:'15px', padding: '5px 0', 
                                                            borderRadius: '15px', fontWeight: 'bold', fontSize: '13px'
                                                        }}>
                                                            {rec.time}
                                                        </div>
                                                        <div className="schedule_info" style={{ flex: 1, textAlign: 'left' }}>
                                                            <div className="activity" style={{ fontWeight:'bold', fontSize:'15px', marginBottom:'3px' }}>{rec.title}</div>
                                                            <div className="details" style={{ fontSize:'12px', color:'#777' }}>종료: {rec.end_time}</div>
                                                            {rec.recommend && (
                                                                <div style={{ fontSize: '11px', color: '#555', marginTop: '5px', background: '#fffef5', padding: '6px', borderRadius:'4px' }}>
                                                                    {rec.recommend}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div style={{ marginTop: '20px', display:'flex', gap:'10px', justifyContent:'center' }}>
                                                <button onClick={applyAISchedule} className="AI_add_btn">내 일정에 적용</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Calendar;