import React from "react";
import { about_page } from "../../helpers/helperString";

const About = () => {
  return (
    <div>
    <div className="team">
      <h4>{about_page.ABOUT_US}</h4>
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
      <p>{about_page.ABOUT_US_DESCRIPTION}</p>
    </div>
  );
};

export default About;
