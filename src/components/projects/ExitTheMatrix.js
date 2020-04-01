import React from "react"

import etmLogo from "../../assets/img/etm/logo.jpg"
import etmGame from "../../assets/img/etm/etm-game.jpg"
import etmMenu from "../../assets/img/etm/etm-menu.jpg"
import FullScreenImage from "./FullScreenImage"

const ExitTheMatrix = ({ scrollDOM }) => {
  return (
    <div className="exit-the-matrix">
      <FullScreenImage scrollDOM={scrollDOM} src={etmLogo} />
      <FullScreenImage scrollDOM={scrollDOM} src={etmMenu} />
      <FullScreenImage scrollDOM={scrollDOM} src={etmGame} />
    </div>
  )
}

export default ExitTheMatrix
