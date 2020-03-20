import React from "react"
import PGItem from "./PGItem"

import pianoGif from "../../assets/img/pg/pianoGif.gif"
import audioPlayer from "../../assets/img/pg/audio-player.jpg"
import wiggly from "../../assets/img/pg/wiggly.JPG"
import flowfield from "../../assets/img/pg/flowfield.JPG"
// import UnknownPleasures from '../../assets/img/css-piano.PNG'

const PlayingGrounds = () => {
  return (
    <div className="project-specific-content playing-grounds">
      <PGItem
        title={"CSS 3D Piano"}
        img={pianoGif}
        description={"Piano made purely in DOM elements using CSS 3D transform properties. Play around with it !"}
        link={"https://maximedruart.github.io/CSS-3D-Piano/"}
        github={"https://github.com/MaximeDruart/CSS-3D-Piano"}
      />
      <PGItem
        title={"Audio player"}
        img={audioPlayer}
        description={
          "Audio player with customisable visualizer and playlist. This project was built with React and visualizer was built using p5.js and p5sound.js for audio analysis"
        }
        link={"https://maximedruart.github.io/Audio-Player/"}
        github={"https://github.com/MaximeDruart/Audio-Player"}
      />
      <PGItem
        title={"Wiggly circle"}
        img={wiggly}
        description={
          "The very thing that started this portfolio. This circle wiggles with simplex noise. Initially built with p5.js then rebuilt with pixi.js for performance."
        }
        link={"https://maximedruart.github.io/Wiggly-circle/"}
        github={"https://github.com/MaximeDruart/Wiggly-circle"}
      />
      <PGItem
        title={"Perlin flowfield"}
        img={flowfield}
        description={"Particles thrown around on a Perlin noise flowfield create this motion. Built with p5.js"}
        link={"https://maximedruart.github.io/Perlin-Noise-particle-flowfield/"}
        github={"https://github.com/MaximeDruart/Perlin-Noise-particle-flowfield"}
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
