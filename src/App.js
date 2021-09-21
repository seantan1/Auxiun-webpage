import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter, Switch, Route, Redirect, useLocation } from "react-router-dom";
import "./App.css";
import detectEthereumProvider from "@metamask/detect-provider";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import { AnimatePresence } from "framer-motion";

// component imports
// global
import Navbar from "./components/navbar-components/Navbar";
import Footer from "./components/footer-components/Footer";
import NavlinksWindow from "./components/navbar-components/NavlinksWindow";
import WalletProviderWindow from "./components/navbar-components/WalletProviderWindow";
import ProfileWindow from "./components/navbar-components/ProfileWindow";
import darkThemeContext from "./components/darkThemeContext";

//image imports
import background from './assets/background.png'
import backgroundDark from './assets/background_dark.png'

// home
import HomeBanner from "./components/home-components/Banner";


// market
import MarketPlace from './components/marketplace-components/MarketPlace';

// profile
import Profile from "./components/profile-component/Profile";

import UpdateProfile from './components/profile-component/UpdateProfile';

// login
import Login from "./components/login-components/Login";


// register
import Register from "./components/register-components/Register";

// info
import Info from "./components/info-components/Info";

import Inventory from "./components/inventory-components/Inventory";

// mint token page
// import CreateTokens from "./components/createTokens-components/CreateTokens";
import CreateTokens from "./components/createTokens-component/CreateTokens";

// team 
import Team from "./components/home-components/Team";

// Announcement Page
import Announcement from "./components/home-components/Announcement";

// Media Page
import Media from "./components/home-components/Media";

import Roadmap from "./components/home-components/Roadmap";

//faq
import Faq from "./components/faq-components/Faq"

// About Page
import About from "./components/home-components/About";
//forgot password
import ForgotPassword from "./components/forgotPassword-components/ForgotPassword";

// rinkeby testnet
import {
    RINKEBY_TEST_NET_VERSION,
    RINKEBY_TEST_NET_BLOCK_EXPLORER_TX_URL,
    RINKEBY_TEST_NET_RPC_URL,
    RINKEBY_TEST_NET_DATA
} from "./contract-data/rpc-data.js";
import Sell from "./components/sell-components/Sell";
import Buy from './components/buy-components/Buy';
import Watch from "./components/watch-components/Watch";
import Home from "./components/home-components/Home";
// main net
const chainNetVersion = RINKEBY_TEST_NET_VERSION;
// net data
const chainNetData = RINKEBY_TEST_NET_DATA;
// eslint-disable-next-line
const chainBlockExplorerUrl = RINKEBY_TEST_NET_BLOCK_EXPLORER_TX_URL;


