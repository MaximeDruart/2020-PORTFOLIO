import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import projectData from "./assets/projectData"
import Home from "./components/Home"
import About from "./components/About"
import Loader from "./components/Loader"
import uuid from "uuid"
import Header from "./components/Header"
import MouseFollower from "./components/MouseFollower"

const App = () => {
	let [spawnMain, setSpawnMain] = useState(false)
	let projectRoutes = projectData.map(({ path, component }) => (
		<Route loading={spawnMain} path={`/projects/${path}`} key={uuid()} component={component} />
	))

	useEffect(() => {
		// document.body.style.overflow = "scroll !important"
		// document.body.style.color = "red"
		// console.log("with")
	}, [])

	const setScroll = () => {
		console.log("setting scroll")
		document.body.style.overflowY = "scroll !important"
	}

	return (
		<Router>
			<div className="background"></div>
			<Header />
			{!spawnMain ? (
				// <Loader setSpawnMain={setSpawnMain} />
				<Route path="/" render={props => <Loader {...props} setSpawnMain={setSpawnMain} setScroll={setScroll} />} />
			) : (
				<Route path="/" exact render={props => <Home {...props} spawnMain={spawnMain} />} />
			)}
			<MouseFollower />
			<Switch>
				<Route path="/about" exact component={About} />
			</Switch>
			{projectRoutes}
		</Router>
	)
}

export default App
