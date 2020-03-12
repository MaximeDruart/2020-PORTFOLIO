import React, { useState, useEffect, useRef, useContext } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import projectData from "./assets/projectData"
import Home from "./components/Home"
import About from "./components/About"
import Loader from "./components/Loader"
import uuid from "uuid"
import Header from "./components/Header"
import MouseFollower from "./components/MouseFollower"
import ProjectDetail from "./components/projects/ProjectDetail"
import { AnimationContext } from "./AnimationContext"

const AppWrap = () => {
  const { updateContext, ...context } = useContext(AnimationContext)
  let $transitionHack = useRef(null)
  let projectRoutes = projectData.map(project => (
    <Route
      path={`/projects/${project.path}`}
      key={uuid()}
      component={props => <ProjectDetail project={project} {...props} />}
    />
  ))

  useEffect(() => {
    updateContext("$transitionHack", $transitionHack)
  }, [$transitionHack, updateContext])

  return (
    <div className='wrapper'>
      <div ref={$transitionHack} className='project-transition-hack'></div>
      <Router>
        <MouseFollower />
        {!context.removeLoader && <Loader />}
        <Route path='/' render={props => <Header {...props} />} />
        <Switch>
          <Route path='/' exact render={props => <Home {...props} />} />
          <Route path='/about' exact component={About} />
          {projectRoutes}
        </Switch>
      </Router>
    </div>
  )
}

export default AppWrap
