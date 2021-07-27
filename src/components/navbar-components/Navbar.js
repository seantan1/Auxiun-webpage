import React, { useState } from 'react';
import './css/Navbar.css';
import '../../../node_modules/font-awesome/css/font-awesome.css';
import BrandLogo from '../../assets/axiun.png';
// import loadingGIF from '../../assets/loading-icon-transparent-background-12.jpg';

const Navbar = (props) => {

    // hook for nav bar css change on scroll
    const [backgroundColor, setbackgroundColor] = useState("none");
    const [fontColor, setfontColor] = useState("blue");
    const [hoverBrandImage, setHoverBrandImage] = useState(false);
    const [hoverProfileImage, setHoverProfileImage] = useState(false);
    // hide navbar if scrolling past the banner
    const [hideNavBar, setHideNavBar] = useState(false);
    const [navBarOpacity, setNavBarOpacity] = useState(1);

    // scroll event listener
    window.onscroll = function () {
        if (window.pageYOffset === 0) {
            setbackgroundColor((prevState) => prevState = "rgba(255, 255, 255, 0)")
            setfontColor((prevState) => prevState = "blue")
        }
        else {
            setbackgroundColor((prevState) => prevState = "rgba(255, 255, 255, 0.7)")
            setfontColor((prevState) => prevState = "black")
        }

        // slowly hideing navbar
        if (window.pageYOffset > 500) {
            setHideNavBar(true);
        }
        else if (window.pageYOffset > 350) {
            setNavBarOpacity((500 - window.pageYOffset) / 150);
        }
        else {
            setHideNavBar(false);
            setNavBarOpacity(1);
        }
    };
    // end of hook for nav bar css change on scroll

    return (
        <div>
            {!hideNavBar &&
                <div className="navbar" style={{ backgroundColor: backgroundColor, opacity: navBarOpacity }}>
                    <div className="navbar-inner">
                        <div className="brand-container" onMouseEnter={() => setHoverBrandImage(true)} onMouseLeave={() => setHoverBrandImage(false)} onClick={props.toggleNavlinksWindow}>
                            <div>
                                <img className="brand-image" src={BrandLogo} alt="axiun"></img>
                            </div>

                        </div>

                        <div className="nav navbar-links">
                            <a style={{ color: fontColor }} href="/">Home</a>
                            <a style={{ color: fontColor }} href="/login">Login</a>
                            <a style={{ color: fontColor }} href="/register">Register</a>
                            <a style={{ color: fontColor }} href="/info">Info</a>
                        </div>
                        <div className="profile-container" onClick={props.toggleProfileWindow}>
                            <p>My Profile</p>
                        </div>

                        <div className="connect-wallet-button-container">
                            {!props.authorised && <button className="connect-wallet-button" onClick={props.toggleWalletWindow}>Connect Wallet</button>}
                            {props.authorised && <button className="connect-wallet-button" onClick={props.toggleWalletWindow}>{props.account.substring(0, 11)}...</button>}
                        </div>
                    </div>
                </div>
            }
        </div>

    );
}

export default Navbar;
