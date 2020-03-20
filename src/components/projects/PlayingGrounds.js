import React from "react"

import piano from "../../assets/img/pg/css-piano.jpg"
import PGItem from "./PGItem"
// import wiggly from '../../assets/img/css-piano.PNG'
// import perlinField from '../../assets/img/css-piano.PNG'
// import audioPlayer from '../../assets/img/css-piano.PNG'
// import UnknownPleasures from '../../assets/img/css-piano.PNG'

const PlayingGrounds = () => {
  return (
    <div className="project-specific-content playing-grounds">
      <PGItem
        title={"CSS 3D Piano"}
        img={piano}
        description={"CSS Piano"}
        link={"https://maximedruart.github.io/CSS-3D-Piano/"}
      />
      <PGItem
        title={"Audio player"}
        img={piano}
        description={"CSS Piano"}
        link={"https://maximedruart.github.io/Audio-Player/"}
      />
      <PGItem
        title={"Wiggly circle"}
        img={piano}
        description={"CSS Piano"}
        link={"https://maximedruart.github.io/Wiggly-circle/"}
      />
      <PGItem
        title={"Perlin flowfield"}
        img={piano}
        description={"CSS Piano"}
        link={"https://maximedruart.github.io/Perlin-Noise-particle-flowfield/"}
      />
      {/* <PGItem
        title={"Unknown pleasures"}
        img={piano}
        description={"CSS Piano"}
        link={"https://maximedruart.github.io/Unknown-Pleasures/"}
      /> */}
    </div>
  )
}

export default PlayingGrounds
