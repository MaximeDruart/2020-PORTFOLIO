import React, { useState, useEffect, useRef } from "react"
import projectData from "../assets/projectData"
import uuid from "uuid"
import { Link } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import Wiggly from "./Wiggly"
import gsap from "gsap"

let mappedData
const Home = props => {
  let [activeProject, setActiveProject] = useState(0)
  let [transform, setTransform] = useState(-40)
  let $projects = useRef(null)

  // translateX($project-width / 3 -$project-width);
  const scrollHandler = event => {
    setTransform(transform => transform + event.deltaY)
    // gsap.to($projects, 0.6, { x: transform })
  }
  useEffect(() => {
    window.addEventListener("wheel", scrollHandler)

    return () => window.removeEventListener("scroll", scrollHandler)
  }, [])

  return (
    <div className='home'>
      <ul ref={$projects} className='projects'>
        {projectData.map(project => (
          <div className='project' key={uuid()} to={`/projects/${project.path}`}>
            <Wiggly {...props} spawn={true} fill={true} img={project.coverImg} />
            <h2>{project.name}</h2>
          </div>
        ))}
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
