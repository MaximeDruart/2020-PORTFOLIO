/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useContext } from "react"
// import { Sprite, Stage, useTick, Graphics } from "@inlet/react-pixi"
import { Sprite, Stage, useTick, Graphics, useApp } from "@inlet/react-pixi"
// import { AdjustmentFilter } from "@pixi/filter-adjustment"
// import { ShockwaveFilter } from "@pixi/filter-shockwave"
import * as PIXI from "pixi.js"
import SimplexNoise from "simplex-noise"
import gsap, { Power2, Power3, Power1 } from "gsap"
import projectData from "../assets/projectData"
import { AnimationContext } from "../AnimationContext"

// gsap.ticker.useRAF(true)
// console.log(gsap.ticker)
gsap.ticker.lagSmoothing(0)
// import PixiPlugin from 'gsap/PixiPlugin'
// gsap.registerPlugin(PixiPlugin)

let simplex = new SimplexNoise(Math.random())
let mask
let points
const map = (n, start1, stop1, start2, stop2) => ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
const constrain = (n, low, high) => Math.max(Math.min(n, high), low)

const Wiggly = props => {
  let [yOffset, setYOffset] = useState(0)
  // eslint-disable-next-line no-unused-vars
  let [alpha, setAlpha] = useState(0.65)
  let [isInteractive, setIsInteractive] = useState(true)
  let [drawOffset, setDrawOffset] = useState({ x: props.cWidth / 2, y: props.cWidth / 2 })
  let [isOpen, setIsOpen] = useState(false)
  let [allowHover, setAllowHover] = useState(false)
  // as we have access we could probably try to destroy it somewhere to avoid clogging webgl canvases instances but haven't found where and when.
  // const app = useApp()

  // eslint-disable-next-line no-unused-vars
  let [circleData, setCircleData] = useState({
    noiseStrength: 0.07,
    vertexCount: 30,
    yOffsetIncrement: 0.01,
    size: {
      value: 0,
      baseValue: 0,
      variation: 0
    },
    fill: props.fill
  })

  const getCircle = () => {
    let points = []
    for (let i = 0; i < circleData.vertexCount; i++) {
      let angleRad = ((i / circleData.vertexCount) * 360 * Math.PI) / 180
      let angleDeg = (i / circleData.vertexCount) * 360
      let noiseVal = map(
        simplex.noise2D(angleDeg, yOffset),
        -1,
        1,
        1 - circleData.noiseStrength,
        1 + circleData.noiseStrength
      )
      let x = Math.cos(angleRad) * circleData.size.value * noiseVal
      let y = Math.sin(angleRad) * circleData.size.value * noiseVal
      points.push({ x, y })
    }
    return points
  }

  const draw = (graphics, points, offsetX = 0, offsetY = 0) => {
    graphics.clear()
    graphics.lineStyle(15, 0xffffff)
    circleData.fill && graphics.beginFill(0xffffff)

    // https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas
    graphics.moveTo(points[0].x + offsetX, points[0].y + offsetY)
    for (let i = 1; i <= points.length - 2; i++) {
      const xc = (points[i].x + offsetX + points[i + 1].x + offsetX) / 2
      const yc = (points[i].y + offsetY + points[i + 1].y + offsetY) / 2
      graphics.quadraticCurveTo(points[i].x + offsetX, points[i].y + offsetY, xc, yc)
    }
    // curve through the last two points
    let xc = (points[points.length - 1].x + offsetX + points[0].x + offsetX) / 2
    let yc = (points[points.length - 1].y + offsetY + points[0].y + offsetY) / 2
    graphics.quadraticCurveTo(points[points.length - 1].x + offsetX, points[points.length - 1].y + offsetY, xc, yc)
    xc = (points[0].x + offsetX + points[1].x + offsetX) / 2
    yc = (points[0].y + offsetY + points[1].y + offsetY) / 2
    graphics.quadraticCurveTo(points[0].x + offsetX, points[0].y + offsetY, xc, yc)

    circleData.fill && graphics.endFill()
  }

  useTick(() => {
    setYOffset(yOffset => yOffset + circleData.yOffsetIncrement)
    circleData.size.value += map(simplex.noise3D(0, 0, yOffset), -1, 1, -0.25, 0.25)
    circleData.size.value = constrain(
      circleData.size.value,
      circleData.size.baseValue - circleData.size.variation,
      circleData.size.baseValue + circleData.size.variation
    )
    if (props.img) {
      points = getCircle()
      draw(mask, points, drawOffset.x, drawOffset.y)
    }
  })

  const openProject = useCallback(() => {
    props.setTransform(-props.projectSize * props.index + 100 / 2 - props.projectSize / 2, true)
    props.setZIndex(10)
    props.updateCSize()
    setAllowHover(false)
    setDrawOffset({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    setIsInteractive(false)
    setIsOpen(true)
    props.updateContext("isOpen", true)
    let openProjectTl = gsap
      .timeline({
        defaults: { ease: Power2.easeInOut },
        onComplete: () => {
          props.updateContext("isOpen", false)
          props.setRedirectWithParam(projectData[props.index].path)
        }
      })
      .addLabel("sync")

    let circleEndSize = window.innerWidth < 576 ? window.innerWidth * 1.4 : window.innerWidth

    openProjectTl.to(getCurrents(props.$projectNames), 0.8, { opacity: 0 }, "sync")
    openProjectTl.to(props.$progressionCircle.current, 0.8, { opacity: 0 }, "sync")
    openProjectTl.to(circleData, 0.8, { noiseStrength: 0.6, yOffsetIncrement: 0.04 }, "sync")
    openProjectTl.to(circleData.size, 0.2, { baseValue: circleData.size.baseValue * 0.7, delay: -0.2 })
    openProjectTl.to(circleData.size, 1, { ease: Power2.easeIn, baseValue: circleEndSize })
  }, [props])

  const getCurrents = refs => {
    let currs = []
    refs.forEach((name, index) => (currs[index] = name.current))
    return currs
  }

  useEffect(() => {
    mask = new PIXI.Graphics()
    simplex = new SimplexNoise(Math.random())
  }, [])

  useEffect(() => {
    if (props.spawn && !props.fill) {
      gsap.to(circleData.size, 1, { ease: Power3.easeInOut, baseValue: props.cWidth * 0.4, variation: 15 })
    }
    if (props.context.spawnMain && props.fill) {
      gsap.to(getCurrents(props.$projectNames), 1.5, { delay: props.index * 0.2, ease: Power3.easeOut, opacity: 1 })
      gsap.to(circleData.size, 1.5, {
        delay: props.index * 0.2,
        ease: Power3.easeOut,
        baseValue: props.cWidth * 0.4,
        variation: 15,
        onComplete: () => setAllowHover(true)
      })
    }
  }, [props.spawn, props.context.spawnMain])

  const getDespawnMainTl = useCallback(() => {
    let despawnTl = new gsap.timeline({
      paused: true,
      defaults: { ease: Power1.easeIn, duration: 0.7 },
      onComplete: () => {
        props.updateContext("despawnMainComplete", true)
        destroyCanvas()
      }
    }).addLabel("sync")
    despawnTl.to(circleData.size, { baseValue: 0, variation: 0 }, "sync")
    despawnTl.to(getCurrents(props.$projectNames), { opacity: 0 }, "sync")
    return despawnTl
  }, [])

  useEffect(() => {
    props.context.despawnMain && props.fill && getDespawnMainTl().play()
  }, [props.context.despawnMain])

  const destroyCanvas = () => {
    // app.ticker.destroy()
    // app.stage.destroy()*
    // console.log("destroying canvas", app)
    // app.stop()
  }

  useEffect(() => {
    props.despawn &&
      gsap.to(circleData.size, props.duration || 1.3, {
        ease: props.despawnEase || Power2.easeInOut,
        baseValue: 0,
        variation: 0,
        onComplete: destroyCanvas
      })
  }, [props.despawn])

  // hover animation
  useEffect(() => {
    if (props.parentCanvasRef || props.$parentCanvases) {
      const parentCanvasRef = props.fill ? props.$parentCanvases[props.index].current : props.parentCanvasRef.current

      let mousePosHandler = e => {
        let { top, bottom, right, left } = parentCanvasRef.getBoundingClientRect()
        let x = (right + left) / 2
        let y = (bottom + top) / 2
        let distanceToWiggly =
          1 -
          Math.sqrt(
            Math.pow((x - e.clientX) / window.innerWidth, 2) + Math.pow((y - e.clientY) / window.innerHeight, 2)
          )
        circleData.yOffsetIncrement = map(distanceToWiggly, 0.3, 1, 0.01, 0.05)
      }
      window.addEventListener("mousemove", mousePosHandler)
      return () => window.removeEventListener("mousemove", mousePosHandler)
    }

    // if (props.$parentCanvases[0].current || props.parentCanvasRef) {
    //   const parentCanvasRef = props.$parentCanvases[props.index].current
    // }
  }, [props.$parentCanvases, props.parentCanvasRef, allowHover])

  const getImgSize = useCallback(() => {
    let imgGen = new Image()
    imgGen.src = props.img
    let size = {
      width: window.innerWidth,
      height: imgGen.height * (window.innerWidth / imgGen.width)
    }
    if (size.height < window.innerHeight) {
      size = {
        height: window.innerHeight,
        width: imgGen.width * (window.innerHeight / imgGen.height)
      }
    }
    return size
  }, [props.img])

  return props.img ? (
    <Sprite
      pointerup={openProject}
      pointerover={() =>
        circleData.size.baseValue !== props.cWidth / 2 &&
        gsap.to(circleData.size, 0.55, { ease: Power2.easeOut, baseValue: props.cWidth / 2 })
      }
      pointerout={() => gsap.to(circleData.size, 0.55, { ease: Power2.easeOut, baseValue: props.cWidth * 0.4 })}
      alpha={isOpen ? 1 : alpha}
      interactive={isInteractive}
      image={props.img}
      anchor={[0.5, 0.5]}
      width={getImgSize().width}
      height={getImgSize().height}
      position={isOpen ? [window.innerWidth / 2, window.innerHeight / 2] : [props.cWidth / 2, props.cWidth / 2]}
      mask={mask}
    />
  ) : (
    <Graphics
      position={[props.cWidth / 2, props.cWidth / 2]}
      draw={graphics => {
        let points = getCircle()
        draw(graphics, points)
      }}
    />
  )
}

// const Filters = withFilters(Container, {
// 	adjust: AdjustmentFilter,
// 	shockwave: ShockwaveFilter
// })

const WigglyContainer = props => {
  let [cWidth, setCWidth] = useState(0.8 * Math.min(window.innerHeight, window.innerWidth))
  let [cHeight, setCHeight] = useState(0.8 * Math.min(window.innerHeight, window.innerWidth))
  let [zIndex, setZIndex] = useState(0)
  const { updateContext, ...context } = useContext(AnimationContext)

  const updateCSize = () => {
    setCWidth(window.innerWidth)
    setCHeight(window.innerHeight)
  }

  return (
    <Stage
      style={{ zIndex }}
      width={cWidth}
      height={cHeight}
      options={{
        antialias: props.antialias || (window.innerWidth <= 576 ? true : false),
        transparent: true,
        resolution: 1
      }}>
      <Wiggly
        cWidth={cWidth}
        updateContext={updateContext}
        context={context}
        setZIndex={setZIndex}
        updateCSize={updateCSize}
        {...props}
      />
    </Stage>
  )
}

export default WigglyContainer
