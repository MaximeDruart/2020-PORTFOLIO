import React from "react"
import FullScreenImage from "./FullScreenImage"

import game from "../../assets/img/njs/njs-game.jpg"
import help from "../../assets/img/njs/njs-help.jpg"
import home from "../../assets/img/njs/njs-home.jpg"
import home2 from "../../assets/img/njs/njs-home-2.jpg"
import levels from "../../assets/img/njs/njs-levels.jpg"
import ninjas from "../../assets/img/njs/njs-ninjas.jpg"

const Ninjavascript = () => {
  return (
    <div className="ninjavascript">
      <FullScreenImage src={game} />
      <FullScreenImage src={home} />
      <FullScreenImage src={home2} />
      <FullScreenImage src={help} />
      <FullScreenImage src={levels} />
      <FullScreenImage src={ninjas} />
    </div>
  )
}

export default Ninjavascript
