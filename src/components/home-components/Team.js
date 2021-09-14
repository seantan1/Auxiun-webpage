import React from "react";
import "./css/Team.css";
import { useEffect, useContext } from "react";
import TeamImage from "../../assets/TeamImage.svg";
import darkThemeContext from "../darkThemeContext";

// Scrolling Animation
import AOS from "aos";
import "aos/dist/aos.css";

const Team = () => {
  useEffect(() => {
    AOS.init();
  });
  const { darkTheme } = useContext(darkThemeContext);
  return (
    <div class="team-section" id="team" data-aos="fade-left"
    style={{color: darkTheme ? 'aliceblue' : '#333333' }}>
      <p className="team-section">Meet Our Team</p>

      <div class="inner-width">
        <div class="pers">
          <div class={darkTheme ? 'pe_dark' : "pe"}>
            <img src="http://auxiun.com/aws.jpg" />
            <div class="p-name" >Aws Al-Hasani Pl. Fin</div>
            <div class="p-des">CEO & Co Founder</div>
          </div>

          <div class={darkTheme ? 'pe_dark' : "pe"}>
            <img src="http://auxiun.com/tito.jpg" />
            <div class="p-name" >Jose Armando Peixoto</div>
            <div class="p-des">CPO & Co-Founder</div>
          </div>

          <div class={darkTheme ? 'pe_dark' : "pe"}>
            <img src="http://auxiun.com/vvv.jpg" />
            <div class="p-name" >Varthini Bhaskaran</div>
            <div class="p-des">CTO & Co-Founder</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
