import { Link } from "react-router-dom";
import "./css/Navbar.css";
import Dropdown from "./Dropdown";

import React, { useState, useEffect, useContext } from "react";
// import "./css/Navbar.css";
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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

// import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DarkModeToggle from "react-dark-mode-toggle";

import Button from "@material-ui/core/Button";

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

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleHorizClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const { setDarkTheme } = useContext(darkThemeContext);
  const { darkTheme } = useContext(darkThemeContext);

  const darkThemeToggle = () => {
    setDarkTheme(!darkTheme);
    localStorage.setItem("darkTheme", JSON.parse(!darkTheme));
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Auxiun
          {/* <img className="brand-image" src={BrandLogo} alt="axiun"></img> */}
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>

        {/* hamburger menu when resizing */}
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <div className="display-in-mobileView">
            {!localStorage.userSessionData ? (
              <Link className="nav-links" to="/login" onClick={closeMobileMenu}>
                Login/Register
              </Link>
            ) : null}
          </div>

          <li className="nav-item">
            <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
              About
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to="/marketplace"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Marketplace
            </Link>
          </li>

          {/* code to check if they're signed in */}
          {/* {localStorage.userSessionData ? (
           ) : null} */}
          {localStorage.userSessionData ? (
            <li
              className="nav-item"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <Link
                to="/profile"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Profile <i className="fas fa-caret-down" />
              </Link>
              {dropdown && <Dropdown />}
            </li>
          ) : null}

          <li className="nav-item">
            <Link to="/faq" className="nav-links" onClick={closeMobileMenu}>
              FAQs
            </Link>
          </li>

          <div className="display-in-mobileView">
            {localStorage.userSessionData ? (
              <a className="nav-links" href="/" onClick={props.logOut}>
                Logout
              </a>
            ) : null}
          </div>
          
          {/* Only admins should be able to see this */}
          <div className="display-in-mobileView">
          <li className="nav-item">
            <Link to="/createTokens" className="nav-links" onClick={closeMobileMenu}>
              Create Tokens & Add Admin Wallet
            </Link>
          </li>
          </div>
        </ul>

        <button
          className="connect-wallet-button"
          onClick={props.toggleWalletWindow}
        >
          Connect Wallet
        </button>

        <DarkModeToggle
          onChange={darkThemeToggle}
          checked={darkTheme}
          size={50}
          className={
            localStorage.userSessionData
              ? "toggle_logged_in"
              : "toggle_logged_out"
          }
        />

          <div className="hide-in-mobileView"> 
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          onClick={handleHorizClick}
        >
          <MoreHorizRoundedIcon className="horiz-icon" />
        </Button>
        </div>

        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {!localStorage.userSessionData ? (
            <a className="dot-links" href="/login">
              <StyledMenuItem>
                <ListItemIcon>
                  <ExitToAppRoundedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Login/Register" />
              </StyledMenuItem>
            </a>
          ) : null}
          {localStorage.userSessionData ? (
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
            </a>
          ) : null}

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
      </nav>
    </>
  );
};

export default Navbar;
