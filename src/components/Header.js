import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AnimationContext } from "../AnimationContext"

const Header = props => {
  const { updateContext, despawnMain, despawnMainComplete } = useContext(AnimationContext)
  const goToAbout = () => {
    // if we're on the main page, animate it then change url
    console.log("set despawn")
    // props.setDespawn(true)
    updateContext("despawnMain", true)
    // props.despawnComplete && props.history.push("/about")
    // props.history.push("/about")
  }
  useEffect(() => {
    if (despawnMain && despawnMainComplete) {
      props.history.push("/about")
      updateContext("despawnMain", false)
      updateContext("spawnMain", false)
    }
  }, [despawnMain, despawnMainComplete, props.history, updateContext])
  return (
    <header>
      <Link to='/' className='left'>
        Maxime Druart
      </Link>
      <div className='right'>
        <a className='contact' href='mailto:maxime.druart@hetic.net'>
          Contact
        </a>
        <div onClick={goToAbout} className='about'>
          About
        </div>
      </div>
    </header>
  )
}

export default Header
