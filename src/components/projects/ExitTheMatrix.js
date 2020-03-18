import React from "react"

import etmLogo from "../../assets/img/etm/logo.jpg"
import etmGame from "../../assets/img/etm/etm-game.jpg"
import etmMenu from "../../assets/img/etm/etm-menu.jpg"
import FullScreenImage from "./FullScreenImage"

const ExitTheMatrix = () => {
  return (
    <div className="exit-the-matrix">
      <FullScreenImage src={etmLogo} />
      <FullScreenImage src={etmMenu} />
      <FullScreenImage src={etmGame} />
    </div>
  )
}

export default ExitTheMatrix
