import { useState } from 'react'
import './Sign up.css'

function SignUp() {
  const [setEmail] = useState('');
  const [setPassword] = useState('');
  
  return (
    <>
      <div className="sign-up-container">
        <div className="sign-up-form">
          <h1>Sign up an account</h1>
          <form action="/creatUser" method="POST" >
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              onChange={e => setEmail(e.target.value)} 
              required/>
            <div className="sign-up-password-container">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                onChange={p => setPassword(p.target.value)}
                required></input>
            </div>
            <button type="sumbit" className="sign-up-button">Create account</button>
          </form>
          <div className="sign-up-options">
              <p>Already have an account?<a href="/login">Sign in</a></p>
            </div>
        </div>
      </div>
    </>
  )
}

export default SignUp