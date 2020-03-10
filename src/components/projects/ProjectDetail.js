import React from "react"
import { useEffect } from "react"
import gsap, { Power3 } from "gsap"

// objet?.propriété

const ProjectDetail = ({ project }) => {
	useEffect(() => {
		document.body.style.overflowY = "visible"
		let projectSpawnTl = gsap.timeline({ paused: true, ease: Power3.easeInOut })
	}, [])
	return (
		<div className="projectDetail">
			<div style={{ backgroundImage: `url(${project?.coverImg})` }} className="banner"></div>
			<h1>{project?.name}</h1>
			<div className="content">
				<div className="general-infos">
					<div className="info-date">
						<div className="info-label">Date</div>
						<div className="info-content">{project?.date}</div>
					</div>
					<div className="info-role">
						<div className="info-label">Role</div>
						<div className="info-content">{project?.role}</div>
					</div>
					<div className="info-techs">
						<div className="info-label">Techs</div>
						<ul className="info-content">
							{project?.techs.map(tech => (
								<li className="tech">{tech}</li>
							))}
						</ul>
					</div>
				</div>
				<div className="project-specific-content">{project?.component()}</div>
			</div>
		</div>
	)
}

export default ProjectDetail
