import React, { useEffect, useState } from "react"
import { render, Sprite, Graphics, Stage, useTick, Container } from "@inlet/react-pixi"
import { Application, Graphics as Graph } from "pixi.js"
import SimplexNoise from "simplex-noise"

let simplex = new SimplexNoise(Math.random())
const Wiggly = props => {
  let [yOffset, setYOffset] = useState(0)

  const map = (n, start1, stop1, start2, stop2) => ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
  const constrain = (n, low, high) => Math.max(Math.min(n, high), low)

  const c = {
    noiseStrength: 0.07,
    vertexCount: 30,
    yOffsetIncrement: 0.01,
    size: {
      value: 230,
      baseValue: 230,
      variation: 15
    },
    fill: true
  }

  const getCircle = data => {
    console.log("getting points")
    let points = []
    for (let i = 0; i < data.vertexCount; i++) {
      let angleRad = ((i / data.vertexCount) * 360 * Math.PI) / 180
      let angleDeg = (i / data.vertexCount) * 360
      let noiseVal = map(simplex.noise2D(angleDeg, yOffset), -1, 1, 1 - data.noiseStrength, 1 + data.noiseStrength)
      let x = Math.cos(angleRad) * data.size.value * noiseVal
      let y = Math.sin(angleRad) * data.size.value * noiseVal
      points.push({ x, y })
    }
    return points
  }

  const draw = (graphics, points) => {
    graphics.clear()
    graphics.lineStyle(15, 0xffffff)
    c.fill && graphics.beginFill(0xffffff)

    // https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas
    graphics.moveTo(points[0].x + 350, points[0].y + 350)
    for (let i = 1; i <= points.length - 2; i++) {
      const xc = (points[i].x + 350 + points[i + 1].x + 350) / 2
      const yc = (points[i].y + 350 + points[i + 1].y + 350) / 2
      graphics.quadraticCurveTo(points[i].x + 350, points[i].y + 350, xc, yc)
    }
    // curve through the last two points
    let xc = (points[points.length - 1].x + 350 + points[0].x + 350) / 2
    let yc = (points[points.length - 1].y + 350 + points[0].y + 350) / 2
    graphics.quadraticCurveTo(points[points.length - 1].x + 350, points[points.length - 1].y + 350, xc, yc)
    xc = (points[0].x + 350 + points[1].x + 350) / 2
    yc = (points[0].y + 350 + points[1].y + 350) / 2
    graphics.quadraticCurveTo(points[0].x + 350, points[0].y + 350, xc, yc)

    c.fill && graphics.endFill()
  }

  useTick(delta => {
    setYOffset(yOffset => yOffset + c.yOffsetIncrement)
    c.size.value += map(simplex.noise3D(0, 0, yOffset), -1, 1, -0.25, 0.25)
    c.size.value = constrain(c.size.value, c.size.baseValue - c.size.variation, c.size.baseValue + c.size.variation)
  })

  let mask = new Graph()
  let points = getCircle(c)
  draw(mask, points)

  useEffect(() => {
    simplex = new SimplexNoise(Math.random())
  }, [])

  // WHAT WORKS AS A MASK : New Graph(), new Cont()
  return (
    <Container>
      <Sprite interactive buttonMode image={props.img} anchor={[0.5, 0.5]} x={350} y={350} mask={mask} />
    </Container>
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
        backgroundColor: 0x131313,
        resolution: 1
      }}
    >
      <Wiggly img={props.img} />
    </Stage>
  )
}

export default WigglyContainer
