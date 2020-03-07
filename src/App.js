import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import projectData from "./assets/projectData"
import Home from "./components/Home"
import About from "./components/About"
import Loader from "./components/Loader"
import uuid from "uuid"
import Header from "./components/Header"
import MouseFollower from "./components/MouseFollower"

const App = () => {
  let projectRoutes = projectData.map(({ path, component }) => (
    <Route path={`/projects/${path}`} key={uuid()} component={component} />
  ))
  return (
    <Router>
      <Header />
      <Loader />
      <MouseFollower />
      <Switch>
        {/* <Route path='/' exact component={Home} /> */}
        <Route path='/about' exact component={About} />
      </Switch>

      {projectRoutes}
    </Router>
  )
}

export default App
