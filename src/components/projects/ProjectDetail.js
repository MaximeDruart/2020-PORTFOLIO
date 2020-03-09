import React from "react"
import { useEffect } from "react"
import gsap, { Power3 } from "gsap"

const ProjectDetail = ({ project, index }) => {
	useEffect(() => {
		document.body.style.overflowY = "visible"

		let projectSpawnTl = gsap.timeline({ paused: true, ease: Power3.easeInOut })
	}, [])
	return (
		<div className="projectDetail">
			<div style={{ backgroundImage: `url(${project.coverImg})` }} className="banner"></div>
			<h1>{project.name}</h1>
			<div className="content">{project.component()}</div>
		</div>
	)
}

export default ProjectDetail
