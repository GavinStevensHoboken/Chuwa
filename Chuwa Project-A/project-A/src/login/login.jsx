import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './login.css'

function Login() {
  const navigate = useNavigate(); 
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);

  useEffect(() => {
    console.log("Component did mount");
  }, []);

  const toggleVisibility = () => {
    setPasswordShown(!passwordShown);
  }

  const HandleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://10.0.0.42:5000/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(email, password)
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
      document.cookie = "token=" + token + ";path=/";
      navigate('/main'); 
    } else {
      alert('Login Failed')
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h1>Sign in to your account</h1>
          <form onSubmit={HandleSubmit} >
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
            <button type="submit" className="sign-in-button">Sign In</button>
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