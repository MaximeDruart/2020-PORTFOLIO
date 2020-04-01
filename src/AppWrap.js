import React, { useEffect, useRef, useContext } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import projectData from "./assets/projectData"
import Home from "./components/Home"
import About from "./components/About"
import Loader from "./components/Loader"
import uuid from "uuid"
import Header from "./components/Header"
import MouseFollower from "./components/MouseFollower"
import ProjectDetail from "./components/ProjectDetail"
import { AnimationContext } from "./AnimationContext"

const AppWrap = () => {
  const { updateContext, removeLoader } = useContext(AnimationContext)
  const $transitionHack = useRef(null)

  let projectRoutes = projectData.map((project, index) => (
    <Route
      path={`/projects/${project.path}`}
      key={uuid()}
      component={props => <ProjectDetail index={index} project={project} {...props} />}
    />
  ))

  useEffect(() => {
    updateContext("$transitionHack", $transitionHack)
  }, [])

  return (
    <div className="wrapper">
      <div ref={$transitionHack} className="transition-hack"></div>
      {/* <div className="transition-hack"></div> */}
      <Router>
        <MouseFollower />
        <div className="noise-filter"></div>
        {!removeLoader && <Loader />}
        <Route path="/" render={props => <Header {...props} />} />
        <Switch>
          <Route path="/" exact render={props => <Home {...props} />} />
          <Route path="/about" exact component={About} />
          {projectRoutes}
          <Route path="*" render={props => <Home {...props} />} />
        </Switch>
      </Router>
    </div>
  )
}

export default AppWrap
