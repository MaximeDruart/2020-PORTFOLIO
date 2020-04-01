import React from "react"

import etmIntro from "../../assets/img/atom/atom-intro.JPG"
import etmScene2 from "../../assets/img/atom/atom-scene2.JPG"
import etmScene3 from "../../assets/img/atom/atom-scene3.JPG"
import etmPg from "../../assets/img/atom/atom-pg.JPG"
import FullScreenImage from "./FullScreenImage"

const Atomium = () => {
  return (
    <div className="atomium">
      <FullScreenImage src={etmIntro} />
      <FullScreenImage src={etmScene2} />
      <FullScreenImage src={etmScene3} />
      <FullScreenImage src={etmPg} />
    </div>
  )
}

export default Atomium
