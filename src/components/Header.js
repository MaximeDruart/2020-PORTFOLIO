import React, { useEffect } from "react"
import { useContext } from "react"
import { AnimationContext } from "../AnimationContext"
import { gsap, Power3 } from "gsap"

const Header = props => {
  const { updateContext, ...context } = useContext(AnimationContext)

  const goToAbout = () => {
    window.scrollTo(0, 0)
    context.$transitionHack.current.style.backgroundImage = ""
    if (props.location.pathname === "/") {
      updateContext("despawnMain", true)
    } else {
      // probably need to set up an animation from project pages to about
      // props.history.push("/about")
      goToPageFromProject("/about")
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

  const goToMainFromAbout = () => {
    updateContext("despawnAbout", true)
  }

  const goToPageFromProject = path => {
    let mainFromProjectTl = gsap.timeline({
      defaults: {
        ease: Power3.easeInOut,
        duration: 0.6
      },
      onComplete: () => {
        props.history.push(path)
        gsap.set(context.$transitionHack.current, { zIndex: -10, backgroundColor: "transparent" })
      }
    })
    mainFromProjectTl.set(context.$transitionHack.current, {
      zIndex: 500,
      backgroundImage: "",
      backgroundColor: "black",
      opacity: 0
    })
    mainFromProjectTl.to(context.$transitionHack.current, { opacity: 1 })
  }

  return (
    <header>
      <div className="left">
        <p onClick={() => props.location.pathname !== "/" && goToPageFromProject("/")} href="#" className="p1">
          maxime druart
        </p>
        <p onClick={() => props.location.pathname !== "/" && goToPageFromProject("/")} href="#" className="p2">
          {props.location.pathname.indexOf("project") >= 0 ? "go back" : "web developper"}
        </p>
      </div>
      <div className="right">
        <a className="contact" href="mailto:maxime.druart@hetic.net">
          Contact
        </a>
        {props.location.pathname === "/about" ? (
          <div href="#" onClick={goToMainFromAbout} className="about">
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
