import React, { useEffect, useState, useRef } from "react"
import gsap, { Power1 } from "gsap"
import useEventListener from "@use-it/event-listener"

const useMouseMove = () => {
	const [coords, setCoords] = useState([0, 0])
	useEventListener("mousemove", ({ clientX, clientY }) => {
		setCoords([clientX, clientY])
	})
	return coords
}

const MouseFollower = () => {
	let $outerCircle = useRef(null)
	let $innerCircle = useRef(null)
	const [x, y] = useMouseMove()
	$outerCircle.current && gsap.to($outerCircle.current, 0.26, { ease: Power1.easeOut, x, y })
	$innerCircle.current && gsap.set($innerCircle.current, { x, y })

	return (
		<div className="mouseFollower">
			<div ref={$outerCircle} className="outer-circle"></div>
			<div ref={$innerCircle} className="inner-circle"></div>
		</div>
	)
}

export default MouseFollower
