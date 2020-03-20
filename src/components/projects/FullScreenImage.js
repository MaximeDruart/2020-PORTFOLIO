import React, { useRef } from "react"
// import gsap from "gsap"
// import { AnimationContext } from "../../AnimationContext"

const FullScreenImage = ({ src }) => {
  const $img = useRef(null)
  // const { $projectDetail } = useContext(AnimationContext)
  // useEffect(() => {
  //   // let projectPageHeight =
  //   //   $projectTitle?.current.getBoundingClientRect().height + $content?.current.getBoundingClientRect().height
  //   // const scrollCb = () => {
  //   //   if ($projectDetail.current) {
  //   //     console.log($projectDetail.current.scrollTop)
  //   //   }
  //   // }
  //   // window.addEventListener("wheel", scrollCb)
  //   // return () => window.removeEventListener("scroll", scrollCb)
  // }, [$projectDetail])
  return (
    <div className="full-screen-image-wrapper">
      <img ref={$img} className="full-screen-image" src={src} alt="" />
    </div>
  )
}

export default FullScreenImage
