import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../Register.css'

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/Lumi/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            });

            const data = await res.json();

            if (res.ok) {
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
            <img src="/Lumi_image.png" className='Logo' alt='Logo' />
            <h1>Lumi</h1>
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
                    <input type="email" value={email} className='email_box' onChange={e => setEmail(e.target.value)} id='user-email' placeholder='example@gsm.hs.kr'/>
                </div>
                <div className='ps'>
                    <p>비밀번호</p>
                    <input type="password" value={password} className='password_box' onChange={e => setPassword(e.target.value)} id='user-password' placeholder='비밀번호'/>
                </div>
            </div>
            <div className='bottom'>
                <input type="submit" value='회원가입' className='btn' />
                <p>이미 계정이 있으신가요?<a href="/login">로그인</a></p>
            </div>    
        </form> 
        <h2>회원가입 페이지</h2>
      <p>서버 연결 없이 Survey로 이동하는 버튼</p>

      {/* 버튼 클릭 시 Survey 페이지로 이동 */}
      <button
        className='btn'
        onClick={() => navigate("/survey")}
      >
        Go to Survey
      </button>

        </>
    )
}

export default Register