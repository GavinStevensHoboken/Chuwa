import {useState} from 'react'
import './login.css'

function Login() {
    const [,setEmail] = useState('');
    const [,setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);

  const toggleVisibility = () => {
    setPasswordShown(!passwordShown);
  }

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1>Sign in to your account</h1>
          <form action="/login" method="POST" >
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              onChange={e => setEmail(e.target.value)} 
              required/>
            <div className="password-container">
              <label htmlFor="password">Password</label>
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                name="password"
                onChange={e => setPassword(e.target.value)}
                required></input>
              <button type="button" onClick={toggleVisibility}>Show</button>
            </div>
            <button type="sumbit" className="sign-in-button">Sign In</button>
          </form>
          <div className="options">
              <p>Don&apos;t have an account?<a href="/signup">Sign Up</a></p>
              <a href="/resetPassword">Forget password?</a>
            </div>
        </div>
      </div>
    </>
  )
}

export default Login;