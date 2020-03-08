import React, { useState } from "react"
import WigglyContainer from "./Wiggly"
import { useRef } from "react"
import { useEffect } from "react"
import gsap, { Power3 } from "gsap"

const Loader = props => {
  let [loadpct, setLoadpct] = useState(58)

  let [despawn, setDespawn] = useState(false)
  let name = useRef(null)
  let role = useRef(null)

  let $preloadCanvas = useRef(null)

  const spawnTl = gsap.timeline({ paused: true, onReverseComplete: () => props.setSpawnMain(true) })

  useEffect(() => {
    spawnTl.from([name.current, role.current], 1.5, { ease: Power3.easeInOut, x: "-105%" })
    spawnTl.play()
  }, [])

  let parentCanvasSize
  useEffect(() => {
    parentCanvasSize = $preloadCanvas.current.getBoundingClientRect()
  }, [$preloadCanvas])
  return (
    <div className='preloadContainer'>
      <div className='load-percentage'>{loadpct}%</div>
      <div ref={$preloadCanvas} className='preloadCanvas'>
        <WigglyContainer parentCanvasRef={$preloadCanvas} index={0} despawn={despawn} spawn={true} fill={false} />
      </div>
      <div className='title-container'>
        <div ref={name} className='content'>
          <p
            onClick={() => {
              setDespawn(true)
              spawnTl.reverse()
            }}
            className='name'
          >
            maxime
          </p>
          <p className='name'>druart</p>
        </div>
      </div>
      <div className='title-container title-dev'>
        <div ref={role} className='content'>
          <p>front end</p>
          <p>‏‏‎developper</p>
        </div>
      </div>
    </div>
  )
}

export default Loader
