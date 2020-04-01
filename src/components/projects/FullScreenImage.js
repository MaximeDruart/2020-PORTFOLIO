import React, { useRef, useEffect, useContext, useState } from "react"
import Rellax from "rellax"
import AnimationContext from "../../AnimationContext"

const FullScreenImage = ({ src, scrollDOM }) => {
  const $img = useRef(null)
  const $projectDetail = useContext(AnimationContext)
  const [lastScrollDOMHeight, setLastScrollDOMHeight] = useState(scrollDOM?.current?.scrollHeight || 0)

  useEffect(() => {
    // console.log("calculating relax", scrollDOM.current.scrollHeight, $img.current.scrollHeight)
    $img.current.style.transform = ""

    let rellax
    // let rellax = new Rellax($img.current, {
    //   speed: -2,
    //   center: true,
    //   wrapper: scrollDOM.current,
    //   round: true,
    //   vertical: true,
    //   horizontal: false
    // })

    if (lastScrollDOMHeight !== scrollDOM.current.scrollHeight) {
      setLastScrollDOMHeight(scrollDOM.current.scrollHeight)
      rellax && rellax.destroy()
      rellax = new Rellax($img.current, {
        speed: -2,
        center: true,
        wrapper: scrollDOM.current,
        round: true,
        vertical: true,
        horizontal: false
      })
    }
  }, [scrollDOM, lastScrollDOMHeight, setLastScrollDOMHeight])
  return (
    <div className="full-screen-image-wrapper">
      <img ref={$img} className="full-screen-image rellax" src={src} alt="" />
    </div>
  )
}

export default FullScreenImage
