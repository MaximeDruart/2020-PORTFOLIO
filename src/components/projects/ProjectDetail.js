import React, { useEffect, useRef, useContext, useState } from "react"
import gsap, { Power3 } from "gsap"
import uuid from "uuid"
import projectData from "../../assets/projectData"
import { Power2 } from "gsap/gsap-core"
import { AnimationContext } from "../../AnimationContext"
import ScrollToPlugin from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin)

const ProjectDetail = ({ project, index, history }) => {
  const $projectDetail = useRef(null)
  const $banner = useRef(null)
  const $bannerImg = useRef(null)
  const $projectTitle = useRef(null)
  const $content = useRef(null)
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
    let projectPageHeight =
      $projectTitle?.current.getBoundingClientRect().height + $content?.current.getBoundingClientRect().height
    let once = true
    const scrollCb = () => {
      if ($projectDetail.current) {
        if ($projectDetail.current.style.overflowY === "scroll") {
          $projectTitle.current.style.transform = `translateX(-${$projectDetail.current.scrollTop}px)`
          $bannerImg.current.style.transform = `scale(${1 +
            $projectDetail.current.scrollTop / (window.innerHeight * 4)})`
        }
        if ($projectDetail.current.scrollTop + 100 > projectPageHeight && projectData.length < index) {
          if (once) {
            once = !once
            goToNextProject()
          }
        }
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
        <div ref={$bannerImg} style={{ backgroundImage: `url(${project?.coverImg})` }} className="banner-img"></div>
      </div>
      <div className="project-title-wrapper">
        <h1 className="project-title" ref={$projectTitle}>
          {project?.name}
        </h1>
      </div>
      <div ref={$content} className="content">
        <div className="general-infos">
          <div className="left">
            <div className="info-date info-block">
              <div className="info-label">Date</div>
              <div className="info-content">{project?.date}</div>
            </div>
            <div className="info-role info-block">
              <div className="info-label">Role</div>
              <div className="info-content">{project?.role}</div>
            </div>
            <div className="info-techs info-block">
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
          <div className="right">
            <div className="info-decription">{project?.description}</div>
            <div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={project?.websiteLink}
                className="info-link info-website">
                {project.websiteLink && "Visit site"}
              </a>
            </div>
            <div>
              <a target="_blank" rel="noopener noreferrer" href={project?.githubLink} className="info-link info-github">
                {project.githubLink && "See on github"}
              </a>
            </div>
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
