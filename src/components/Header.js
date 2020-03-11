import React from "react"
import { Link } from "react-router-dom"

const Header = props => {
	const goToAbout = () => {
		// if we're on the main page, animate it then change url
		console.log("set despawn")
		props.setDespawn(true)
		// props.despawnComplete && props.history.push("/about")
		props.history.push("/about")
	}
	return (
		<header>
			<Link to="/" className="left">
				Maxime Druart
			</Link>
			<div className="right">
				<a className="contact" href="mailto:maxime.druart@hetic.net">
					Contact
				</a>
				<div onClick={goToAbout} className="about">
					About
				</div>
			</div>
		</header>
	)
}

export default Header
