import { useState } from "react";
import "../Login.css";

function Login() {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (!nickname || !password) {
            alert("닉네임과 비밀번호를 입력해주세요.");
            return;
        }

        try {
            const res = await fetch("https://volcanic-lilla-unenamelled.ngrok-free.dev/Timo/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nickname, password }),
            });

            if (!res.ok) throw new Error("로그인 실패");

            const data = await res.json();
            console.log("서버 응답:", data);

            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "/calendar";
            }
        } catch (err) {
            console.error(err);
            alert("로그인 실패 또는 서버 오류");
        }
    };

    return (
        <>
        <div className="entire">
            <div className="container_1">
                <div className="logo-section">
                    <div className="top_1">
                        <img src="Timo.png" width="55" height="55" />
                        <h1 className="logo-title">Timo</h1>
                    </div>
                    <p className="subtitle">로그인하여 시작하세요</p>
                </div>

                <div className="login-box">
                    <h2 className="login-header">로그인</h2>
                    <p className="login-description">당신의 계정으로 로그인하세요</p>

                    <div className="form-group">
                        <label className="form-label">닉네임</label>
                        <input type="text" className="form-input" value={nickname} onChange={(e) => setNickname(e.target.value)}/>
                    </div>

                    <div className="form-group">
                        <label className="form-label">비밀번호</label>
                        <input type="password" className="form-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <button className="login-button" onClick={handleLogin}>
                        로그인
                    </button>

                    <div className="signup-section">
                        계정이 없으신가요?
                        <a href="/register" className="signup-link">회원가입</a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Login;