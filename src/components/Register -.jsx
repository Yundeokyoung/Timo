import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../Register_1.css'

function Register_1() {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [authCode, setAuthCode] = useState("");
    const [step, setStep] = useState(1);
    const [isPrivacyOpened, setIsPrivacyOpened] = useState(false);
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
    const [isEmailVerify, setIsEmailVerify] = useState(false);
    

    const navigate = useNavigate();

    const personal_informationBtn = () => {
        setIsPrivacyOpened(true);
        window.open('/personal_information', '_blank');
    };

    const LoginBtn = () => {
        window.location.href = '/'
    }

    const sendAuthMail = async () => {
        if (!email.trim()) {
            alert("이메일을 입력해주세요.");
            return;
        }

        try {
            const res = await fetch(`https://volcanic-lilla-unenamelled.ngrok-free.dev/Timo/auth/email/send?email=${encodeURIComponent(email)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                }
            });

            if (!res.ok) {
                alert("인증 이메일 전송 실패");
                return;
            }

            alert("인증 이메일이 발송되었습니다!");
            setStep(2);
        } catch (err) {
            console.error(err);
            alert("서버 연결 오류");
        }
    };

    const verifyAuthCode = async () => {

        if (!authCode.trim()) {
            alert("인증 코드를 입력해주세요.");
            return;
        }

        try {
            const res = await fetch(`https://volcanic-lilla-unenamelled.ngrok-free.dev/Timo/auth/email/verify?email=${encodeURIComponent(email)}&code=${encodeURIComponent(authCode)}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true"
                },
                body: JSON.stringify({
                    email,
                    authCode
                })
            });

            if (!res.ok) {
                alert("인증 코드가 올바르지 않습니다.");
                return;
            }

            alert("이메일 인증 성공!");
            setIsEmailVerify(true);
            setStep(3);
        } catch (err) {
            console.error(err);
            alert("서버 오류");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isEmailVerify) {
            alert("이메일 인증을 먼저 완료해주세요.");
            return;
        }

        if (!isPrivacyChecked) {
            alert("개인정보처리방침에 동의해주세요.");
            return;
        }


        try {
            const res = await fetch(
                "https://volcanic-lilla-unenamelled.ngrok-free.dev/Timo/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true"
                    },
                    body: JSON.stringify({
                        name,
                        nickname,
                        password,
                        email
                    }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("nickname", nickname);
                localStorage.setItem("email", email);
                navigate("/survey");
            } else {
                alert("회원가입 실패: " + data.message);
            }
        } catch (error) {
            console.error(error);
            alert("서버 연결 실패");
        }
    };

    return (
        <>
            <div className='top'>
                <img src="/Timo.png" className='Logo' alt='Logo' />
                <h1 onClick={LoginBtn}>Timo</h1>
                <p>새 계정을 만들어 시작하세요</p>
            </div>
            <form className='container_box' onSubmit={handleSubmit}>
                <div className='main'>
                    <h4>회원가입</h4>
                    <p>계정을 생성하여 시간 관리를 시작하세요</p>
                    <div className='name'>
                        <p>이름</p>
                        <input type='text' value={name} className='name_box' onChange={e => setName(e.target.value)} id='user-name' placeholder='홍길동' />
                    </div>
                    <div className='email'>
                        <p>이메일</p>
                        <input type='email' value={email} className='email_box' onChange={e => setEmail(e.target.value)} />
                        {step === 1 && (
                            <button type="button" onClick={sendAuthMail} className='btn'>
                                인증 이메일 보내기
                            </button>
                        )}
                        {step === 2 && (
                            <>
                                <input type="text" className='email_box' value={authCode} onChange={e => setAuthCode(e.target.value)} placeholder="인증 코드 입력" />
                                <button type="button" onClick={verifyAuthCode} className='btn'>
                                    인증 확인
                                </button>
                            </>
                        )}
                    </div>
                    <div className='nickname'>
                        <p>닉네임</p>
                        <input type="text" value={nickname} className='nickname_box' onChange={e => setNickname(e.target.value)} id='user-nickname' placeholder='닉네임을 적어주세요.' />
                    </div>
                    <div className='ps'>
                        <p>비밀번호</p>
                        <input type="password" value={password} className='password_box' onChange={e => setPassword(e.target.value)} id='user-password' placeholder='비밀번호' />
                    </div>
                </div>
                <div className='bottom'>
                    <input type="submit" value='회원가입' className='btn' />
                    <p>이미 계정이 있으신가요? <a href='/'>로그인</a></p>
                    <input type="checkbox" className="checkbox" disabled={!isPrivacyOpened} checked={isPrivacyChecked} onChange={e => setIsPrivacyChecked(e.target.checked)} />
                    <a>개인정보 동의란</a>
                    <a onClick={personal_informationBtn} className='personal_information'>보기</a>
                </div>
            </form>
        </>
    )
}

export default Register_1;