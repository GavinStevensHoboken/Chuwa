import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../firebase/AuthContext';
import './login.css'

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const { user, setUser } = useContext(AuthContext);


    const toggleVisibility = () => {
        setPasswordShown(!passwordShown);
    }

    useEffect(() => {
        if(user && user.vendor){
            navigate('/main_vendor');
        }else if(user){
            navigate('/main_regular');
        }
    }, [user]); // 依赖项数组，这里只有user

    const HandleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            document.cookie = `token=${data.token};path=/;max-age=2592000`;
            setUser(data.user);
        } else {
            alert('Login Failed')
        }
    };

    return (
        <>
            <div className="login-container">
                <div className="login-form">
                    <h1>Sign in to your account</h1>
                    <form onSubmit={HandleSubmit}>
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