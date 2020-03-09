import React, { useRef } from "react"
import WigglyContainer from "./Wiggly"

const About = () => {
  let $preloadCanvas = useRef(null)
  let $preloadContainer = useRef(null)
  return (
    <div ref={$preloadContainer} className='preload-container about-container'>
      <div className='preload-wrapper about-wrapper'>
        <div ref={$preloadCanvas} className='about-canvas'>
          <WigglyContainer parentCanvasRef={$preloadCanvas} index={0} spawn={true} fill={false} />
        </div>
        <div className='about-title'>Hello</div>
        <div className='about-intro'>
          <aside className='links'>
            <ul>
              <li className='link'>github</li>
              <li className='link'>linkedin</li>
              <li className='link'>behance</li>
              <li className='link'>email</li>
            </ul>
          </aside>
          <div className='description'>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
            dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
            consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
            sea.
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
  )
}

export default About
