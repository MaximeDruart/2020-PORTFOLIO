import React, { useEffect, useRef, useContext } from "react"
import gsap, { Power3 } from "gsap"
import uuid from "uuid"
import projectData from "../../assets/projectData"
import { Power2 } from "gsap/gsap-core"
import { AnimationContext } from "../../AnimationContext"
import ScrollToPlugin from "gsap/ScrollToPlugin"

gsap.registerPlugin(ScrollToPlugin)

const ProjectDetail = ({ project, index, history }) => {
  const $filter = useRef(null)
  const $text1 = useRef(null)
  const $text2 = useRef(null)
  const $projectDetail = useRef(null)
  const { $transitionHack } = useContext(AnimationContext)

  const goToNextProject = () => {
    let goToNextProjectTl = gsap
      .timeline({
        defaults: {
          ease: Power2.easeInOut,
          duration: 0.5
        },
        onStart: () => ($transitionHack.current.style.backgroundImage = `url(${projectData[index + 1].coverImg})`),
        onComplete: () => history.push(`/projects/${projectData[index + 1].path}`)
      })
      .addLabel("sync", "+=0.3")
    goToNextProjectTl.to($projectDetail.current, { scrollTo: "max" })
    goToNextProjectTl.to($filter.current, { opacity: 0 }, "sync")
    goToNextProjectTl.to([$text1.current, $text2.current], { x: "-100%" }, "sync")
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflowY = "visible"
    let projectSpawnTl = gsap.timeline({
      paused: true,
      defaults: {
        ease: Power3.easeInOut,
        duration: 0.6
      }
    })

    projectSpawnTl.play()
  }, [])
  return (
    <div ref={$projectDetail} className="project-detail">
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
          <div id="next-project" onClick={goToNextProject} className="next-project-detail">
            <div ref={$filter} className="filter"></div>
            <div style={{ backgroundImage: `url(${projectData[index + 1].coverImg})` }} className="banner-img"></div>
            <div className="banner-text">
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
