import './navbar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBell, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

    let navigate = useNavigate()

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null)
    }

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="navbar-left">
                <div className="logo-wrapper">
                    <img
                        onClick={() => navigate('/')}
                        className="logo"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
                        alt="logo"
                    />
                </div>
                <div className="navbar-list">
                    <span  onClick={() => navigate('/')}
                           className="navbar-item">Home</span>
                    <span className="navbar-item">Series</span>
                    <span className="navbar-item">Movies</span>
                    <span className="navbar-item">New and Popular</span>
                    <span className="navbar-item">My List</span>
                </div>
            </div>
            <div className="navbar-right">
                <FontAwesomeIcon className="icon" icon={faSearch} />
                <span className="userName">QUAN</span>
                <FontAwesomeIcon className="icon" icon={faBell} />
                <div className="userAvatar">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfUJCkVJt3uVxk_qsNX8NtcebpjtNT-XrDOg&usqp=CAU" alt="avatar"
                        className="avatar" />
                </div>
                <div className="subnav-icon">
                    <FontAwesomeIcon className="icon" icon={faAngleDown} />
                    <div className="options">
                        <span>Settings</span>
                        <span onClick={() => navigate('/login')} >Logout</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;