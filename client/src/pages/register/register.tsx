import axios from "axios";
import { FormEvent, useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router";

export default function SignupPage() {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const passwordAgain = useRef<HTMLInputElement>(null);
  const goToPage = useNavigate();

  const handleClick = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (passwordAgain.current!.value !== password.current!.value) {
      passwordAgain.current!.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current!.value,
        email: email.current!.value,
        password: password.current!.value,
      };
      try {
        await axios.post("/auth/signup", user);
        goToPage("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Social Media App</h3>
          <span className="registerDesc">Connect with friends and stuff.</span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="registerInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="registerInput"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="registerInput"
              type="password"
              minLength={8}
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="registerInput"
              type="password"
            />
            <button className="registerButton" type="submit">
              Sign Up
            </button>
          </form>
          <br />
          <button
            onClick={() => {
              goToPage("/login");
            }}
            className="registerLoginButton"
          >
            Already have an account?
          </button>
        </div>
      </div>
    </div>
  );
}
