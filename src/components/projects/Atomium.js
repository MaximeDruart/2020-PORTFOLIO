import React from "react"

import etmIntro from "../../assets/img/atom/atom-intro.JPG"
import etmScene2 from "../../assets/img/atom/atom-scene2.JPG"
import etmScene3 from "../../assets/img/atom/atom-scene3.JPG"
import etmPg from "../../assets/img/atom/atom-pg.JPG"
import FullScreenImage from "./FullScreenImage"

const Atomium = ({ scrollDOM }) => {
  return (
    <div className="atomium">
      <FullScreenImage scrollDOM={scrollDOM} src={etmIntro} />
      <FullScreenImage scrollDOM={scrollDOM} src={etmScene2} />
      <FullScreenImage scrollDOM={scrollDOM} src={etmScene3} />
      <FullScreenImage scrollDOM={scrollDOM} src={etmPg} />
    </div>
  )
}

export default Atomium
