import React from "react";
import "./css/About.css";
import BlockchainImage from "../../assets/blockchain.svg";

const About = () => {
  return (
    <div>
      <div className="about-banner">
        <div className="blockchain-banner-image">
        <h5 className="about-banner-title">About Us</h5>

          <img
            className="brand-image"
            src={BlockchainImage}
            style={{ height: 250, width: 300 }}
          />
        </div>
        <h5 className="about-banner-text">
          Montreal-based start-up working to revolutionise in-game transactions
          and wealth focusing on in-game economics and media ownership. We work
          on integrating our in-house technology to incorporate blockchain
          non-fungible tokens (NFTs) to allow users to own digital assets
          through Public and Private blockchains.
        </h5>
      </div>
    </div>
  );
};

export default About;
