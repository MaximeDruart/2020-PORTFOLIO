/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useContext } from "react"
import { Sprite, Stage, useTick, Graphics } from "@inlet/react-pixi"
// import { AdjustmentFilter } from "@pixi/filter-adjustment"
// import { ShockwaveFilter } from "@pixi/filter-shockwave"
// import { Graphics as Graph } from "pixi.js"
import * as PIXI from "pixi.js"
import SimplexNoise from "simplex-noise"
import gsap, { Power2, Power3 } from "gsap"
import projectData from "../assets/projectData"
import { AnimationContext } from "../AnimationContext"

let simplex = new SimplexNoise(Math.random())
let mask
let points
const map = (n, start1, stop1, start2, stop2) => ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
const constrain = (n, low, high) => Math.max(Math.min(n, high), low)

const Wiggly = props => {
  let [yOffset, setYOffset] = useState(0)
  // eslint-disable-next-line no-unused-vars
  let [alpha, setAlpha] = useState(0.65)
  let [interactive, setInteractive] = useState(true)
  let [drawOffset, setDrawOffset] = useState({ x: 350, y: 350 })
  let [isOpen, setIsOpen] = useState(false)

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
    props.context.$transitionHack.current.style.backgroundImage = `url(${projectData[props.index].coverImg})`
    props.setTransform(-props.projectWidth * props.index + 100 / 2 - props.projectWidth / 2, true)
    props.setZIndex(10)
    props.updateCSize()
    setDrawOffset({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    setInteractive(false)
    setIsOpen(true)
    let openProjectTl = gsap.timeline({
      ease: Power2.easeInOut,
      onComplete: () => {
        props.setRedirectWithParam(projectData[props.index].path)
      }
    })
    openProjectTl.to(circleData, 0.8, { noiseStrength: 0.6, yOffsetIncrement: 0.05 })
    openProjectTl.to(circleData.size, 0.2, { baseValue: circleData.size.baseValue * 0.7, delay: -0.2 })
    openProjectTl.to(circleData.size, 1, { ease: Power2.easeIn, baseValue: window.innerWidth })
  }, [props])

  useEffect(() => {
    mask = new PIXI.Graphics()
    simplex = new SimplexNoise(Math.random())
  }, [])

  useEffect(() => {
    if (props.spawn && !props.fill) {
      gsap.to(circleData.size, 1.1, { ease: Power3.easeOut, baseValue: 290, variation: 15 })
    }
    if (props.context.spawnMain && props.fill) {
      gsap.to(circleData.size, 1.5, { ease: Power3.easeOut, baseValue: 290, variation: 15 })
    }
  }, [props.spawn, props.context.spawnMain])

  const getDespawnMainTl = useCallback(name => {
    let despawnTl = new gsap.timeline({
      paused: true,
      ease: Power3.easeOut,
      onComplete: () => props.updateContext("despawnMainComplete", true)
    }).addLabel("sync")
    despawnTl.to(
      circleData.size,
      0.6,
      { baseValue: 0, variation: 0, onComplete: () => props.fill && console.log(name) },
      "sync"
    )
    despawnTl.to(name, 0.6, { opacity: 0 }, "sync")
    return despawnTl
  }, [])

  useEffect(() => {
    props.context.despawnMain && getDespawnMainTl(props.nameRef.current).play()
  }, [props.context.despawnMain])

  useEffect(() => {
    props.despawn &&
      gsap.to(circleData.size, 1.3, {
        ease: Power3.easeOut,
        baseValue: 0,
        variation: 0
      })
  }, [props.despawn])

  useEffect(() => {
    if (props.parentCanvasRef.current) {
      let { top, bottom, right, left } = props.parentCanvasRef.current.getBoundingClientRect()
      let x = (right + left) / 2
      let y = (bottom + top) / 2

      let mousePosHandler = e => {
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
  }, [props.parentCanvasRef])

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
      pointerdown={() => {
        openProject()
      }}
      pointerover={() => {
        gsap.to(circleData.size, 0.75, { ease: Power3.easeInOut, baseValue: 350 })
        // setAlpha(0.85)
      }}
      pointerout={() => {
        gsap.to(circleData.size, 0.75, { ease: Power3.easeInOut, baseValue: 290 })
        // setAlpha(0.8)
      }}
      alpha={isOpen ? 1 : alpha}
      interactive={interactive}
      buttonMode={interactive}
      image={props.img}
      anchor={[0.5, 0.5]}
      width={getImgSize().width}
      height={getImgSize().height}
      position={isOpen ? [window.innerWidth / 2, window.innerHeight / 2] : [350, 350]}
      mask={mask}
    />
  ) : (
    <Graphics
      position={[350, 350]}
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
  let [cWidth, setCWidth] = useState(700)
  let [cHeight, setCHeight] = useState(700)
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
        // antialias: true,
        transparent: true,
        resolution: 1
      }}>
      <Wiggly
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
