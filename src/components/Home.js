import React, { useState } from "react"
import projectData from "../assets/projectData"
import uuid from "uuid"
import { Link } from "react-router-dom"

import Wiggly from "./Wiggly"

const Home = () => {
  let [activeProject, setActiveProject] = useState(0)

  let mappedData = projectData.map(project => (
    <div className='project' key={uuid()} to={`/projects/${project.path}`}>
      <Wiggly fill={true} img={project.coverImg} />
      <h2>{project.name}</h2>
    </div>
  ))
  return (
    <div className='home'>
      <ul className='projects'>{mappedData}</ul>
      <div className='projects-progression'>
        <div className='circle'></div>
        <div className='circle-txt'>01</div>
      </div>
    </div>
  )
}

export default Home
