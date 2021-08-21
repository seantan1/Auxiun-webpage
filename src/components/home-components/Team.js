import React from "react";
import "./css/Team.css";
import TeamImage from "../../assets/TeamImage.svg";

const Team = () => {
  return (
    <div>
      <div className="team-banner">
        <div className="team-banner-image">
          <h5 className="image-title">Meet Our Team</h5>
          <img src={TeamImage} style={{ height: 250, width: 300 }} />
        </div>
        <h5 className="team-banner-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          fringilla est ut dolor convallis bibendum. Etiam tempor, sapien sit
          amet congue sollicitudin, nunc nisl rhoncus dolor, nec volutpat dolor
          nisl sed nisi. Vestibulum sed velit ut ante pharetra tempor eget vitae
          elit. Quisque tempor lacus nisi, ac tempor mauris feugiat id. Nullam
          quis feugiat felis. Nulla luctus pretium elementum. Donec ac ante ut
          nibh tristique gravida. Nunc sit amet leo ac turpis dignissim
          pharetra. Donec sit amet tortor venenatis, ultricies ligula sed,
          hendrerit nisi. Nulla faucibus diam non nulla rutrum semper. Nunc
          congue consequat tortor nec viverra. Proin magna quam, laoreet eu
          risus ac, laoreet euismod ante. Nulla nec nisi ultricies quam
          ullamcorper sollicitudin. Phasellus elementum eros et nulla viverra
          efficitur. Aenean sodales, neque ut feugiat auctor, risus nulla mattis
          nisl, eget varius odio arcu eu massa. Ut aliquam imperdiet lacus a
          lobortis. Curabitur scelerisque tortor eget pretium porta. Aliquam
          convallis, libero et ornare suscipit, nunc ex sagittis odio, vel
          volutpat dui augue at libero. Donec sollicitudin dignissim laoreet.
          Integer hendrerit eleifend tellus, et tincidunt urna egestas nec.
        </h5>
      </div>
    </div>
  );
};

export default Team;
