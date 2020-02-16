import React from "react"
import projectData from "../assets/projectData"
import uuid from "uuid"
import { Link } from "react-router-dom"

const Home = () => {
	let mappedData = projectData.map(({ path, name }) => (
		<Link key={uuid()} to={`/projects/${path}`}>
			<li>{name}</li>
		</Link>
	))
	return (
		<div>
			<h1>Home</h1>
			<ul>{mappedData}</ul>
			<Link to="/about">About</Link>
		</div>
	)
}

export default Home
