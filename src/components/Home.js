import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import projectData from "../assets/projectData"
import uuid from "uuid"
import { Link } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import Wiggly from "./Wiggly"
import gsap, { Power2 } from "gsap"

let projectWidth = 50

const Home = props => {
  let [activeProject, setActiveProject] = useState(0)
  let [transform, setTransform] = useState(-projectWidth + 100 / 2 - projectWidth / 2)
  let $projects = useRef(null)

  // translateX($project-width / 3 -$project-width);

  const scrollHandler = event => {
    setTransform(-(transform + event.deltaY / 8))
    setActiveProject((transform - projectWidth / 2) / projectWidth)
    gsap.to($projects.current, 0.6, { x: transform + "vw", ease: Power2 })
  }

  useEffect(() => {
    console.log("run")
    gsap.set($projects.current, { x: transform + "vw" })
  }, [])

  let $parentCanvas = useRef(null)

  const getMappedData = useCallback(
    data => {
      return data.map((project, index) => (
        <div ref={$parentCanvas} index={index} className='project' key={uuid()} to={`/projects/${project.path}`}>
          <Wiggly
            {...props}
            parentCanvasRef={$parentCanvas}
            index={index}
            spawn={true}
            fill={true}
            img={project.coverImg}
          />
          <h2>{project.name}</h2>
        </div>
      ))
    },
    [props]
  )

  let mappedData = useMemo(() => getMappedData(projectData), [getMappedData])

  return (
    <div onWheel={e => scrollHandler(e)} className='home'>
      <ul ref={$projects} className='projects'>
        {mappedData}
      </ul>
      <div className='projects-progression'>
        <CSSTransition appear={true} in={true} timeout={0} classNames='circle-container'>
          <div className='circle-container'>
            <div className='circle'></div>
            <div className='circle-txt'>01</div>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}

export default Home
