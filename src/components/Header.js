import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AnimationContext } from "../AnimationContext"

const Header = props => {
  const { updateContext, ...context } = useContext(AnimationContext)
  const goToAbout = () => {
    if (props.location.pathname === "/") {
      updateContext("despawnMain", true)
    } else {
      // probably need to set up an animation from project pages to about
      props.history.push("/about")
    }
  }
  useEffect(() => {
    if (context.despawnMain && context.despawnMainComplete) {
      props.history.push("/about")
      updateContext("despawnMain", false)
      updateContext("spawnMain", false)
    }
  }, [context.despawnMain, context.despawnMainComplete, props.history, updateContext])

  const goToMain = () => {
    // animate then go back
    updateContext("despawn", true)
  }

  useEffect(() => {
    if (context.despawn) {
      props.history.goBack()
      updateContext("despawn", false)
    }
  }, [context.despawn])

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
          <div onClick={goToMain} className="about">
            Go back
          </div>
        ) : (
          <div onClick={goToAbout} className="about">
            About
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
