import React, { useEffect, useState, useRef, useCallback } from "react"
import { Sprite, Stage, useTick, Graphics, withFilters, Container } from "@inlet/react-pixi"
import { AdjustmentFilter } from "@pixi/filter-adjustment"
import { ShockwaveFilter } from "@pixi/filter-shockwave"
import { Graphics as Graph } from "pixi.js"
import SimplexNoise from "simplex-noise"
import gsap, { Power2, Power3 } from "gsap"

let simplex = new SimplexNoise(Math.random())
let spawnTl
let mask
let points
const map = (n, start1, stop1, start2, stop2) => ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
const constrain = (n, low, high) => Math.max(Math.min(n, high), low)

const Wiggly = props => {
  let [yOffset, setYOffset] = useState(0)
  let [alpha, setAlpha] = useState(0.8)
  let [interactive, setInteractive] = useState(true)

  let [circleData, setCircleData] = useState({
    noiseStrength: 0.07,
    vertexCount: 30,
    yOffsetIncrement: 0.01,
    size: {
      value: props.spawn ? 0 : 300,
      baseValue: props.spawn ? 0 : 300,
      variation: props.spawn ? 0 : 15
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

  const draw = (graphics, points, offset = 0) => {
    graphics.clear()
    graphics.lineStyle(15, 0xffffff)
    circleData.fill && graphics.beginFill(0xffffff)

    // https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas
    graphics.moveTo(points[0].x + offset, points[0].y + offset)
    for (let i = 1; i <= points.length - 2; i++) {
      const xc = (points[i].x + offset + points[i + 1].x + offset) / 2
      const yc = (points[i].y + offset + points[i + 1].y + offset) / 2
      graphics.quadraticCurveTo(points[i].x + offset, points[i].y + offset, xc, yc)
    }
    // curve through the last two points
    let xc = (points[points.length - 1].x + offset + points[0].x + offset) / 2
    let yc = (points[points.length - 1].y + offset + points[0].y + offset) / 2
    graphics.quadraticCurveTo(points[points.length - 1].x + offset, points[points.length - 1].y + offset, xc, yc)
    xc = (points[0].x + offset + points[1].x + offset) / 2
    yc = (points[0].y + offset + points[1].y + offset) / 2
    graphics.quadraticCurveTo(points[0].x + offset, points[0].y + offset, xc, yc)

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
      draw(mask, points, 350)
    }
  })

  useEffect(() => {
    mask = new Graph()
    simplex = new SimplexNoise(Math.random())
    spawnTl = gsap.timeline({ paused: true })

    props.fill
      ? spawnTl.to(circleData.size, 2.3, { ease: Power3.easeOut, baseValue: 300 })
      : spawnTl.to(circleData.size, 1.5, { ease: Power3.easeOut, baseValue: 300 })
    props.spawn && spawnTl.play()
  }, [])

  useEffect(() => {
    let { top, bottom, right, left } = props.parentCanvasRef.current.getBoundingClientRect()
    let x = (right + left) / 2
    let y = (bottom + top) / 2

    let mousePosHandler = e => {
      let distanceToWiggly =
        1 -
        Math.sqrt(Math.pow((x - e.clientX) / window.innerWidth, 2) + Math.pow((y - e.clientY) / window.innerHeight, 2))
      circleData.yOffsetIncrement = map(distanceToWiggly, 0.3, 1, 0.01, 0.05)
    }
    window.addEventListener("mousemove", mousePosHandler)
    return () => window.removeEventListener("mousemove", mousePosHandler)
  }, [props.parentCanvasRef])

  useEffect(() => {
    if (props.despawn) {
      spawnTl.timeScale(1.6)
      spawnTl.reverse()
    }
  }, [props])

  const openProject = () => {
    props.updateCSize()
    let openProjectTl = gsap.timeline({
      ease: Power2.easeInOut,
      onStart: () => setInteractive(false)
    })
    openProjectTl.to(circleData, 0.8, { noiseStrength: 0.6 })
    openProjectTl.to(circleData.size, 0.2, { baseValue: circleData.size.baseValue * 0.7, delay: -0.2 })
    openProjectTl.to(circleData.size, 1, { ease: Power2.easeIn, baseValue: window.innerWidth })
  }

  return props.img ? (
    <Sprite
      pointerdown={() => openProject()}
      pointerover={() => {
        gsap.to(circleData.size, 0.6, { baseValue: 340 })
        // setAlpha(0.85)
      }}
      pointerout={() => {
        gsap.to(circleData.size, 0.6, { baseValue: 300 })
        // setAlpha(0.8)
      }}
      alpha={alpha}
      interactive
      buttonMode
      image={props.img}
      anchor={[0.5, 0.5]}
      x={350}
      y={350}
      mask={mask}
    />
  ) : (
    <Graphics
      alpha={alpha}
      x={350}
      y={350}
      draw={graphics => {
        let points = getCircle()
        draw(graphics, points, yOffset)
      }}
    />
  )
}

const Filters = withFilters(Container, {
  adjust: AdjustmentFilter,
  shockwave: ShockwaveFilter
})

const WigglyContainer = props => {
  let [cWidth, setCWidth] = useState(700)
  let [cHeight, setCHeight] = useState(700)

  const updateCSize = () => {
    // setCWidth(1400)
    // setCHeight(1400)
  }
  return (
    <Stage
      onClick={e => console.log(props.index)}
      width={cWidth}
      height={cHeight}
      options={{
        antialias: true,
        transparent: true,
        resolution: 1
        // resizeTo: window
      }}
    >
      {/* <Filters
        adjust={{
          alpha: 0.8
        }}
      > */}
      <Wiggly updateCSize={updateCSize} {...props} />
      {/* </Filters> */}
    </Stage>
  )
}

export default WigglyContainer
