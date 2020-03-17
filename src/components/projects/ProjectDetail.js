import React, { useEffect, useRef, useContext, useState } from "react"
import gsap, { Power3 } from "gsap"
import uuid from "uuid"
import projectData from "../../assets/projectData"
import { Power2 } from "gsap/gsap-core"
import { AnimationContext } from "../../AnimationContext"
import useEventListener from "@use-it/event-listener"
import ScrollToPlugin from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

const useScroll = () => {
  const [scroll, setScroll] = useState(0)
  // setScroll(scroll => scroll + deltaY))
  useEventListener("scroll", () => setScroll(document.documentElement.scrollTop))
  return scroll
}

const ProjectDetail = ({ project, index, history }) => {
  const $projectDetail = useRef(null)
  const $banner = useRef(null)
  const $projectTitle = useRef(null)
  const $filter = useRef(null)
  const $text1 = useRef(null)
  const $text2 = useRef(null)
  const { $transitionHack, removeLoader } = useContext(AnimationContext)

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
    const scrollCb = () => {
      if ($projectDetail.current) {
        if ($projectDetail.current.style.overflowY === "scroll")
          $projectTitle.current.style.transform = `translateX(-${$projectDetail.current.scrollTop}px)`
      }
    }

    window.addEventListener("wheel", scrollCb)
    return () => window.removeEventListener("scroll", scrollCb)
  }, [$projectDetail.current])

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflowY = "visible"
    let projectSpawnTl = gsap.timeline({
      paused: true,
      defaults: {
        ease: Power3.easeInOut,
        duration: 0.6
      },
      onComplete: () => {
        if ($projectDetail.current) $projectDetail.current.style.overflowY = "scroll"
      }
    })
    projectSpawnTl.to($banner.current, { height: "89vh" })
    projectSpawnTl.from($projectTitle.current, { x: "100vw" })

    removeLoader && projectSpawnTl.play()
  }, [removeLoader])

  return (
    <div ref={$projectDetail} className="project-detail">
      <div ref={$banner} className="banner">
        <div style={{ backgroundImage: `url(${project?.coverImg})` }} className="banner-img"></div>
      </div>
      <div className="project-title-wrapper">
        <h1 className="project-title" ref={$projectTitle}>
          {project?.name}
        </h1>
      </div>
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
