import React, { useState, useEffect, useRef } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import projectData from "./assets/projectData"
import Home from "./components/Home"
import About from "./components/About"
import Loader from "./components/Loader"
import uuid from "uuid"
import Header from "./components/Header"
import MouseFollower from "./components/MouseFollower"
import ProjectDetail from "./components/projects/ProjectDetail"
// import AnimationContextProvider from "./animationContext"
// const Home = React.lazy(() => import("./components/Home"))

const App = () => {
	let [spawnMain, setSpawnMain] = useState(false)
	let [despawn, setDespawn] = useState(false)
	let [despawnComplete, setDespawnComplete] = useState(false)
	let $transitionHack = useRef(null)
	let projectRoutes = projectData.map(project => (
		<Route
			loading={spawnMain}
			path={`/projects/${project.path}`}
			key={uuid()}
			component={props => <ProjectDetail project={project} {...props} />}
		/>
	))

	useEffect(() => {
		console.log("despawn changed :", despawn)
	}, [despawn])

	return (
		// <AnimationContextProvider>
		<div className="wrapper">
			<div ref={$transitionHack} className="project-transition-hack"></div>
			<Router>
				<MouseFollower />
				{!spawnMain ? (
					<Loader setSpawnMain={setSpawnMain} />
				) : (
					<div className="background">
						<div className="noise"></div>
					</div>
				)}
				<div>
					<Route
						path="/"
						render={props => (
							<Header
								{...props}
								despawnComplete={despawnComplete}
								setSpawnMain={setSpawnMain}
								setDespawn={setDespawn}
							/>
						)}
					/>
					<Switch>
						<Route
							path="/"
							exact
							render={props => (
								<Home
									{...props}
									$transitionHack={$transitionHack}
									setDespawnComplete={setDespawnComplete}
									despawn={despawn}
									spawnMain={spawnMain}
								/>
							)}
						/>
						{projectRoutes}
						<Route path="/about" exact component={About} />
					</Switch>
				</div>
				{/* <React.Suspense fallback={<Loader setSpawnMain={setSpawnMain} />}>
				<Home />
			</React.Suspense> */}
			</Router>
		</div>
		// </AnimationContextProvider>
	)
}

export default App
