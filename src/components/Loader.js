import React, { useState, useContext } from "react"
import WigglyContainer from "./Wiggly"
import { useRef } from "react"
import { useEffect } from "react"
import gsap, { Power3 } from "gsap"
import useInterval from "./utils/UseInterval"
import { AnimationContext } from "../AnimationContext"

let preloadSpawnTl
const Loader = props => {
  let [loadpct, setLoadpct] = useState(0)
  let [preloadDespawn, setPreloadDespawn] = useState(false)

  const { updateContext } = useContext(AnimationContext)

  let name = useRef(null)
  let role = useRef(null)
  let $preloadCanvas = useRef(null)
  let $preloadContainer = useRef(null)

  useEffect(() => {
    preloadSpawnTl = gsap.timeline({
      paused: true,
      onReverseComplete: () => {
        // on reverse complete, loader fades out
        gsap.to($preloadContainer.current, 0.45, {
          ease: Power3.easeInOut,
          opacity: 0,
          pointerEvents: "none",
          onComplete: () => {
            // triggering the spawn animation for main
            $preloadContainer.current.style.display = "none"
            updateContext("removeLoader", true)
            updateContext("spawnMain", true)
          }
        })
      }
    })
    preloadSpawnTl.to([name.current, role.current], 0.9, { ease: Power3.easeInOut, x: "105%" })
    preloadSpawnTl.play()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // for now we're simply simulating loading
  let first = true
  useInterval(() => {
    setLoadpct(Math.min(loadpct + Math.floor(Math.random() * 5), 100))
    if (loadpct === 100 && first) {
      first = false
      preloadSpawnTl.reverse()
      setPreloadDespawn(true)
    }
  }, 50)

  return (
    <div ref={$preloadContainer} className="preload-container">
      <div className="background">{/* <div className="noise"></div> */}</div>
      <div className="preload-wrapper">
        <div className="load-percentage">{loadpct}%</div>
        <div style={{ opacity: 0.9 }} ref={$preloadCanvas} className="preload-canvas">
          <WigglyContainer
            parentCanvasRef={$preloadCanvas}
            index={0}
            despawn={preloadDespawn}
            spawn={true}
            fill={false}
            antialias={true}
          />
        </div>
        <div className="title-container">
          <div ref={name} className="content">
            <p className="name">maxime</p>
            <p className="name">druart</p>
          </div>
        </div>
        <div className="title-container title-dev">
          <div ref={role} className="content">
            {window.innerWidth < 600 ? (
              <p>web dev</p>
            ) : (
              <div>
                <p>front end</p>
                <p>‏‏‎developer</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
