import React, { useRef } from "react"
import WigglyContainer from "./Wiggly"
import { useState } from "react"
import useEventListener from "@use-it/event-listener"
import { CSSTransition } from "react-transition-group"

let textScrollHeight = -window.innerHeight * 0.52
const useMouseWheel = () => {
	const [scroll, setScroll] = useState(0)
	useEventListener("wheel", ({ deltaY }) => setScroll(scroll => scroll + deltaY))
	return scroll
}

const About = () => {
	let $preloadCanvas = useRef(null)
	let $preloadContainer = useRef(null)
	const scroll = Math.max(textScrollHeight + useMouseWheel(), textScrollHeight)

	return (
		<div ref={$preloadContainer} className="preload-container about-container">
			<div className="preload-wrapper about-wrapper">
				<div ref={$preloadCanvas} className="about-canvas">
					<WigglyContainer parentCanvasRef={$preloadCanvas} index={0} spawn={true} fill={false} />
				</div>
				<div style={{ opacity: `${Math.max(0, (-scroll - 300) / 180)}` }} className="about-title">
					Hello
				</div>
				<div style={{ transform: `translateY(${-scroll}px)` }} className="about-content">
					<div className="about-intro">
						<aside className="links">
							<ul>
								<li className="link">
									<a href="https://github.com/MaximeDruart">github</a>
								</li>
								<li className="link">
									<a href="https://www.linkedin.com/in/maxime-druart/">linkedin</a>
								</li>
								<li className="link">
									<a href="https://www.behance.net/maximedruart">behance</a>
								</li>
								<li className="link">
									<a href="mailto:maxime.druart@hetic.net">email</a>
								</li>
							</ul>
						</aside>
						<div className="description">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
							et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
							Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
							amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
							aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
							gubergren, no sea.
						</div>
					</div>
					<div className="about-skills">
						<div className="skills-title">skills</div>
						<div className="skills-dev">
							<div className="title">development</div>
							<ul>
								<li>html</li>
								<li>css</li>
								<li>sass</li>
								<li>javascript</li>
								<li>react</li>
								<li>nodejs</li>
								<li>mongodb</li>
								<li>python</li>
								<li>canvas</li>
								<li>pixi.js</li>
								<li>gsap</li>
							</ul>
						</div>
						<div className="skills-design">
							<div className="title">design</div>
							<ul>
								<li>photoshop</li>
								<li>illustrator</li>
								<li>xd</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About
