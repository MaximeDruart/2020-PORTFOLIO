import React from "react"
import PGItem from "./PGItem"

import njs from "../../assets/img/njs/njs-home.jpg"
import pianoGif from "../../assets/img/pg/pianoGif.gif"
import labyrinth from "../../assets/img/lab/lab-home.jpg"
import audioPlayer from "../../assets/img/pg/audio-player.jpg"
import wiggly from "../../assets/img/pg/wiggly.JPG"
import flowfield from "../../assets/img/pg/flowfield.JPG"
// import UnknownPleasures from '../../assets/img/css-piano.PNG'

const PlayingGrounds = () => {
  return (
    <div className="project-specific-content playing-grounds">
      <PGItem
        title={"Ninjavascript"}
        img={njs}
        description={
          "As a school project, we had a week to design a game using mostly Javascript. My team and I came up with Ninjavascript.Guide a ninja through different levels to help him reach the temple using Javascript principles. This game was designed as a fist experience for people looking to get in coding. Code-wise this was my first real experience using the Canvas API and was a real challenge creating an isometric 2D experience."
        }
        link="https://maximedruart.github.io/Ninjavascript"
        github="https://github.com/MaximeDruart/Ninjavascript"
      />
      <PGItem
        title={"CSS 3D Piano"}
        img={pianoGif}
        description={"Piano made purely in DOM elements using CSS 3D transform properties. Play around with it !"}
        link={"https://maximedruart.github.io/CSS-3D-Piano/"}
        github={"https://github.com/MaximeDruart/CSS-3D-Piano"}
      />
      <PGItem
        title={"Labyrinth"}
        img={labyrinth}
        description={
          "My first real experience with code was this project ! This high school project which spanned over 6 months was about recreating the tabletop game Labyrinth, which proved to be quite a challenge. This experience left me wanting for more and to pursue a programming education"
        }
        github="https://github.com/MaximeDruart/Labyrinth"
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
