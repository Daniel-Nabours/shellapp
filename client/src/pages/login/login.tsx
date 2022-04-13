import "./login.css";
import axios from "axios";
import { useRef } from "react";
import { useAuthContext } from "../../AuthContext"; 

function LoginPage() {
  const { setUser } = useAuthContext(); 
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const login = async (creds: { email: string; password: string }) => { 
  };
  const handleClick = (e: any) => { 
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
