import React from "react";
import "./css/Roadmap.css";
import darkThemeContext from "../darkThemeContext";
import { useContext } from "react";

const Roadmap = () => {
  const { darkTheme } = useContext(darkThemeContext);
  return (
    <div>
      <h6 className="roadmap-title" style={{ color: darkTheme ? 'aliceblue' : '#333' }}>Roadmap</h6>
      <div class="timeline">
        <div class="container left">
          <div class="date">Jun 2020</div>
          <div class="content">
            <h2>Auxiun Concept</h2>
            <p></p>
          </div>
        </div>
        <div class="container right">
          <div class="date">Aug 2020</div>
          <div class="content">
            <h2>Team</h2>
            <p>
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>
        <div class="container left">
          <div class="date">Oct 2020</div>
          <div class="content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>
        <div class="container right">
          <div class="date">Dec 2020</div>
          <div class="content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p>
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>
        <div class="container left">
          <div class="date">Mar 2021</div>
          <div class="content">
            <h2>Collaboration with RMIT University</h2>
            <p>
              Collaborate with RMIT University to build a seamless NFT marketplace
              to allow users to buy and sell NFTs.
            </p>
          </div>
        </div>
        <div class="container right">
          <div class="date">Nov 2021</div>
          <div class="content">
            <h2>Beta Marketplace Testing</h2>
            <p>
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>

        <div class="container left">
          <div class="date">Dec 2021</div>
          <div class="content">
            <h2>Gaming Platform Integration</h2>
            <p>
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>
        <div class="container right">
          <div class="date">Nov 2021</div>
          <div class="content">
            <h2>Beta Product Testing</h2>
            <p>
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>
        <div class="container left">
          <div class="date">Jan 2022</div>
          <div class="content">
            <h2>Alpha Product Launch</h2>
            <p>
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
