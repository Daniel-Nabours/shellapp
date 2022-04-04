import './login.css'
import axios from 'axios'
import { FormEvent } from 'react'


function Login() {


  const login = async () => {
    axios.get("/auth/login").then(res => {
      return res.data  
    })
  }

  const handleClick = (e:FormEvent<HTMLFormElement>) => {
    
  }
  return (<div className="login">
  <div className="loginWrapper">
    <div className="loginLeft">
      <h3 className="loginLogo">Social Media App</h3>
      <span className="loginDesc">
        Connect with friends and stuff.
      </span>
    </div>
    <div className="loginRight">
      <form className="loginBox" onSubmit={handleClick}>
        <input placeholder="Email" type="email" required className="loginInput"/>
        <input placeholder="Password" type="password" required minLength={8} className="loginInput"/>
        <button className="loginButton" type="submit"> 
          Log In
        </button> 
      </form>
    </div>
  </div>
</div>)
}