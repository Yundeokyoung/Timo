import { useState } from "react";
import "../Dashboard.css";

function dashboard() {

    const calendar_btn = () => {
        window.location.href = "/calendar";
    }
    const signout_btn = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <>
        <div className="entire_1">
            <div className="header">
                <div>
                    <h2>루틴 리포트</h2>
                    <small>당신의 주간 활동 분석</small>
                </div>
                <div className="header-buttons">
                    <button onClick={calendar_btn}>달력으로 돌아가기</button>
                    <button onClick={signout_btn}>로그아웃</button>
                </div>
            </div>

            <div className="container_2">
                <div className="left">
                    <div className="box">
                        <h4>주간 공부 시간</h4>
                        <small>지난 7일간의 학습 시간 통계</small>
                    </div>
                    <div className="smallbox">
                        <h4>통계</h4>
                        <div className="stats-container">
                            <div className="moresmallbox">
                                <small>총 학습 시간</small>
                            </div>
                            <div className="moresmallbox">
                                <small>기록된 날짜</small>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right"></div>
            </div>
        </div>
        </>
    )
}

export default dashboard;