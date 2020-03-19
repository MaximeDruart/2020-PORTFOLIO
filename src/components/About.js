import React, { useRef, useEffect, useState, useContext } from "react"
import WigglyContainer from "./Wiggly"
import useEventListener from "@use-it/event-listener"
import { AnimationContext } from "../AnimationContext"
import gsap, { Power3 } from "gsap"

// handling that wierd width between desktop and mobile
let textScrollHeight =
  window.innerWidth > 576 && window.innerWidth < 1100 ? -window.innerHeight * 0.55 : -window.innerHeight * 0.5
const useMouseWheel = () => {
  const [scroll, setScroll] = useState(0)
  useEventListener("wheel", ({ deltaY }) => setScroll(scroll => scroll + deltaY))
  // useEventListener("touchmove", ({ deltaY }) => setScroll(scroll => scroll + deltaY))
  return scroll
}

const About = props => {
  const { updateContext, ...context } = useContext(AnimationContext)
  let $preloadCanvas = useRef(null)
  let $content = useRef(null)
  let $title = useRef(null)
  let $preloadContainer = useRef(null)
  let [animatingStart, setAnimatingStart] = useState(true)
  // const scroll = { value: Math.max(textScrollHeight + useMouseWheel(), textScrollHeight) }
  const scroll = {
    value: gsap.utils.clamp(
      textScrollHeight,
      textScrollHeight + ($content?.current?.getBoundingClientRect()?.height || 100000),
      textScrollHeight + useMouseWheel()
    )
  }
  let [despawnAboutWiggly, setDespawnAboutWiggly] = useState(false)

  // about spawn animation
  useEffect(() => {
    document.body.style.overflowY = "hidden"
    if (context.removeLoader) {
      gsap.to($content.current, {
        duration: 0.5,
        ease: Power3.easeOut,
        opacity: 1
      })
      gsap.to($title.current, {
        duration: 0.5,
        ease: Power3.easeOut,
        opacity: 1,
        onComplete: () => setAnimatingStart(false)
      })
    }
  }, [context.removeLoader])

  // despawn animation
  useEffect(() => {
    let despawnTl = gsap
      .timeline({
        paused: true,
        defaults: {
          ease: Power3.easeIn,
          duration: 1
        },
        onStart: () => setDespawnAboutWiggly(true),
        onComplete: () => {
          updateContext("despawnAbout", false)
          setTimeout(() => props.history.goBack(), 220)
        }
      })
      .addLabel("sync")
    despawnTl.to($content.current, { y: window.innerHeight }, "sync")
    despawnTl.to($title.current, { opacity: 0 }, "sync")
    context.despawnAbout && despawnTl.play()
  }, [context.despawnAbout, props.history, updateContext])

  return (
    <div ref={$preloadContainer} className="preload-container about-container">
      <div className="preload-wrapper about-wrapper">
        <div ref={$preloadCanvas} className="about-canvas">
          <WigglyContainer
            parentCanvasRef={$preloadCanvas}
            duration={1}
            despawnEase={"Power3.easeIn"}
            despawn={despawnAboutWiggly}
            index={0}
            spawn={context.removeLoader && true}
            fill={false}
          />
        </div>
        {/** the opacity maths are purely random don't search any actual reasoning it just looks cool with those values */}
        <div
          ref={$title}
          style={{
            opacity: animatingStart
              ? 0
              : `${Math.max(0, 1 - 2.4 * ((scroll.value - textScrollHeight) / window.innerHeight))}`
          }}
          className="about-title">
          Hello
        </div>
        <div
          ref={$content}
          style={{ transform: `translateY(${-scroll.value}px)`, opacity: 0 }}
          className="about-content">
          <div className="about-intro">
            <aside className="links">
              <ul>
                <li className="link">
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/MaximeDruart">
                    github
                  </a>
                </li>
                <li className="link">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/maxime-druart/">
                    linkedin
                  </a>
                </li>
                <li className="link">
                  <a target="_blank" rel="noopener noreferrer" href="https://www.behance.net/maximedruart">
                    behance
                  </a>
                </li>
                <li className="link">
                  <a target="_blank" rel="noopener noreferrer" href="mailto:maxime.druart@hetic.net">
                    email
                  </a>
                </li>
              </ul>
            </aside>
            <div className="description">
              Salut ! Je m'appelle Maxime Druart et je suis un développeur Web avec un intéret particulier pour la
              création graphique via le code. Actuellement étudiant à{" "}
              <a href="https://hetic.net" target="_blank" rel="noopener noreferrer">
                HETIC
              </a>
              , j'apprends le design et le développement web. J'aime construire des expériences intéractives en
              Javascript avec du canvas ou du CSS. Je suis toujours à la recherche de nouvelles choses à apprendre et je
              me forme aujourd'hui personnellement à la création de système back-end et au WebGL.
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
