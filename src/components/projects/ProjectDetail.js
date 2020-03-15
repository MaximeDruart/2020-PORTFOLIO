import React, { useEffect, useRef, useContext } from "react"
import gsap, { Power3 } from "gsap"
import uuid from "uuid"
import projectData from "../../assets/projectData"
import { Power2 } from "gsap/gsap-core"
import { AnimationContext } from "../../AnimationContext"

const ProjectDetail = ({ project, index, history }) => {
  const $filter = useRef(null)
  const $text1 = useRef(null)
  const $text2 = useRef(null)
  const { $transitionHack } = useContext(AnimationContext)

  const goToNextProject = () => {
    // scroll to bottom
    window.scrollTo(0, document.body.scrollHeight)
    // animate
    let goToNextProjectTl = gsap
      .timeline({
        ease: Power2.easeInOut,
        duration: 0.5,
        onStart: () => ($transitionHack.current.style.backgroundImage = `url(${projectData[index + 1].coverImg})`),
        onComplete: () => history.push(`/projects/${projectData[index + 1].path}`)
      })
      .addLabel("sync")
    goToNextProjectTl.to($filter.current, { opacity: 0 }, "sync")
    goToNextProjectTl.to([$text1.current, $text2.current], { x: "-100%" }, "sync")
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflowY = "visible"
    let projectSpawnTl = gsap.timeline({ paused: true, ease: Power3.easeInOut })
  }, [])
  return (
    <div className="projectDetail">
      <div className="banner">
        <div style={{ backgroundImage: `url(${project?.coverImg})` }} className="banner-img"></div>
      </div>
      <h1>{project?.name}</h1>
      <div className="content">
        <div className="general-infos">
          <div className="info-date">
            <div className="info-label">Date</div>
            <div className="info-content">{project?.date}</div>
          </div>
          <div className="info-role">
            <div className="info-label">Role</div>
            <div className="info-content">{project?.role}</div>
          </div>
          <div className="info-techs">
            <div className="info-label">Techs</div>
            <ul className="info-content">
              {project?.techs.map(tech => (
                <li key={uuid()} className="tech">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="project-specific-content">{project?.component()}</div>
        {projectData[index + 1] && (
          <div className="next-project-detail">
            <div ref={$filter} className="filter"></div>
            <div style={{ backgroundImage: `url(${projectData[index + 1].coverImg})` }} className="banner-img"></div>
            <div onClick={goToNextProject} className="banner-text">
              <div className="next-text next-project">
                <div ref={$text1} className="text-content">
                  Next project
                </div>
              </div>
              <div className="next-text next-name">
                <div ref={$text2} className="text-content">
                  {projectData[index + 1].name}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectDetail
