import React from "react"
import FullScreenImage from "./FullScreenImage"

import sandwichFill1 from "../../assets/img/sandwich/fill-1.jpg"
import sandwichFill2 from "../../assets/img/sandwich/fill-2.jpg"
import sandwichFill3 from "../../assets/img/sandwich/fill-3.jpg"

const Sandwich = () => {
  return (
    <div>
      <FullScreenImage src={sandwichFill1} />
      <FullScreenImage src={sandwichFill2} />
      <FullScreenImage src={sandwichFill3} />
    </div>
  )
}

export default Sandwich
