/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback, useContext, useRef } from "react"
// import { Sprite, Stage, useTick, Graphics, useApp } from "@inlet/react-pixi"
// import { AdjustmentFilter } from "@pixi/filter-adjustment"
// import { ShockwaveFilter } from "@pixi/filter-shockwave"
import * as PIXI from "pixi.js"
import SimplexNoise from "simplex-noise"
import gsap, { Power2, Power3, Power1 } from "gsap"
import projectData from "../assets/projectData"
import { AnimationContext } from "../AnimationContext"

// import PixiPlugin from 'gsap/PixiPlugin'
// gsap.registerPlugin(PixiPlugin)

let simplex = new SimplexNoise(Math.random())
let mask
let points
const map = (n, start1, stop1, start2, stop2) => ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
const constrain = (n, low, high) => Math.max(Math.min(n, high), low)

const Wiggly = props => {
  // const [yOffset, setYOffset] = useState(0)
  // // eslint-disable-next-line no-unused-vars
  const $pixiContainer = useRef(null)
  // const [alpha, setAlpha] = useState(0.65)
  // const [isInteractive, setIsInteractive] = useState(true)
  // const [drawOffset, setDrawOffset] = useState({ x: props.cWidth / 2, y: props.cWidth / 2 })
  // const [isOpen, setIsOpen] = useState(false)
  // const [allowHover, setAllowHover] = useState(false)

  // // eslint-disable-next-line no-unused-vars
  // let [circleData, setCircleData] = useState({
  //   noiseStrength: 0.07,
  //   vertexCount: 30,
  //   yOffsetIncrement: 0.01,
  //   size: {
  //     value: 0,
  //     baseValue: 0,
  //     variation: 0
  //   },
  //   fill: props.fill
  // })

  // const getCircle = () => {
  //   let points = []
  //   for (let i = 0; i < circleData.vertexCount; i++) {
  //     let angleRad = ((i / circleData.vertexCount) * 360 * Math.PI) / 180
  //     let angleDeg = (i / circleData.vertexCount) * 360
  //     let noiseVal = map(
  //       simplex.noise2D(angleDeg, yOffset),
  //       -1,
  //       1,
  //       1 - circleData.noiseStrength,
  //       1 + circleData.noiseStrength
  //     )
  //     let x = Math.cos(angleRad) * circleData.size.value * noiseVal
  //     let y = Math.sin(angleRad) * circleData.size.value * noiseVal
  //     points.push({ x, y })
  //   }
  //   return points
  // }

  // const draw = (graphics, points, offsetX = 0, offsetY = 0) => {
  //   graphics.clear()
  //   graphics.lineStyle(15, 0xffffff)
  //   circleData.fill && graphics.beginFill(0xffffff)

  //   // https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas
  //   graphics.moveTo(points[0].x + offsetX, points[0].y + offsetY)
  //   for (let i = 1; i <= points.length - 2; i++) {
  //     const xc = (points[i].x + offsetX + points[i + 1].x + offsetX) / 2
  //     const yc = (points[i].y + offsetY + points[i + 1].y + offsetY) / 2
  //     graphics.quadraticCurveTo(points[i].x + offsetX, points[i].y + offsetY, xc, yc)
  //   }
  //   // curve through the last two points
  //   let xc = (points[points.length - 1].x + offsetX + points[0].x + offsetX) / 2
  //   let yc = (points[points.length - 1].y + offsetY + points[0].y + offsetY) / 2
  //   graphics.quadraticCurveTo(points[points.length - 1].x + offsetX, points[points.length - 1].y + offsetY, xc, yc)
  //   xc = (points[0].x + offsetX + points[1].x + offsetX) / 2
  //   yc = (points[0].y + offsetY + points[1].y + offsetY) / 2
  //   graphics.quadraticCurveTo(points[0].x + offsetX, points[0].y + offsetY, xc, yc)

  //   circleData.fill && graphics.endFill()
  // }

  // useTick(() => {
  //   setYOffset(yOffset => yOffset + circleData.yOffsetIncrement)
  //   circleData.size.value += map(simplex.noise3D(0, 0, yOffset), -1, 1, -0.25, 0.25)
  //   circleData.size.value = constrain(
  //     circleData.size.value,
  //     circleData.size.baseValue - circleData.size.variation,
  //     circleData.size.baseValue + circleData.size.variation
  //   )
  //   if (props.img) {
  //     points = getCircle()
  //     draw(mask, points, drawOffset.x, drawOffset.y)
  //   }
  // })

  // const openProject = useCallback(() => {
  //   props.setTransform(-props.projectSize * props.index + 100 / 2 - props.projectSize / 2, true)
  //   props.setZIndex(10)
  //   props.updateCSize()
  //   setAllowHover(false)
  //   setDrawOffset({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  //   setIsInteractive(false)
  //   setIsOpen(true)
  //   props.updateContext("isOpen", true)
  //   let openProjectTl = gsap
  //     .timeline({
  //       defaults: { ease: Power2.easeInOut },
  //       onComplete: () => {
  //         props.updateContext("isOpen", false)
  //         props.setRedirectWithParam(projectData[props.index].path)
  //       }
  //     })
  //     .addLabel("sync")

  //   let circleEndSize = window.innerWidth < 576 ? window.innerWidth * 1.4 : window.innerWidth

  //   openProjectTl.to(getCurrents(props.$projectNames), 0.8, { opacity: 0 }, "sync")
  //   openProjectTl.to(props.$progressionCircle.current, 0.8, { opacity: 0 }, "sync")
  //   openProjectTl.to(circleData, 0.8, { noiseStrength: 0.6, yOffsetIncrement: 0.04 }, "sync")
  //   openProjectTl.to(circleData.size, 0.2, { baseValue: circleData.size.baseValue * 0.7, delay: -0.2 })
  //   openProjectTl.to(circleData.size, 1, { ease: Power2.easeIn, baseValue: circleEndSize })
  // }, [props])

  // const getCurrents = refs => {
  //   let currs = []
  //   refs.forEach((name, index) => (currs[index] = name.current))
  //   return currs
  // }

  // useEffect(() => {
  //   mask = new PIXI.Graphics()
  //   simplex = new SimplexNoise(Math.random())
  // }, [])

  // useEffect(() => {
  //   if (props.spawn && !props.fill) {
  //     gsap.to(circleData.size, 1, { ease: Power3.easeInOut, baseValue: props.cWidth * 0.4, variation: 15 })
  //   }
  //   if (props.context.spawnMain && props.fill) {
  //     gsap.to(getCurrents(props.$projectNames), 1.5, { delay: props.index * 0.2, ease: Power3.easeOut, opacity: 1 })
  //     gsap.to(circleData.size, 1.5, {
  //       delay: props.index * 0.2,
  //       ease: Power3.easeOut,
  //       baseValue: props.cWidth * 0.4,
  //       variation: 15,
  //       onComplete: () => setAllowHover(true)
  //     })
  //   }
  // }, [props.spawn, props.context.spawnMain])

  // const getDespawnMainTl = useCallback(() => {
  //   let despawnTl = new gsap.timeline({
  //     paused: true,
  //     defaults: { ease: Power1.easeIn, duration: 0.7 },
  //     onComplete: () => props.updateContext("despawnMainComplete", true)
  //   }).addLabel("sync")
  //   despawnTl.to(circleData.size, { baseValue: 0, variation: 0 }, "sync")
  //   despawnTl.to(getCurrents(props.$projectNames), { opacity: 0 }, "sync")
  //   return despawnTl
  // }, [])

  // useEffect(() => {
  //   props.context.despawnMain && getDespawnMainTl().play()
  // }, [props.context.despawnMain])

  // useEffect(() => {
  //   props.despawn &&
  //     gsap.to(circleData.size, props.duration || 1.3, {
  //       ease: props.despawnEase || Power2.easeInOut,
  //       baseValue: 0,
  //       variation: 0
  //     })
  // }, [props.despawn])

  // // hover animation
  // useEffect(() => {
  //   if (props.parentCanvasRef || props.$parentCanvases) {
  //     const parentCanvasRef = props.fill ? props.$parentCanvases[props.index].current : props.parentCanvasRef.current

  //     let mousePosHandler = e => {
  //       let { top, bottom, right, left } = parentCanvasRef.getBoundingClientRect()
  //       let x = (right + left) / 2
  //       let y = (bottom + top) / 2
  //       let distanceToWiggly =
  //         1 -
  //         Math.sqrt(
  //           Math.pow((x - e.clientX) / window.innerWidth, 2) + Math.pow((y - e.clientY) / window.innerHeight, 2)
  //         )
  //       circleData.yOffsetIncrement = map(distanceToWiggly, 0.3, 1, 0.01, 0.05)
  //     }
  //     window.addEventListener("mousemove", mousePosHandler)
  //     return () => window.removeEventListener("mousemove", mousePosHandler)
  //   }

  //   // if (props.$parentCanvases[0].current || props.parentCanvasRef) {
  //   //   const parentCanvasRef = props.$parentCanvases[props.index].current
  //   // }
  // }, [props.$parentCanvases, props.parentCanvasRef, allowHover])

  // const getImgSize = useCallback(() => {
  //   let imgGen = new Image()
  //   imgGen.src = props.img
  //   let size = {
  //     width: window.innerWidth,
  //     height: imgGen.height * (window.innerWidth / imgGen.width)
  //   }
  //   if (size.height < window.innerHeight) {
  //     size = {
  //       height: window.innerHeight,
  //       width: imgGen.width * (window.innerHeight / imgGen.height)
  //     }
  //   }
  //   return size
  // }, [props.img])

  const map = (n, start1, stop1, start2, stop2) => ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2
  const constrain = (n, low, high) => Math.max(Math.min(n, high), low)

  useEffect(() => {
    // const Application = PIXI.Application,
    //   // loader = PIXI.Loader,
    //   resources = PIXI.Loader.resources,
    //   Sprite = PIXI.Sprite,
    //   Graphics = PIXI.Graphics

    const app = new PIXI.Application({
      width: props.cWidth,
      height: props.cHeight,
      antialias: true,
      transparent: true,
      resolution: 1
    })
    const loader = new PIXI.Loader()
    console.log("instantiating app")

    $pixiContainer.current.appendChild(app.view)
    // console.log(props)
    loader.reset()
    PIXI.utils.clearTextureCache()
    console.log(props.img)
    props.img && loader.add("img", props.img).load(setup)

    function setup() {
      // console.log(props.img, loader.resources)
      const bg = new PIXI.Sprite(loader.resources.img.texture)
      // loader.reset()
      PIXI.utils.clearTextureCache()

      bg.scale.set(1, 1)
      bg.anchor.set(0.5, 0.5)
      bg.x = props.cWidth / 2
      bg.y = props.cHeight / 2

      const mask = new PIXI.Graphics()
      app.stage.addChild(mask)
      mask.x = props.cWidth / 2
      mask.y = props.cHeight / 2
      mask.lineStyle(0)

      let yOffset = 0
      const c = {
        noiseStrength: 0.07,
        vertexCount: 30,
        yOffsetIncrement: 0.01,
        size: {
          value: props.cWidth / 2.4,
          baseValue: props.cWidth / 2.4,
          variation: 15
        },
        fill: false
      }

      app.ticker.speed = 0.1
      app.ticker.add(() => {
        yOffset += c.yOffsetIncrement

        c.size.value += map(simplex.noise3D(0, 0, yOffset), -1, 1, -0.25, 0.25)
        c.size.value = constrain(c.size.value, c.size.baseValue - c.size.variation, c.size.baseValue + c.size.variation)

        const getCircle = data => {
          let points = []
          for (let i = 0; i < data.vertexCount; i++) {
            let angleRad = ((i / data.vertexCount) * 360 * Math.PI) / 180
            let angleDeg = (i / data.vertexCount) * 360
            let noiseVal = map(
              simplex.noise2D(angleDeg, yOffset),
              -1,
              1,
              1 - data.noiseStrength,
              1 + data.noiseStrength
            )
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
          graphics.moveTo(points[0].x, points[0].y)
          for (let i = 1; i <= points.length - 2; i++) {
            const xc = (points[i].x + points[i + 1].x) / 2
            const yc = (points[i].y + points[i + 1].y) / 2
            graphics.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
          }
          // curve through the last two points
          let xc = (points[points.length - 1].x + points[0].x) / 2
          let yc = (points[points.length - 1].y + points[0].y) / 2
          graphics.quadraticCurveTo(points[points.length - 1].x, points[points.length - 1].y, xc, yc)
          xc = (points[0].x + points[1].x) / 2
          yc = (points[0].y + points[1].y) / 2
          graphics.quadraticCurveTo(points[0].x, points[0].y, xc, yc)

          c.fill && graphics.endFill()
          // bg.mask = graphics
        }

        let points = getCircle(c)
        draw(mask, points)
        app.stage.addChild(bg)
        c.fill = true
        bg.mask = mask
      })
    }

    // return (cleanUp = () => {})
  }, [])

  return <div ref={$pixiContainer} className="pixi-container"></div>
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

  // console.log(props)

  return (
    <Wiggly
      cWidth={cWidth}
      cHeight={cHeight}
      updateContext={updateContext}
      context={context}
      setZIndex={setZIndex}
      updateCSize={updateCSize}
      {...props}
    />
  )
}

export default WigglyContainer
