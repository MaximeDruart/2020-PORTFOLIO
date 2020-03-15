import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AnimationContext } from "../AnimationContext"

const Header = props => {
  const { updateContext, ...context } = useContext(AnimationContext)
  const goToAbout = () => {
    window.scrollTo(0, 0)
    if (props.location.pathname === "/") {
      updateContext("despawnMain", true)
    } else {
      // probably need to set up an animation from project pages to about
      console.log(props.history)
      props.history.push("/about")
    }
  }
  useEffect(() => {
    if (context.despawnMain && context.despawnMainComplete) {
      props.history.push("/about")
      updateContext("spawnMain", false)
      updateContext("despawnMain", false)
      updateContext("despawnMainComplete", false)
    }
  }, [context.despawnMain, context.despawnMainComplete, props.history, updateContext])

  const goToMain = () => {
    // animate then go back
    console.log("going to main")
    updateContext("despawnAbout", true)
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
        {props.location.pathname === "/about" ? (
          <div href="#" onClick={goToMain} className="about">
            Go back
          </div>
        ) : (
          <div href="#" onClick={goToAbout} className="about">
            About
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
