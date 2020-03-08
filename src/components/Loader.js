import React, { useState } from "react"
import WigglyContainer from "./Wiggly"
import { useRef } from "react"
import { useEffect } from "react"
import gsap, { Power3 } from "gsap"

let spawnTl
const Loader = props => {
  let [loadpct, setLoadpct] = useState(58)

  let [despawn, setDespawn] = useState(false)
  let name = useRef(null)
  let role = useRef(null)

  let $preloadCanvas = useRef(null)
  let $preloadContainer = useRef(null)

  useEffect(() => {
    spawnTl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        gsap.to($preloadContainer.current, 0.6, {
          ease: Power3.easeInOut,
          opacity: 0,
          onComplete: () => props.setSpawnMain(true)
        })
      }
    })
    spawnTl.from([name.current, role.current], 1.5, { ease: Power3.easeInOut, x: "-105%" })
    spawnTl.play()
  }, [])

  return (
    <div ref={$preloadContainer} className='preloadContainer'>
      <div className='preload-wrapper'>
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
    </div>
  )
}

export default Loader
