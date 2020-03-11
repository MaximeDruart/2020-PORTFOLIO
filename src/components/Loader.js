import React, { useState } from "react"
import WigglyContainer from "./Wiggly"
import { useRef } from "react"
import { useEffect } from "react"
import gsap, { Power3 } from "gsap"
import useInterval from "./utils/UseInterval"

let preloadSpawnTl
const Loader = props => {
	let [loadpct, setLoadpct] = useState(0)

	let [preloadDespawn, setPreloadDespawn] = useState(false)
	let name = useRef(null)
	let role = useRef(null)

	let $preloadCanvas = useRef(null)
	let $preloadContainer = useRef(null)

	useEffect(() => {
		preloadSpawnTl = gsap.timeline({
			paused: true,
			onReverseComplete: () => {
				// on reverse complete, loader fades out
				gsap.to($preloadContainer.current, 0.6, {
					ease: Power3.easeInOut,
					opacity: 0,
					onComplete: () => {
						// triggering the spawn animation for main
						props.setSpawnMain(true)
					}
				})
			}
		})
		preloadSpawnTl.from([name.current, role.current], 1.5, { ease: Power3.easeInOut, x: "-105%" })
		preloadSpawnTl.play()
	}, [])

	let first = true
	useInterval(() => {
		setLoadpct(Math.min(loadpct + Math.floor(Math.random() * 5), 100))
		if (loadpct === 100 && first) {
			first = false
			preloadSpawnTl.reverse()
			setPreloadDespawn(true)
		}
	}, 50)

	return (
		<div ref={$preloadContainer} className="preload-container">
			<div className="background">
				<div className="noise"></div>
			</div>
			<div className="preload-wrapper">
				<div className="load-percentage">{loadpct}%</div>
				<div ref={$preloadCanvas} className="preload-canvas">
					<WigglyContainer
						parentCanvasRef={$preloadCanvas}
						index={0}
						despawn={preloadDespawn}
						spawn={true}
						fill={false}
					/>
				</div>
				<div className="title-container">
					<div ref={name} className="content">
						<p className="name">maxime</p>
						<p className="name">druart</p>
					</div>
				</div>
				<div className="title-container title-dev">
					<div ref={role} className="content">
						<p>front end</p>
						<p>‏‏‎developer</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Loader
