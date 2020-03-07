import React, { useEffect, useState } from "react"
import { Sprite, Stage, useTick, Graphics } from "@inlet/react-pixi"
import { Graphics as Graph } from "pixi.js"
import SimplexNoise from "simplex-noise"
import gsap, { Power2, Power3 } from "gsap"

let simplex = new SimplexNoise(Math.random())
let spawnTl = gsap.timeline({ paused: true })
const Wiggly = props => {
  let [yOffset, setYOffset] = useState(0)

  const map = (n, start1, stop1, start2, stop2) => ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
  const constrain = (n, low, high) => Math.max(Math.min(n, high), low)

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
  })

  let mask = new Graph()
  let points = getCircle()
  draw(mask, points, 350)

  useEffect(() => {
    simplex = new SimplexNoise(Math.random())
    spawnTl.to(circleData.size, 1.8, { ease: Power3.easeOut, baseValue: 300 })
    props.spawn && spawnTl.play()
  }, [])

  useEffect(() => {
    if (props.despawn) {
      spawnTl.timeScale(1.6)
      spawnTl.reverse()
    }
  }, [props])

  return props.img ? (
    <Sprite interactive buttonMode image={props.img} anchor={[0.5, 0.5]} x={350} y={350} mask={mask} />
  ) : (
    <Graphics
      x={350}
      y={350}
      draw={g => {
        let points = getCircle()
        draw(g, points)
      }}
    />
  )
}

const WigglyContainer = props => {
  return (
    <Stage
      width={700}
      height={700}
      options={{
        antialias: true,
        transparent: true,
        resolution: 1
      }}
    >
      <Wiggly {...props} />
    </Stage>
  )
}

export default WigglyContainer
