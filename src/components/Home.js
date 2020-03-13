import React, { useState, useRef, useMemo, useCallback, useEffect, useContext } from "react"
import projectData from "../assets/projectData"
import uuid from "uuid"
import { CSSTransition } from "react-transition-group"
import Wiggly from "./Wiggly"
import { AnimationContext } from "../AnimationContext"

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
  let [transform, setTransform] = useState(-projectWidth + 100 / 2 - projectWidth / 2)
  // eslint-disable-next-line no-unused-vars
  let [spawnComplete, setSpawnComplete] = useState(false)
  let $projects = useRef(null)
  let $parentCanvas = useRef(null)
  let $projectName = useRef(null)
  const { updateContext, ...context } = useContext(AnimationContext)

  const scrollHandler = useCallback(
    ({ deltaX, deltaY }) => {
      let valueToUse = Math.max(Math.abs(deltaX), Math.abs(deltaY))
      valueToUse = valueToUse === Math.abs(deltaY) ? deltaY : valueToUse
      valueToUse = valueToUse === Math.abs(deltaX) ? deltaX : valueToUse
      setTransform(transform => {
        let t = transform - (valueToUse / window.innerWidth) * 100
        setActiveProject(Math.ceil(-t / projectWidth))
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

  const getMappedData = useCallback(
    data => {
      //   console.log(context.spawnMain)
      return data.map((project, index) => (
        <div ref={$parentCanvas} index={index} className='project' key={uuid()} to={`/projects/${project.path}`}>
          <Wiggly
            parentCanvasRef={$parentCanvas}
            nameRef={$projectName}
            index={index}
            fill={true}
            img={project.coverImg}
            projectWidth={projectWidth}
            setTransform={setTransformWithAnim}
            setRedirectWithParam={setRedirectWithParam}
          />

          <h2 ref={$projectName} className='project-name'>
            {project.name}
          </h2>
        </div>
      ))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  let mappedData = useMemo(() => getMappedData(projectData), [getMappedData])

  useEffect(() => {
    document.body.style.overflow = "hidden"
  }, [])

  return (
    <div onWheel={e => scrollHandler(e)} className='home'>
      <ul style={{ transform: `translateX(${transform}vw)` }} ref={$projects} className='projects'>
        {mappedData}
      </ul>
      <div className='projects-progression'>
        <CSSTransition appear={true} in={props.spawnMain} timeout={0} classNames='circle-container'>
          <div className='circle-container'>
            <div className='circle'></div>
            <div className='circle-txt'>0{activeProject + 1}</div>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}

export default Home
