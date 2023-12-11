import {useState} from 'react'
import './reset password.css'

function ResetPassword () {
    const [,setEmail] = useState('');
    

    return (
        <>
            <div className='reset-password-container'>
                <div className="reset-password-form">
                    <a href="/login" className="back-button">
                        <i className="fas fa-arrow-left"></i>
                    </a>
                    <h1>Update your password</h1>
                    <p>Enter your email address, we will send you the recovery link</p>
                    <form action="/confirmation" method="GET">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={e => {setEmail(e.target.value)}}
                            required
                        />
                        <button type="sumbit" className="update-password">
                            Update password</button>
                    </form>

                </div>
            </div>
        </>
    )
}

export default ResetPassword;