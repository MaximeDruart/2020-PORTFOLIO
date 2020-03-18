import React from "react"
import FullScreenImage from "./FullScreenImage"

import home from "../../assets/img/lab/lab-home.jpg"
import game from "../../assets/img/lab/lab-game.jpg"
import game2 from "../../assets/img/lab/lab-game-2.jpg"

const Labyrinth = () => {
  return (
    <div className="labyrinth">
      <FullScreenImage src={home} />
      <FullScreenImage src={game} />
      <FullScreenImage src={game2} />
    </div>
  )
}

export default Labyrinth
