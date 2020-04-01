import React, { useRef, useEffect, useState, useContext, useMemo } from "react"
import WigglyContainer from "./Wiggly"
import useEventListener from "@use-it/event-listener"
import { AnimationContext } from "../AnimationContext"
import gsap, { Power3 } from "gsap"

let opacityDecayStrength = window.innerWidth <= 576 ? 350 : 200
const useMouseWheel = $element => {
  const [scroll, setScroll] = useState($element?.current?.scrollTop || 0)
  useEventListener("scroll", () => setScroll($element.current.scrollTop), $element.current)
  return scroll
}

const About = props => {
  const { updateContext, removeLoader, despawnAbout } = useContext(AnimationContext)
  let [despawnAboutWiggly, setDespawnAboutWiggly] = useState(false)

  let $aboutCanvas = useRef(null)
  let $content = useRef(null)
  let $title = useRef(null)
  let $aboutContainer = useRef(null)

  const scroll = useMouseWheel($aboutContainer)

  // animating content scroll
  useEffect(() => {
    gsap.to($title.current, 0.3, {
      opacity: Math.max(0, 1 - $aboutContainer.current.scrollTop / opacityDecayStrength)
    })
  }, [scroll])

  // about spawn animation
  useEffect(() => {
    document.body.style.overflowY = "hidden"
    if (removeLoader) {
      gsap.to($content.current, {
        duration: 0.5,
        ease: Power3.easeOut,
        opacity: 1
      })
      gsap.to($title.current, {
        duration: 0.5,
        ease: Power3.easeOut,
        opacity: 1
      })
    }
  }, [removeLoader])

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
    despawnAbout && despawnTl.play()
  }, [despawnAbout, props.history, updateContext])

  useEffect(() => {
    // const resizeHandler = () => {
    //   textScrollHeight =
    //     window.innerWidth > 576 && window.innerWidth < 1100 ? -window.innerHeight * 0.6 : -window.innerHeight * 0.5
    // }
    // window.addEventListener("resize", resizeHandler)
    // return () => window.removeEventListener("resize", resizeHandler)
  }, [])

  const wiggly = useMemo(
    () => (
      <WigglyContainer
        parentCanvasRef={$aboutCanvas}
        duration={1}
        despawnEase={"Power3.easeIn"}
        despawn={despawnAboutWiggly}
        index={0}
        spawn={removeLoader && true}
        fill={false}
      />
    ),
    [$aboutCanvas, despawnAboutWiggly, removeLoader]
  )

  return (
    <div ref={$aboutContainer} className="about-container">
      <div ref={$aboutCanvas} className="about-canvas">
        {wiggly}
      </div>
      <div ref={$title} style={{ opacity: 0 }} className="about-title">
        Hello
      </div>
      <div className="about-wrapper">
        <div ref={$content} style={{ opacity: 0 }} className="about-content">
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
              Hello ! My name is Maxime Druart and i'm a Paris based web developer with a keen interest in visual
              creation through programming. Currently studying at
              <a href="https://hetic.net" target="_blank" rel="noopener noreferrer">
                {" "}
                HETIC
              </a>
              , learning design and web development. I like building interactive experiences on the web with Javascript
              and/or canvas. I'm always looking forward to learning new things and as of now I'm interested in learning
              about creating back-end systems and WebGL.
              <div style={{ fontWeight: 600 }}>
                Hey ! I'm also looking for an internship in Paris from July 2020 to September 2020, hit me up !
              </div>
            </div>
          </div>
          <div className="about-skills">
            <div className="skills-title">skills</div>
            <div className="skills-dev">
              <div className="title">development</div>
              <ul>
                <li>html</li>
                <li>css</li>
                <li>javascript</li>
                <li>react</li>
                <li>gsap</li>
                <li>canvas</li>
                <li>pixi.js</li>
                <li>sass</li>
                <li>nodejs</li>
                <li>mongodb</li>
                <li>python</li>
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
