import React, { useState, useEffect, useContext } from "react";
import "./css/Navbar.css";
import "../../../node_modules/font-awesome/css/font-awesome.css";
import BrandLogo from "../../assets/auxiun-logo.png";
import { withStyles } from "@material-ui/core/styles";
import darkThemeContext from "../darkThemeContext";

import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import ThreeDRotation from "@material-ui/icons/ThreeDRotation";

// Icons
import SvgIcon from "@material-ui/core/SvgIcon";
import Icon from "@material-ui/core/Icon";
import ArrowDropDownRoundedIcon from "@material-ui/icons/ArrowDropDownRounded";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import MoreHorizRoundedIcon from "@material-ui/icons/MoreHorizRounded";
import PolymerRoundedIcon from "@material-ui/icons/PolymerRounded";
import LocalMallRoundedIcon from "@material-ui/icons/LocalMallRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import DarkModeToggle from "react-dark-mode-toggle";


// import loadingGIF from '../../assets/loading-icon-transparent-background-12.jpg';

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // hook for nav bar css change on scroll
  const [backgroundColor, setbackgroundColor] = useState("none");
  const [fontColor, setfontColor] = useState("blue");
  const [hoverBrandImage, setHoverBrandImage] = useState(false);
  const [hoverProfileImage, setHoverProfileImage] = useState(false);
  // hide navbar if scrolling past the banner
  const [hideNavBar, setHideNavBar] = useState(false);
  const [navBarOpacity, setNavBarOpacity] = useState(1);

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles((theme) => ({
    root: {
      "&:focus": {
        backgroundColor: theme.palette.primary.main,
        "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
          color: theme.palette.common.white,
        },
      },
    },
  }))(MenuItem);

  // scroll event listener
  window.onscroll = function () {
    if (window.pageYOffset === 0) {
      setbackgroundColor((prevState) => (prevState = "rgba(255, 255, 255, 0)"));
      setfontColor((prevState) => (prevState = "blue"));
    } else {
      setbackgroundColor(
        (prevState) => (prevState = "rgb(242, 242, 242)")
      );
      setfontColor((prevState) => (prevState = "black"));
    }

    // slowly hideing navbar
    if (window.pageYOffset > 500) {
      setHideNavBar(true);
    } else if (window.pageYOffset > 350) {
      setNavBarOpacity((500 - window.pageYOffset) / 150);
    } else {
      setHideNavBar(false);
      setNavBarOpacity(1);
    }
  };
  // end of hook for nav bar css change on scroll

  const { setDarkTheme } = useContext(darkThemeContext);
  const { darkTheme } = useContext(darkThemeContext);

  const darkThemeToggle = () => {
    setDarkTheme(!darkTheme);
    localStorage.setItem('darkTheme', JSON.parse(!darkTheme));
  }

  return (
    <div>
      {!hideNavBar && (
        <div
          className="navbar"
          style={{ backgroundColor: backgroundColor, opacity: navBarOpacity }}
        >
          <div className="navbar-inner">
            <div
              className="brand-container"
              onMouseEnter={() => setHoverBrandImage(true)}
              onMouseLeave={() => setHoverBrandImage(false)}
              onClick={props.toggleNavlinksWindow}
            >
              <div>
                {/* <a href="/"> */}
                <img className="brand-image" src={BrandLogo} alt="axiun"></img>
                {/* </a> */}
              </div>
            </div>

            <div className={darkTheme ? "nav navbar-links-dark title" : "nav navbar-links title"}>
              <a className={darkTheme ? "nav-title-dark" : "nav-title"} href="/about">
                About
              </a>
              <a className={darkTheme ? "nav-title-dark" : "nav-title"} href="/marketplace">
                Marketplace
              </a>
              <a className={darkTheme ? "nav-title-dark" : "nav-title"} href="/faq">
                FAQs
              </a>
            </div>

            <DarkModeToggle
              onChange={darkThemeToggle}
              checked={darkTheme}
              size={50}
              className={
                localStorage.userSessionData ?
                  'toggle_logged_in' : 'toggle_logged_out'}
            />

            <div className="connect-wallet-button-container">
              {localStorage.userSessionData &&
                <div>
                  {
                    props.authorised ?
                      <div>
                        {
                          props.networkValid ?
                            <button className="connect-wallet-button" onClick={props.toggleWalletWindow}>{props.account.substring(0, 11)}...</button>
                            :
                            <button className="connect-wallet-button" onClick={props.switchNetworks}>Switch to Rinkeby Network</button>
                        }
                      </div>
                      :
                      <button className="connect-wallet-button" onClick={props.toggleWalletWindow}>Connect Wallet</button>
                  }
                </div>
              }

              <Button
                aria-controls="customized-menu"
                aria-haspopup="true"
                // variant="contained"
                onClick={handleClick}
              >
                <MoreHorizRoundedIcon className="horiz-icon" />
              </Button>

              <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {localStorage.userSessionData ?
                  <a className="dot-links" href="/profile">
                    <StyledMenuItem>
                      <ListItemIcon>
                        <PersonRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </StyledMenuItem>
                  </a> : null}
                {localStorage.userSessionData ?
                  <a className="dot-links" href="/inventory">
                    <StyledMenuItem>
                      <ListItemIcon>
                        <LocalMallRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Inventory" />
                    </StyledMenuItem>
                  </a> : null}
                {localStorage.userSessionData ?
                  <a className="dot-links" href="/">
                    <StyledMenuItem>
                      <ListItemIcon>
                        <FavoriteRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Wishlist" />
                    </StyledMenuItem>
                  </a> : null}
                {!localStorage.userSessionData ?
                  <a className="dot-links" href="/login">
                    <StyledMenuItem>
                      <ListItemIcon>
                        <ExitToAppRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="Login/Register" />
                    </StyledMenuItem>
                  </a> : null}
                {localStorage.userSessionData ?
                  <a className="dot-links" href="/" onClick={props.logOut}>
                    <StyledMenuItem>
                      <ListItemIcon>
                        <ExitToAppRoundedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Logout"
                        classes={{ primary: "logoutButton" }}
                      />
                    </StyledMenuItem>
                  </a> : null}

                <hr />

                <h4 className="admin-title">ADMIN PORTAL</h4>

                <a className="dot-links" href="/createTokens">
                  <StyledMenuItem>
                    <ListItemIcon>
                      <AddCircleOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Create Tokens" />
                  </StyledMenuItem>
                </a>
              </StyledMenu>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
