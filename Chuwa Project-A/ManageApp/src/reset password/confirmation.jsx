import './confirmation.css'

function Confirmation () {

    return (
        <>
            <div className="confirmation-container">
                <div className="confirmation">
                    <a href="/login">
                        <i id="close-icon" className="fa fa-times"></i>
                    </a>
                    <i id="email-icon" className="fa fa-envelope"></i>
                    <p><b>We have sent the update password link to your email, please check!</b></p>
                </div>
            </div>
        </>
    )
}

export default Confirmation;