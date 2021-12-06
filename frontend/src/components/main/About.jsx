import React from "react";
import { about_page } from "../../helpers/helperString";

const About = () => {
  return (
    <div>

    <h4>{about_page.ABOUT_US}</h4>
    <div className="team">
      <img
            src="Aakash.jpg"
            alt="aakash"
            width="200"
            height="225"
      ></img>
      <img
            src="raghav.jpg"
            alt="raghav"
            width="200"
            height="225"
      ></img>
      <img
            src="venkatesh.jpg"
            alt="venkatesh"
            width="200"
            height="225"
      ></img>
    </div>
      <p className="about">{about_page.ABOUT_US_DESCRIPTION}</p>
    </div>
  );
};

export default About;
