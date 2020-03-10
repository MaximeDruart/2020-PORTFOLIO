import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
	return (
		<header>
			<Link to="/" className="left">
				Maxime Druart
			</Link>
			<div className="right">
				<a className="contact" href="mailto:maxime.druart@hetic.net">
					Contact
				</a>
				<Link to="/about" className="about">
					About
				</Link>
			</div>
		</header>
	)
}

export default Header
