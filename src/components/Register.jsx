import { useState } from 'react'
import '../Register.css'

function Register() {
    const [count, setCount] = useState(0)

    return (
        <>
        <div className='top'>
            <img src="/Lumi_image.png" className='Logo' alt='Logo' />
            <h1>Lumi</h1>
            <p>새 계정을 만들어 시작하세요</p>
        </div>
        <div className='container_box'>
            <div className='main'>
                <h4>회원가입</h4>
                <p>계정을 생성하여 시간 관리를 시작하세요</p>
                <div className='name'>
                    <p>이름</p>
                    <input type='text' className='name_box' id='user-name' placeholder='홍길동' />
                </div>
                <div className='email'>
                    <p>이메일</p>
                    <input type="email" className='email_box' id='user-email' placeholder='example@gsm.hs.kr'/>
                </div>
                <div className='ps'>
                    <p>비밀번호</p>
                    <input type="password" className='password_box' id='user-password' placeholder='비밀번호'/>
                </div>
                <div className='check_ps'>
                    <p>비밀번호 확인</p>
                    <input type="password" className='password_box' id='check-user-password' placeholder='비밀번호 재확인'/>
                </div>
            </div>
            <div className='bottom'>
                <input type="submit" value='회원가입' className='btn' />
                <p>이미 계정이 있으신가요?<a href="">로그인</a></p>
            </div>    
        </div> 
        </>
    )
}

export default Register