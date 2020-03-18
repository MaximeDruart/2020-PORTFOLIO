import React from "react"

import piano from "../../assets/img/pg/css-piano.jpg"
// import wiggly from '../../assets/img/css-piano.PNG'
// import exitTheMatrix from '../../assets/img/css-piano.PNG'
// import perlinField from '../../assets/img/css-piano.PNG'
// import perlinField from '../../assets/img/css-piano.PNG'

const PlayingGrounds = () => {
  return (
    <div className="project-specific-content playing-grounds">
      <div className="playground-item">
        <div className="left">
          <div className="img-container">
            <img src={piano} alt="" />
          </div>
        </div>
        <div className="right">
          <div className="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat dolorem explicabo facere accusantium
            perspiciatis ad, porro ratione modi asperiores illum veritatis commodi fuga! Voluptatum, inventore repellat
            accusantium voluptatibus ipsum tempora.
          </div>
          <a href="#" className="link">
            Visit site
          </a>
        </div>
      </div>
      <div className="playground-item"></div>
      <div className="playground-item"></div>
    </div>
  )
}

export default PlayingGrounds
