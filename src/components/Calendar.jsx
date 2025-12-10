import { useState } from "react";
import "../Calendar.css";

function Calendar() {

    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(i);

    const prevMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1));
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
                    <button className="dashboard_btn">대시보드</button>
                    <button className="signout_btn">로그아웃</button>
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
                        <div
                            key={index}
                            className="calendar-day"
                            onClick={() => day && alert(`${year}년 ${month + 1}월 ${day}일`)}
                        >
                            {day}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Calendar