import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import validator from 'validator'
import './SignUp.css'

function SignUp() {

    useEffect(() => {
        console.log("Component did mount");
    }, []);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const validate = () => {
        let tempErrors = {email: '', password: ''};
        if (!email) {
            tempErrors.email = 'Email is required';
        } else if (!validator.isEmail(email)) {
            tempErrors.email = 'Invalid email';
        }

        if (!password) {
            tempErrors.password = 'Password is required';
        } else if (password.length < 8) {
            tempErrors.password = 'Password must be at least 8 characters';
        } else if (!/[A-Z]/.test(password)) {
            tempErrors.password = 'Password must contain at least one uppercase letter';
        } else if (!/[a-z]/.test(password)) {
            tempErrors.password = 'Password must contain at least one lowercase letter';
        } else if (!/[0-9]/.test(password)) {
            tempErrors.password = 'Password must contain at least one digit';
        }

        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const HandleSubmit = async (event) => {
        event.preventDefault();
        const selectedRole = document.querySelector('input[name="role"]:checked').value;
        const isVendor = selectedRole == "vendor";
        if (validate()) {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                body: JSON.stringify({email, password, isVendor}),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                navigate('/login');
            } else {
                alert('Creation Failed')
            }
        }
    };

    return (
        <>
            <div className="sign-up-container">
                <div className="sign-up-form">
                    <h1>Sign up an account</h1>
                    <form onSubmit={HandleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            onChange={e => setEmail(e.target.value)}
                            required/>
                        {errors.email && <div className="error">{errors.email}</div>}
                        <div className="sign-up-password-container">
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                id="password"
                                onChange={p => setPassword(p.target.value)}
                                required
                            />
                            {errors.password && <div className="error">{errors.password}</div>}
                        </div>
                        <p>Choose your role:</p>
                        <div className="radio-group">
                            <label>
                                <input type="radio" id="user" name="role" value="user" defaultChecked /> I am a regular user
                            </label>
                            <label>
                                <input type="radio" id="vendor" name="role" value="vendor" /> I am a vendor
                            </label>
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