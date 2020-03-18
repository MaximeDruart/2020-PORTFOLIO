import React from "react"
import etmGame from "../../assets/img/etm-game.PNG"
import etmLogo from "../../assets/img/etm-logo.PNG"
import etmMenu from "../../assets/img/etm-menu.PNG"

const ExitTheMatrix = props => {
  return (
    <div className="exit-the-matrix">
      <img className="full-screen-image" src={etmLogo} alt="" />
      <img className="full-screen-image" src={etmMenu} alt="" />
      <img className="full-screen-image" src={etmGame} alt="" />
    </div>
  )
}

export default ExitTheMatrix
