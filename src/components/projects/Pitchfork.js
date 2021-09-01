import React from "react"
import FullScreenImage from "./FullScreenImage"

import pitchforkFill1 from "../../assets/img/pitchfork/fill-1.jpg"
import pitchforkFill2 from "../../assets/img/pitchfork/fill-2.jpg"
import pitchforkFill3 from "../../assets/img/pitchfork/fill-3.jpg"
import pitchforkFill4 from "../../assets/img/pitchfork/fill-4.jpg"

const Pitchfork = () => {
  return (
    <div>
      <FullScreenImage src={pitchforkFill1} />
      <FullScreenImage src={pitchforkFill2} />
      <FullScreenImage src={pitchforkFill3} />
      <FullScreenImage src={pitchforkFill4} />
    </div>
  )
}

export default Pitchfork
