import React from "react";
import "./css/Roadmap.css";

const Roadmap = () => {
  return (
    <div className="roadmap">
      <h3 className="roadmap-title">Roadmap</h3>
      <div class="timeline">
        <div class="container left">
          <div class="date">Jun 2020</div>
          <i class="icon fa fa-home"></i>
          <div class="content">
            <h2>Auxiun Concept</h2>
            <p className="description">Initial birth of Auxiun company</p>
          </div>
        </div>

        <div class="container right">
          <div class="date">Jul 2020</div>
          <i class="icon fa fa-gift"></i>
          <div class="content">
            <h2>Lorem ipsum dolor sit amet</h2>
            <p className="description">
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>

        <div class="container left">
          <div class="date">Apr 2021</div>
          <i class="icon fa fa-user"></i>
          <div class="content">
            <h2>Collaboration with RMIT University</h2>
            <p className="description">
              Collaborate with RMIT to create a seamless NFT marketplace
            </p>
          </div>
        </div>

        <div class="container right">
          <div class="date">Nov 2021</div>
          <i class="icon fa fa-gift"></i>
          <div class="content">
            <h2>Game Integration with Marketplace</h2>
            <p className="description">
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
              erat sagittis non. Ut blandit semper pretium.
            </p>
          </div>
        </div>

        <div class="container left">
          <div class="date">Jan 2022</div>
          <i class="icon fa fa-gift"></i>
          <div class="content">
            <h2>Beta Product Testing</h2>
            <p className="description">
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
            </p>
          </div>
        </div>

        <div class="container right">
          <div class="date">Mar 2022</div>
          <i class="icon fa fa-gift"></i>
          <div class="content">
            <h2>Alpha Product Launch</h2>
            <p className="description">
              Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
