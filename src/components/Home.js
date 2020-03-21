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
  const { updateContext, ...context } = useContext(AnimationContext)
  let [activeProject, setActiveProject] = useState(0)
  let [transform, setTransform] = useState(projectSize / 2)
  // eslint-disable-next-line no-unused-vars
  let [lastTransform, setLastTransform] = useState(projectSize / 2)
  let [rotate, setRotate] = useState(null)

  let $projects = useRef(null)
  let $projectsWrapper = useRef(null)
  let $progressionCircle = useRef(null)
  const $projectNames = useMemo(() => Array.from({ length: projectData.length }).map(() => createRef()), [])
  const $parentCanvases = useMemo(() => Array.from({ length: projectData.length }).map(() => createRef()), [])

  // handling touch scroll
  const touchHandler = () => {
    let val = $projectsWrapper.current && $projectsWrapper.current.scrollTop
    setRotate((val / window.innerHeight) * 100)
    setActiveProject(Math.round((val / window.innerHeight) * 2))
  }

  const scrollHandler = useCallback(
    e => {
      // e.preventDefault()
      let deltaX = e.deltaX * 0.5
      let deltaY = e.deltaY * 0.5
      let valueToUse = Math.max(Math.abs(deltaX), Math.abs(deltaY))
      valueToUse = valueToUse === Math.abs(deltaY) ? deltaY : valueToUse
      valueToUse = valueToUse === Math.abs(deltaX) ? deltaX : valueToUse
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
    if (window.innerWidth <= 576) {
      // adding 25vh to the value to compensate for the transformation then converting to pixels
      let scrollToValue = -((value - 25) / 100) * window.innerHeight
      gsap.to($projectsWrapper.current, 0.6, { scrollTo: scrollToValue })
    } else {
      gsap.to($projects.current, 0.6, { x: value + "vw" })
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

  // useEffect(() => {
  //   let resizeHandler = () => (mappedData = getMappedData(projectData))
  //   window.addEventListener("resize", resizeHandler)

  //   return () => window.removeEventListener("resize", resizeHandler)
  // }, [])

  useEffect(() => {
    if (context.$transitionHack) context.$transitionHack.current.style.backgroundImage = ""
  }, [context.$transitionHack])

  useEffect(() => {
    context.removeLoader && updateContext("spawnMain", true)
  }, [context.removeLoader, updateContext])

  // animating scroll on main menu and rotation on progress for pc version
  useEffect(() => {
    if (window.innerWidth > 576) {
      gsap.to($projects.current, 0.3, { x: transform + "vw" })
      gsap.to($progressionCircle.current, 0.3, {
        rotate: `${-(transform / 100) * 360 * 2 + 90 * 2}deg`
      })
    }
  }, [transform, rotate])

  return (
    <div onWheel={e => !context.isOpen && window.innerWidth > 576 && scrollHandler(e)} className="home">
      <div
        onScroll={() => window.innerWidth <= 576 && touchHandler()}
        ref={$projectsWrapper}
        className="projects-wrapper">
        <ul
          style={{ transform: window.innerWidth <= 576 && `translateY(${transform}vh)` }}
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
            transform: window.innerWidth < 576 && `translate(-50%, -50%) rotate(${(rotate / 100) * 360 * 2}deg)`
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
