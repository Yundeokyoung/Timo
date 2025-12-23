import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../Register.css'

function Register() {
    const [name, setName] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(
                "https://2bf2c0bdb4ab.ngrok-free.app/Lumi/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "ngrok-skip-browser-warning": "true"
                    },
                    body: JSON.stringify({
                        name,
                        nickname,
                        password
                    }),
                }
            );

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
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
                <h1>Timo</h1>
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
                        <input type='email' value={name} className='name_box' onChange={e => setName(e.target.value)} id='user-name' placeholder='홍길동' />
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
                </div>
            </form>

            <h2>메인서버 페이지</h2>
            <p>서버 연결 없이 메인 페이지로 이동하는 버튼</p>
            <button className='btn' onClick={() => navigate("/Survey")}>
                Go to Survey
            </button>
            <h2>메인서버 페이지</h2>
            <p>서버 연결 없이 메인 페이지로 이동하는 버튼</p>
            <button className='btn' onClick={() => navigate("/Calendar")}>
                Go to Calendar
            </button>
        </>
    )
}

export default Register