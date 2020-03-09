import React from "react"
import { useEffect } from "react"

const ProjectDetail = props => {
	console.log(props.spawnMain)
	useEffect(() => {
		// document.body.style.overflowY = "visible"
		// document.body.style.color = "red"
	}, [])
	return (
		<div className="projectDetail">
			<div className="banner"></div>
			<div className="content"></div>
		</div>
	)
}

export default ProjectDetail
