import "./login.css";
import axios from "axios";
import { FormEvent, useRef } from "react";
import { useAuthContext } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const { setUser } = useAuthContext();
  const goToPage = useNavigate();
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const login = async (creds: { email: string; password: string }) => {
    try {
      const res = await axios.post("/auth/userlogin", creds);
      if (res.status >= 400) throw new Error("invalid resp")
      else return res.data;
    } catch (err) { 
    }
  };
  const handleClick = (e: any) => {
    e.preventDefault();
    login({
      email: email.current!.value,
      password: password.current!.value,
    }).then((res) => {
      setUser(res)
      //goToPage("/")
    }).catch(console.log);
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Media App</h3>
          <span className="loginDesc">Connect with friends and stuff.</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" >
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength={8}
              className="loginInput"
              ref={password}
            />
            <button onClick={handleClick} className="loginButton" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
