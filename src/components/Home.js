import React, { useState, useEffect, useRef, useMemo, useCallback } from "react"
import projectData from "../assets/projectData"
import uuid from "uuid"
import { Link, Redirect } from "react-router-dom"
import { CSSTransition } from "react-transition-group"
import Wiggly from "./Wiggly"
import useEventListener from "@use-it/event-listener"

let projectWidth = 50

const useMouseWheel = () => {
	const [scroll, setScroll] = useState(0)
	useEventListener("wheel", ({ deltaY, deltaX }) => {
		let valueToUse = Math.max(Math.abs(deltaX), Math.abs(deltaY))
		valueToUse = valueToUse === Math.abs(deltaY) ? deltaY : valueToUse
		valueToUse = valueToUse === Math.abs(deltaX) ? deltaX : valueToUse
		setScroll(scroll => scroll + Math.max(deltaY, deltaX))
	})
	return scroll
}

const Home = props => {
	let [activeProject, setActiveProject] = useState(0)
	let [transform, setTransform] = useState(-projectWidth + 100 / 2 - projectWidth / 2)
	let $projects = useRef(null)
	let $parentCanvas = useRef(null)
	let [redirect, setRedirect] = useState(null)

	const scrollHandler = event => {
		setTransform(transform - event.deltaY / 10)
		setActiveProject(Math.round(transform))
		// gsap.to($projects.current, 0.6, { x: transform + "vw", ease: Power2 })
	}

	// px to vw
	// vw = (px / window.innerWidth) * 100

	const scroll = useMouseWheel()
	console.log(scroll)

	const setRedirectWithParam = path => setRedirect(<Redirect to={`/projects/${path}`} />)

	const getMappedData = useCallback(
		data => {
			return data.map((project, index) => (
				<div ref={$parentCanvas} index={index} className="project" key={uuid()} to={`/projects/${project.path}`}>
					<Wiggly
						{...props}
						parentCanvasRef={$parentCanvas}
						index={index}
						spawn={true}
						fill={true}
						img={project.coverImg}
						projectWidth={projectWidth}
						setTransform={setTransform}
						setRedirectWithParam={setRedirectWithParam}
					/>

					<h2 className="project-name">{project.name}</h2>
				</div>
			))
		},
		[props]
	)

	let mappedData = useMemo(() => getMappedData(projectData), [getMappedData])

	return (
		<div onWheel={e => scrollHandler(e)} className="home">
			<ul style={{ transform: `translateX(${transform}vw)` }} ref={$projects} className="projects">
				{mappedData}
			</ul>
			<div className="projects-progression">
				<CSSTransition appear={true} in={props.spawnMain} timeout={0} classNames="circle-container">
					<div className="circle-container">
						<div className="circle"></div>
						<div className="circle-txt">0{activeProject + 1}</div>
					</div>
				</CSSTransition>
			</div>
			{redirect}
		</div>
	)
}

export default Home
