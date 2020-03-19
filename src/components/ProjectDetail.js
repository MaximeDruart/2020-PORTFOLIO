import React, { useEffect, useRef, useContext, useCallback, useState } from "react"
import "./projects/projects.scss"
import uuid from "uuid"
import projectData from "../assets/projectData"
import { AnimationContext } from "../AnimationContext"
import gsap, { Power2, Power3 } from "gsap"
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

  const [isScrollEnabled, setisScrollEnabled] = useState(true)

  const goToNextProject = useCallback(() => {
    let goToNextProjectTl = gsap
      .timeline({
        defaults: {
          ease: Power2.easeInOut,
          duration: 0.5
        },
        onStart: () => {
          setisScrollEnabled(false)
          $transitionHack.current.style.backgroundImage = `url(${projectData[index + 1].coverImg})`
        },
        onComplete: () => history.push(`/projects/${projectData[index + 1].path}`)
      })
      .addLabel("sync", "+=0.3")
    goToNextProjectTl.to($projectDetail.current, { scrollTo: "max" })
    goToNextProjectTl.to($filter.current, { opacity: 0 }, "sync")
    goToNextProjectTl.to([$text1.current, $text2.current], { x: "-100%" }, "sync")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // console.log($projectTitle.current.getBoundingClientRect().height, $content.current.getBoundingClientRect().height)
    let once = true,
      manualScroll = true
    const scrollCb = event => {
      // i kinda don't want to calculate on each wheel event but apparently it changes throughout the page :/
      let projectPageHeight =
        $projectTitle.current.getBoundingClientRect().height + $content.current.getBoundingClientRect().height

      // kinda buggy but it's the best i can do as i can't use the scroll event.
      if (!isScrollEnabled) {
        manualScroll = false
        gsap.set($projectDetail.current, { scrollTo: "max" })
      }
      // animating the title
      if ($projectDetail.current) {
        if ($projectDetail.current.style.overflowY === "scroll") {
          $projectTitle.current.style.transform = `translateX(-${$projectDetail.current.scrollTop}px)`
          $bannerImg.current.style.transform = `scale(${1 +
            $projectDetail.current.scrollTop / (window.innerHeight * 4)})`
        }
        // if we're on the bottom of the page automatically go to next project
        if ($projectDetail.current.scrollTop + 100 > projectPageHeight && projectData.length - 1 !== index) {
          if (once) {
            once = !once
            manualScroll && goToNextProject()
          }
        }
      }
    }

    // the problem here is that the text needs to be updated when the touchmove inertia is kicking in but during that time no actual event is triggered so on touch end we're dispatching wheel events for 2secs
    window.addEventListener("wheel", scrollCb)
    window.addEventListener("touchmove", scrollCb)
    // window.addEventListener("touchmove", event => (isScrollEnabled ? scrollCb() : event.preventDefault()))

    const inertiaHandler = () => {
      let time = 0,
        delay = 10
      let interval = setInterval(() => {
        if (time < delay * 200) {
          time += delay
          window.dispatchEvent(new Event("wheel"))
        } else clearInterval(interval)
      }, delay)
    }
    window.addEventListener("touchend", inertiaHandler)
    return () => {
      window.removeEventListener("wheel", scrollCb)
      window.removeEventListener("touchmove", scrollCb)
      window.removeEventListener("touchend", inertiaHandler)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrollEnabled])

  // useEffect(() => {
  //   updateContext("$projectDetail", $projectDetail)
  // }, [])

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
        {project?.component()}
        {project.credits && (
          <div className="credits">
            <h3 className="credits-title">Credits</h3>
            <ul className="credit-list">
              {Object.keys(project.credits).map(cred => (
                <li className="credit" key={uuid()}>
                  <span className="key">{cred}</span> :
                  <a target="_blank" rel="noopener noreferrer" href={project.credits[cred].link} className="value">
                    {project.credits[cred].name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        {projectData[index + 1] && (
          <div href="#" id="next-project" onClick={goToNextProject} className="next-project-detail">
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
