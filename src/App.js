import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import projectData from "./assets/projectData"
import Home from "./components/Home"
import About from "./components/About"
import Loader from "./components/Loader"
import uuid from "uuid"
import Header from "./components/Header"
import MouseFollower from "./components/MouseFollower"
import ProjectDetail from "./components/projects/ProjectDetail"
// const Home = React.lazy(() => import("./components/Home"))

const App = () => {
	let [spawnMain, setSpawnMain] = useState(false)
	let projectRoutes = projectData.map(project => (
		<Route
			loading={spawnMain}
			path={`/projects/${project.path}`}
			key={uuid()}
			component={props => <ProjectDetail project={project} {...props} />}
		/>
	))

	return (
		<Router>
			<div className="background"></div>
			{!spawnMain ? (
				// <Loader setSpawnMain={setSpawnMain} />
				<Route path="/" render={props => <Loader {...props} setSpawnMain={setSpawnMain} />} />
			) : (
				<div>
					<Header />
					<Switch>
						<Route path="/" exact render={props => <Home {...props} spawnMain={spawnMain} />} />
						{projectRoutes}
					</Switch>
				</div>
			)}
			{/* <React.Suspense fallback={<Loader setSpawnMain={setSpawnMain} />}>
				<Home />
			</React.Suspense> */}
			<MouseFollower />
			<Switch>
				<Route path="/about" exact component={About} />
			</Switch>
		</Router>
	)
}

export default App
