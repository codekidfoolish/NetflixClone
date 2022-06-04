import { useNavigate } from 'react-router-dom';
import './signUp.scss'

function SignUp() {
    let navigate = useNavigate()

    return (
        <div className="signUp">
            <div className="signUp-top">
                <div className="logo-wrapper">
                    <img
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt="logo"
                    />
                </div>
                <button  onClick={() => navigate('/login')}  className="btn">Sign In</button>
            </div>
            <div className="signUp-content">
                <h1 className="title">Unlimited movies, TV shows, and more.</h1>
                <p className="desc">Watch anywhere. Cancel anytime.</p>
                <p className="question">Ready to watch? Enter your email to create or restart your membership.</p>
                <div className="box">
                    <input type="email" className="input" placeholder="Email address" />
                    <button  onClick={() => navigate('/')}  className="btn"> 
                        Get Start &gt;
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;