function App() {

    // load once
    const [loadOnce, setLoadOnce] = useState(false);

    // session user's email
    const [userSessionData, setUserSessionData] = useState('')
    // logOut function to remove email from localStorage
    const logOut = () => {
        localStorage.clear();
    }

    /* user's wallet account useStates
          account: user's account address 0x... or one....
          authorised: has user authorised/signed-in a wallet
      */
    const [account, setAccount] = useState("");
    const [networkValid, setNetworkValid] = useState(true);
    const handleAccount = (input_account) => {
        setAccount(input_account);
        localStorage.setItem("account", input_account);
    };
    const [authorised, setAuthorised] = useState(false);
    const handleAuthorised = (input_authorised) => {
        if (input_authorised) {
            setAuthorised(true);
            localStorage.setItem("authorised", "true");
        } else {
            setAuthorised(false);
            localStorage.setItem("authorised", "false");
        }
    };
    const [alert, setAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertLink, setAlertLink] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");

    const [refreshData, setRefreshData] = useState(false);
    const [transactionPending, setTransactionPending] = useState(false);

    const [darkTheme, setDarkTheme] = useState(false);
    const location = useLocation();

    const useStyles = makeStyles({
        darkTheme: {
            backgroundImage: darkTheme !== true ? `url(${background})` : `url(${backgroundDark})`,
            backgroundSize: '30%',
            color: darkTheme === true ? '#EBEBEB' : ''
        }
    })

    const classes = useStyles();

    // use to toggle the navlinks window
    const [navlinksWindowOpen, setNavlinksWindowOpen] = useState(false);
    const toggleNavlinksWindow = () => {
        setNavlinksWindowOpen(!navlinksWindowOpen);
    };

    // use to toggle the wallet provider window
    const [walletWindowOpen, setwalletWindowOpen] = useState(false);
    // toggle wallet provider window handler
    const toggleWalletWindow = () => {
        setwalletWindowOpen(!walletWindowOpen);
    };

    // use to toggle the profile window
    const [profileWindowOpen, setProfileWindowOpen] = useState(false);
    const toggleProfileWindow = () => {
        setProfileWindowOpen(!profileWindowOpen);
    };

    const showAlert = (title, message, link, severity) => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertLink(link);
        setAlertSeverity(severity);
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 5000);
    };

    // metamask accounts change handler
    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
        } else {
            handleAccount(accounts[0]);
        }
    };

    // metamask sign in handler
    const signInMetamask = async () => {
        const provider = await detectEthereumProvider();

        if (!provider) {
            showAlert(
                "Metamask extension not found.",
                "Install metamask",
                "https://metamask.io/",
                "error"
            );
            return;
        }

        // MetaMask events
        provider.on("accountsChanged", handleAccountsChanged);

        provider.on("disconnect", () => {
            handleAuthorised(false);
            handleAccount("");
            setNetworkValid(false);
        });

        // detect Network account change
        provider.on("chainChanged", (chainId) => {
            if (window.ethereum.networkVersion !== chainNetVersion) {
                handleAuthorised(false);
                handleAccount("");
                setNetworkValid(false);
            }
        });

        if (window.ethereum.networkVersion !== chainNetVersion) {
            setNetworkValid(false);
        }

        attemptMetamaskConnection(provider);
    };

    // metamask attempt connection function
    const attemptMetamaskConnection = (provider) => {
        provider
            .request({ method: "eth_requestAccounts" })
            .then(async (params) => {
                handleAccountsChanged(params);
                handleAuthorised(true);
                if (window.ethereum.networkVersion === chainNetVersion) {
                    setNetworkValid(true);
                }
            })
            .catch((err) => {
                handleAuthorised(false);
            });
    };

    const switchNetworks = () => {
        window.ethereum.request({ method: 'wallet_switchEthereumChain', params: chainNetData });
    }

    // attempt to fetch credentials from local storage
    useEffect(() => {
        if (!loadOnce) {
            if (
                localStorage.getItem("account") &&
                localStorage.getItem("authorised")
            ) {
                signInMetamask();
            }
            if (localStorage.getItem('darkTheme') === 'true') {
                setDarkTheme(true);
            }
            setLoadOnce(true);
        }
    });

    // useEffect to fetching user session email from localStorage
    useEffect(() => {
        // localStorage.clear()
        const storageUserSessionData = localStorage.getItem('userSessionData');
        if (storageUserSessionData) {
            const userData = JSON.parse(storageUserSessionData);
            setUserSessionData(userData);
        }
    }, [loadOnce]);

    return (
        <div className="App">
            {profileWindowOpen && (
                <ProfileWindow
                    authorised={authorised}
                    account={account}
                    toggleWindow={toggleProfileWindow}
                />
            )}
            {walletWindowOpen && (
                <WalletProviderWindow
                    toggleWindow={toggleWalletWindow}
                    signInMetamask={signInMetamask}
                />
            )}
            {navlinksWindowOpen && (
                <NavlinksWindow
                    toggleWindow={toggleNavlinksWindow}
                    toggleProfileWindow={toggleProfileWindow}
                />
            )}

            <darkThemeContext.Provider value={{ darkTheme, setDarkTheme }}>
                <div className={`${classes.darkTheme} page-content-container`}>
                    <div className="sticky-navbar">
                        <Navbar
                            authorised={authorised}
                            account={account}
                            toggleNavlinksWindow={toggleNavlinksWindow}
                            toggleWalletWindow={toggleWalletWindow}
                            toggleProfileWindow={toggleProfileWindow}
                            transactionPending={transactionPending}
                            networkValid={networkValid}
                            switchNetworks={switchNetworks}
                            logOut={logOut}
                        />
                        {alert && (
                            <Alert
                                className="tx-alert"
                                severity={alertSeverity}
                                onClose={() => setAlert(false)}
                            >
                                <AlertTitle>{alertTitle}</AlertTitle>
                                <a href={alertLink} target="_blank" rel="noreferrer">
                                    {alertMessage}
                                </a>
                            </Alert>
                        )}
                    </div>

                    {/* <BrowserRouter> */}
                        <AnimatePresence exitBeforeEnter>
                            <Switch location={location} key={location.pathname}>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                                <Route exact path='/marketplace'>
                                    <MarketPlace authorised={authorised} userSessionData={userSessionData} account={account} />
                                </Route>
                                <Route exact path="/login">
                                    <Login showAlert={showAlert} />
                                </Route>
                                <Route exact path="/register">
                                    <Register showAlert={showAlert} />
                                </Route>
                                <Route exact path="/profile">
                                    <Profile showAlert={showAlert} userSessionData={userSessionData} />
                                </Route>
                                <Route exact path="/updateprofile">
                                    <UpdateProfile showAlert={showAlert} userSessionData={userSessionData} />
                                </Route>
                                <Route exact path="/info">
                                    <Info />
                                </Route>
                                <Route exact path="/inventory">
                                    <Inventory authorised={authorised} account={account} />
                                </Route>
                                <Route exact path="/sell">
                                    <Sell showAlert={showAlert} authorised={authorised} component={Sell} account={account} />
                                </Route>
                                <Route exact path="/buy">
                                    <Buy showAlert={showAlert} authorised={authorised} component={Buy} account={account} userSessionData={userSessionData} />
                                </Route>
                                <Route exact path="/createTokens">
                                    <CreateTokens authorised={authorised} showAlert={showAlert} account={account} />
                                </Route>
                                <Route exact path="/faq">
                                    <Faq />
                                </Route>
                                <Route exact path="/watch">
                                    <Watch userSessionData={userSessionData} showAlert={showAlert} />
                                </Route>

                                <Route exact path="/forgot-password">
                                    <ForgotPassword showAlert={showAlert} />
                                </Route>
                                <Route render={() => <Redirect to={{ pathname: "/" }} />} />
                            </Switch>
                        </AnimatePresence>
                    {/* </BrowserRouter> */}
                    <Footer />
                </div>
            </darkThemeContext.Provider>
        </div>
    );
}

export default App;