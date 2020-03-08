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
  let $parentCanvas = useRef(null)

  const scrollHandler = event => {
    // console.log(event.deltaY)
    setTransform(transform - event.deltaY / 10)
    setActiveProject(Math.round(transform))
    // gsap.to($projects.current, 0.6, { x: transform + "vw", ease: Power2 })
  }

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
            setTransform={setTransform}
            projectWidth={projectWidth}
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
      <ul style={{ transform: `translateX(${transform}vw)` }} ref={$projects} className='projects'>
        {mappedData}
      </ul>
      <div className='projects-progression'>
        <CSSTransition appear={true} in={true} timeout={0} classNames='circle-container'>
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
