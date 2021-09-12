import "./css/Team.css";

import React, { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

const Team = () => {
  useEffect(() => {
    AOS.init({
      offset: 500,
      duration: 1000,
      easing: "ease",
    });
  });
  return (
    <div class="team-section" id="team" data-aos="fade-left">
      <p className="team-section">Meet Our Team</p>

      <div class="inner-width">
        <div class="pers">
          <div class="pe">
            <img src="http://auxiun.com/aws.jpg" />
            <div class="p-name">Aws Al-Hasani Pl. Fin</div>
            <div class="p-des">CEO & Co Founder</div>
          </div>

          <div class="pe">
            <img src="http://auxiun.com/tito.jpg" />
            <div class="p-name">Jose Armando Peixoto</div>
            <div class="p-des">CPO & Co-Founder</div>
          </div>

          <div class="pe">
            <img src="http://auxiun.com/vvv.jpg" />
            <div class="p-name">Varthini Bhaskaran</div>
            <div class="p-des">CTO & Co-Founder</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
