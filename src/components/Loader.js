import React, { useState } from "react"
import WigglyContainer from "./Wiggly"
const Loader = () => {
  let [loadpct, setLoadpct] = useState(58)
  return (
    <div className='preloadContainer'>
      <div className='load-percentage'>{loadpct}%</div>
      <h1 className='name'>maxime</h1>
      <div className='preloadCanvas'>
        <WigglyContainer spawn={true} fill={false} />
      </div>
      <h1 className='dev'>front end</h1>
    </div>
  )
}

export default Loader
