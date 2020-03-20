import React, { useState, useRef, useMemo, useCallback, useEffect, useContext, createRef } from "react"
import projectData from "../assets/projectData"
import uuid from "uuid"
import Wiggly from "./Wiggly"
import { AnimationContext } from "../AnimationContext"
import gsap from "gsap/gsap-core"
import ScrollToPlugin from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

let projectSize = window.innerWidth < 576 ? 50 : 50

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
  let [transform, setTransform] = useState(projectSize / 2)
  let [lastTransform, setLastTransform] = useState(projectSize / 2)
  let [rotate, setRotate] = useState(null)
  // eslint-disable-next-line no-unused-vars
  let [spawnComplete, setSpawnComplete] = useState(false)
  let $projects = useRef(null)
  let $projectsWrapper = useRef(null)
  let $progressionCircle = useRef(null)
  const $projectNames = useMemo(() => Array.from({ length: projectData.length }).map(() => createRef()), [])
  const $parentCanvases = useMemo(() => Array.from({ length: projectData.length }).map(() => createRef()), [])

  const { updateContext, ...context } = useContext(AnimationContext)

  const scrollHandler = useCallback(
    e => {
      // e.preventDefault()
      let valueToUse = Math.max(Math.abs(e.deltaX), Math.abs(e.deltaY))
      valueToUse = valueToUse === Math.abs(e.deltaY) ? e.deltaY : valueToUse
      valueToUse = valueToUse === Math.abs(e.deltaX) ? e.deltaX : valueToUse
      setTransform(transform => {
        let t = transform - (valueToUse / window.innerWidth) * 100
        let activeProject = Math.ceil(-t / projectSize)
        t = gsap.utils.clamp(projectSize / 2 - projectSize * (projectData.length - 1), projectSize / 2, t)
        setActiveProject(activeProject)
        return t
      })
    },
    [setTransform]
  )

  const setTransformWithAnim = (value, animate) => {
    if (window.innerWidth < 576) {
      // adding 25vh to the value to compensate for the transformation then converting to pixels
      let scrollToValue = -((value - 25) / 100) * window.innerHeight
      gsap.to($projectsWrapper.current, 0.6, { scrollTo: scrollToValue })
    } else {
      if (animate) $projects.current.style.transition = "all 0.6s ease-in-out"
      setTransform(value)
      setTimeout(() => ($projects.current.style.transition = "none"), 600)
    }
  }

  // let scroll = -projectSize + 100 / 2 - projectSize / 2 + (useMouseWheel() / window.innerWidth) * 100
  const setRedirectWithParam = useCallback(path => props.history.push(`/projects/${path}`), [props.history])

  const getMappedData = useCallback(
    data => {
      return data.map((project, index) => (
        <div ref={$parentCanvases[index]} index={index} className="project" key={uuid()}>
          <h2 ref={$projectNames[index]} className="project-name">
            {project.name}
          </h2>
          <Wiggly
            $progressionCircle={$progressionCircle}
            $parentCanvases={$parentCanvases}
            $projectNames={$projectNames}
            index={index}
            fill={true}
            img={project.coverImg}
            projectSize={projectSize}
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

  // handling touch scroll
  useEffect(() => {
    let wrapperDOM = $projectsWrapper.current
    const touchCb = () => {
      let val = $projectsWrapper.current && $projectsWrapper.current.scrollTop
      setRotate((val / window.innerHeight) * 100)
      setActiveProject(Math.round((val / window.innerHeight) * 2))
    }
    window.innerWidth <= 576 && $projectsWrapper.current.addEventListener("scroll", touchCb)
    return () => wrapperDOM.removeEventListener("scroll", touchCb)
  }, [])

  useEffect(() => {
    if (context.$transitionHack) context.$transitionHack.current.style.backgroundImage = ""
  }, [context.$transitionHack])

  useEffect(() => {
    context.removeLoader && updateContext("spawnMain", true)
  }, [context.removeLoader, updateContext])

  // useEffect(() => {
  //   console.log(Math.abs(lastTransform - transform))
  //   Math.abs(lastTransform - transform) >= 15
  //     ? gsap.to($projects.current, 0.3, { x: transform + "vw" })
  //     : gsap.set($projects.current, { x: transform + "vw" })
  //   setLastTransform(transform)
  // }, [transform])

  return (
    <div onWheel={e => !context.isOpen && window.innerWidth > 576 && scrollHandler(e)} className="home">
      <div ref={$projectsWrapper} className="projects-wrapper">
        <ul
          style={{ transform: window.innerWidth <= 576 ? `translateY(${transform}vh)` : `translateX(${transform}vw)` }}
          ref={$projects}
          className="projects">
          {mappedData}
        </ul>
      </div>
      <div className="projects-progression">
        <div className="hide-bottom"></div>
        <div
          ref={$progressionCircle}
          style={{
            transform:
              window.innerWidth < 576
                ? `translate(-50%, -50%) rotate(${(rotate / 100) * 360 * 2}deg)`
                : `rotate(${-(transform / 100) * 360 * 2 + 90 * 2}deg)`
          }}
          className="circle-container">
          <div className="circle"></div>
          <div className="circle-txt">0{activeProject + 1}</div>
        </div>
      </div>
    </div>
  )
}

export default Home
