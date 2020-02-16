import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.scss"

import Home from "./components/Home"
import About from "./components/About"
import Loader from "./components/Loader"

const App = () => {
	return (
		<Router>
			<Loader />
			<Switch>
				<Route path="/" exact component={Home}></Route>
				<Route path="/about" exact component={About}></Route>
			</Switch>
		</Router>
	)
}

export default App
