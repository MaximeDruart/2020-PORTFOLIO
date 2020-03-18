import React, { useState, useRef, useMemo, useCallback, useEffect, useContext, createRef } from "react"
import projectData from "../assets/projectData"
import uuid from "uuid"
import Wiggly from "./Wiggly"
import { AnimationContext } from "../AnimationContext"
import gsap from "gsap/gsap-core"

let projectWidth = 50

// const useMouseWheel = () => {
// 	const [scroll, setScroll] = useState(0)
// 	useEventListener("wheel", ({ deltaY, deltaX }) => {
// 		let valueToUse = Math.max(Math.abs(deltaX), Math.abs(deltaY))
// 		valueToUse = valueToUse === Math.abs(deltaY) ? deltaY : valueToUse
// 		valueToUse = valueToUse === Math.abs(deltaX) ? deltaX : valueToUse
// 		setScroll(scroll => scroll + valueToUse)
// 	})
// 	return scroll
// }

const Home = props => {
  let [activeProject, setActiveProject] = useState(0)
  let [transform, setTransform] = useState(projectWidth / 2)
  // eslint-disable-next-line no-unused-vars
  let [spawnComplete, setSpawnComplete] = useState(false)
  let $projects = useRef(null)
  let $parentCanvas = useRef(null)
  let $progressionCircle = useRef(null)

  const $projectNames = useMemo(() => Array.from({ length: projectData.length }).map(() => createRef()), [])
  const { updateContext, ...context } = useContext(AnimationContext)

  const scrollHandler = useCallback(
    e => {
      // e.preventDefault()
      let valueToUse = Math.max(Math.abs(e.deltaX), Math.abs(e.deltaY))
      valueToUse = valueToUse === Math.abs(e.deltaY) ? e.deltaY : valueToUse
      valueToUse = valueToUse === Math.abs(e.deltaX) ? e.deltaX : valueToUse
      setTransform(transform => {
        let t = transform - (valueToUse / window.innerWidth) * 100
        let activeProject = Math.ceil(-t / projectWidth)
        t = gsap.utils.clamp(projectWidth / 2 - projectWidth * (projectData.length - 1), projectWidth / 2, t)
        setActiveProject(activeProject)
        return t
      })
    },
    [setTransform]
  )

  const setTransformWithAnim = (value, animate) => {
    if (animate) $projects.current.style.transition = "all 0.6s ease-in-out"
    setTransform(value)
    setTimeout(() => ($projects.current.style.transition = "none"), 600)
  }

  // let scroll = -projectWidth + 100 / 2 - projectWidth / 2 + (useMouseWheel() / window.innerWidth) * 100
  const setRedirectWithParam = useCallback(path => props.history.push(`/projects/${path}`), [props.history])

  // ref={$projectNames.current[index]}
  const getMappedData = useCallback(
    data => {
      return data.map((project, index) => (
        <div ref={$parentCanvas} index={index} className="project" key={uuid()}>
          <h2 ref={$projectNames[index]} className="project-name">
            {project.name}
          </h2>
          <Wiggly
            $progressionCircle={$progressionCircle}
            parentCanvasRef={$parentCanvas}
            $projectNames={$projectNames}
            index={index}
            fill={true}
            img={project.coverImg}
            projectWidth={projectWidth}
            setTransform={setTransformWithAnim}
            setRedirectWithParam={setRedirectWithParam}
          />
        </div>
      ))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  let mappedData = useMemo(() => getMappedData(projectData), [getMappedData])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    updateContext("despawnMainComplete", false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (context.$transitionHack) context.$transitionHack.current.style.backgroundImage = ""
  }, [context.$transitionHack])

  useEffect(() => {
    context.removeLoader && updateContext("spawnMain", true)
  }, [context.removeLoader, updateContext])

  // let rotate = transform / 100 * 360

  return (
    <div onWheel={e => !context.isOpen && scrollHandler(e)} className="home">
      <ul style={{ transform: `translateX(${transform}vw)` }} ref={$projects} className="projects">
        {mappedData}
      </ul>
      <div className="projects-progression">
        <div
          ref={$progressionCircle}
          style={{ transform: `rotate(${-(transform / 100) * 360 * 2 + 90 * 2}deg)` }}
          className="circle-container">
          <div className="circle"></div>
          <div className="circle-txt">0{activeProject + 1}</div>
        </div>
      </div>
    </div>
  )
}

export default Home
