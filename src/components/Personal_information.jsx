import '../Personal_information.css';

function Personal_information({ onClose }) {
    return (
        <>
        <div className="entire_2">
            <div className="term_common">
                <div className="title">
                    <h1>개인정보처리방침</h1>
                </div>
                <div className="section">
                    <h1>Timo는 개인정보보호법 등 관련법령상의 개인정보보호 규정을 준수하며, 개인정보처리방침은 아래와 같습니다.
이 개인정보처리방침은 시행일로부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.</h1>
                    <h3>1조. 개인정보의 처리 목적</h3>
                    <p>개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적이외의 용도로는 사용되지 않으며 이용 목적이 변경될 시에는 사전 동의를 구할 예정입니다.</p>
                    <div className="inner">
                        <ul>
                            <li>서비스 사용자의 식별을 위하여 개인정보를 처리합니다.</li>
                        </ul>
                    </div>
                    <h3>2조. 개인정보 처리 및 보유기간</h3>
                    <div className="inner">
                        <ul>
                            <li>사용자의 이메일과 비밀번호를 식별을 위해 사용합니다. 그리고 그 개인정보는 최대 1년간 저장됩니다.</li>
                        </ul>
                    </div>
                    <h3>3조. 정보주체 권리․의무 및 그 행사방법에 관한 사항</h3>
                    <div className="inner">
                        <ul>
                            <li>이용자는 개인정보주체로서 다음과 같은 권리를 행사할 수 있습니다.첫째 아무것도 할 수 없습니다.</li>
                        </ul>
                    </div>
                    <h3>4조. 처리하는 개인정보 항목</h3>
                    <div className="inner">
                        <ul>
                            <li>가. 필수 항목 : 이메일과 비밀번호</li>
                            <li>나: 선택 항목 : 이름</li>
                        </ul>
                    </div>
                    <h3>5조. 개인정보 파기 절차 및 방법</h3>
                    <div className="inner">
                        <ul>
                            <li>현재 파기 절차 및 방법이 존재하지 않습니다.</li>
                        </ul>
                    </div>
                    <h3>6조. 개인정보 안전성 확보 조치</h3>
                    <div className="inner">
                        <ul>
                            <li>개인정보는 최준영(DB 관리자)만 접근합니다.</li>
                            <li>비밀번호는 암호화 되어 저장됩니다.</li>
                            <li>개인정보가 저장되어있는 DB에 접근할 수  있는 노트북은 해당 개발자(최준영)가 직접 들고 다닙니다.</li>
                        </ul>
                    </div>
                    <h3>7조. 권익침해 구제방법</h3>
                    <div className="inner">
                        <ul>
                            <li>개인정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보 보호 담당자 또는 한국인터넷진흥원 개인정보침해 신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다.</li>
                            <li>※ 개인정보 보호 담당자 : 010 8357 2031</li>
                            <li>※ 개인정보 침해신고 센터 : 국번없이 118번</li>
                        </ul>
                    </div>
                    <h3>8조. 개인정보보호 (분야별)책임관 및 담당자 연락처</h3>
                    <div className="inner">
                        <ul>
                            <li>가. 개인정보 보호 (분야별)책임관 :    전산실       이 름 최준영</li>
                            <li>나. 담당자 이  름 : 최준영</li>
                            <li>연락처 : 010 8357 2031               메  일 : s25035@gsm.hs.kr</li>
                        </ul>
                    </div>
                    <h3>9조. 개인정보처리방침 변경</h3>
                    <div className="inner">
                        <ul>
                            <li>‣ 이 개인정보처리방침은 2025. 12. 24부터 적용됩니다.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Personal_information