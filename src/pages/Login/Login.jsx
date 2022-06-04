import { useNavigate } from 'react-router-dom';
import './login.scss'

function Login() {
    let navigate = useNavigate()

    return (
        <div className="Login">
            <div className="login-top">
                <div className="logo-wrapper">
                    <img
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt="logo"
                    />
                </div>
            </div>
            <div className="login-content">
                <div className="modal">
                    <h1>Sign In</h1>
                    <div className="modal-top">
                        <input type="email" placeholder='Email or phone number' className="input" />
                        <input type="password" placeholder='Password' className="input" />
                        <button onClick={() => navigate('/')} className="btn">Sign In</button>
                        <div className="helping">
                            <div>
                                <input type="checkbox" id="remember" className="input-check" />
                                <label htmlFor="remember" className="label">Remember me</label>
                            </div>
                            <span className="help">Need help?</span>
                        </div>
                    </div>
                    <div className="modal-bottom">
                        <p className='question'>New to Netflix?
                            <span  onClick={() => navigate('/signup')}  className="highlight">Sign up now.</span>
                        </p>
                        <p className="desc">
                            This page is protected by Google reCAPTCHA to ensure you're not a bot.
                            <span className="desc-highlight">Learn more.</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;