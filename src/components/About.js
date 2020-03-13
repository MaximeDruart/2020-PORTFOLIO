import React, { useRef, useEffect, useState } from "react"
import WigglyContainer from "./Wiggly"
import useEventListener from "@use-it/event-listener"
import { CSSTransition } from "react-transition-group"

let textScrollHeight = -window.innerHeight * 0.52
const useMouseWheel = () => {
  const [scroll, setScroll] = useState(0)
  useEventListener("wheel", ({ deltaY }) => setScroll(scroll => scroll + deltaY))
  return scroll
}

const About = () => {
  let $preloadCanvas = useRef(null)
  let $preloadContainer = useRef(null)
  const scroll = Math.max(textScrollHeight + useMouseWheel(), textScrollHeight)

  useEffect(() => {
    document.body.style.overflowY = "hidden"
  }, [])

  return (
    <div ref={$preloadContainer} className='preload-container about-container'>
      <div className='preload-wrapper about-wrapper'>
        <div ref={$preloadCanvas} className='about-canvas'>
          <WigglyContainer parentCanvasRef={$preloadCanvas} index={0} spawn={true} fill={false} />
        </div>
        <div style={{ opacity: `${Math.max(0, (-scroll - 300) / 180)}` }} className='about-title'>
          Hello
        </div>
        <div style={{ transform: `translateY(${-scroll}px)` }} className='about-content'>
          <div className='about-intro'>
            <aside className='links'>
              <ul>
                <li className='link'>
                  <a target='_blank' rel='noopener noreferrer' href='https://github.com/MaximeDruart'>
                    github
                  </a>
                </li>
                <li className='link'>
                  <a target='_blank' rel='noopener noreferrer' href='https://www.linkedin.com/in/maxime-druart/'>
                    linkedin
                  </a>
                </li>
                <li className='link'>
                  <a target='_blank' rel='noopener noreferrer' href='https://www.behance.net/maximedruart'>
                    behance
                  </a>
                </li>
                <li className='link'>
                  <a target='_blank' rel='noopener noreferrer' href='mailto:maxime.druart@hetic.net'>
                    email
                  </a>
                </li>
              </ul>
            </aside>
            <div className='description'>
              Salut ! Je m'appelle Maxime Druart et je suis un développeur Web avec un intéret particulier pour la
              création graphique via le code. Actuellement étudiant à{" "}
              <a href='https://hetic.net' target='_blank' rel='noopener noreferrer'>
                HETIC
              </a>
              , j'apprends le design et le développement web. J'aime construire des expériences intéractives en
              Javascript avec du canvas ou du CSS. Je suis toujours à la recherche de nouvelles choses à apprendre et je
              me forme aujourd'hui personnellement à la création de système back-end et au WebGL.
            </div>
          </div>
          <div className='about-skills'>
            <div className='skills-title'>skills</div>
            <div className='skills-dev'>
              <div className='title'>development</div>
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
            <div className='skills-design'>
              <div className='title'>design</div>
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
