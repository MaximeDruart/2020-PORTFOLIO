import React, { useState } from "react"
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

  let [spawnMain, setSpawnMain] = useState(false)
  return (
    <Router>
      <div className='background'></div>
      <Header />
      {!spawnMain ? (
        <Loader setSpawnMain={setSpawnMain} />
      ) : (
        <Route spawnMain={spawnMain} path='/' exact render={props => <Home {...props} spawnMain={spawnMain} />} />
      )}
      <MouseFollower />
      <Switch>
        <Route path='/about' exact component={About} />
      </Switch>
      {projectRoutes}
    </Router>
  )
}

export default App
