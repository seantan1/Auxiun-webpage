import React from "react";
import { useContext } from "react";
import "./css/About.css";
import BlockchainImage from "../../assets/blockchain.svg";
import darkThemeContext from "../darkThemeContext";

 const About = () => {
  const { darkTheme } = useContext(darkThemeContext);
  return (
    <div>
      <div className="about-banner">
          <div id="page-name-bar-heading">
            <p className="about-banner-title">About Us</p>
            <p className="about-banner-title1" style={{color: darkTheme ? 'aliceblue' : '#333333' }}>A LITTLE SOMETHING ABOUT US</p>
          </div>
          <div className="about-banner-text" style={{color: darkTheme ? 'aliceblue' : '#999999'}}>
          Montreal-based start-up working to revolutionise in-game transactions
          and wealth focusing on in-game economics and media ownership. We work
          on integrating our in-house technology to incorporate blockchain
          non-fungible tokens (NFTs) to allow users to own digital assets
          through Public and Private blockchains.
        </div>
      </div>
    </div>
  );
};

export default About;
