/* eslint-disable no-dupe-keys */
import Coiny from "../components/projects/Coiny"
import Ninjavascript from "../components/projects/Ninjavascript"
import PlayingGrounds from "../components/projects/PlayingGrounds"
import ExitTheMatrix from "../components/projects/ExitTheMatrix"
import Labyrinth from "../components/projects/Labyrinth"

import coinyCover from "../assets/img/coiny/coiny.jpg"
import labCover from "../assets/img/lab/lab-home.jpg"
import njsCover from "../assets/img/njs/njs.svg"
import pgCover from "../assets/img/pg/css-piano.jpg"
import etmCover from "../assets/img/etm/logo.jpg"

export default [
  {
    name: "Coiny",
    path: "coiny",
    coverImg: coinyCover,
    component: Coiny,
    date: "Dec. 2019",
    role: "Front end dev, back end dev",
    techs: ["HTML/CSS/JS", "React", "Node & Express", "MongoDB"],
    description:
      "For a school project, we had 2 weeks to design a product on the theme of 'Tech and humans'. As a result, we developed Coiny :  a web app looking to build communities around small local shops and helping the needy. On the app, you can create a fund for your shop and needy people can pull from it to help with casual spendings. This was my first experience building a back-end system with Node and MongoDB and was very instructive. Everything is functional on the app but the actual banking part. ",
    websiteLink: "https://coiny-app.herokuapp.com/",
    githubLink: "https://github.com/MaximeDruart/Coiny",
    credits: {
      "Front end development": { name: "Maxime Druart" },
      "Designer 1": {
        name: "Cathy Dolle",
        link: "https://www.behance.net/cathydolle"
      },
      "Designer 2": {
        name: "Sandro Raspaldo",
        link: ""
      }
    }
  },
  {
    name: "njs",
    path: "ninjavascript",
    coverImg: njsCover,
    component: Ninjavascript,
    date: "Apr. 2018",
    role: "Front end dev",
    techs: ["HTML/CSS/JS", "canvas"],
    description:
      "As a school project, we had a week to design a game using mostly Javascript. My team and I came up with Ninjavascript.Guide a ninja through different levels to help him reach the temple using Javascript principles. This game was designed as a fist experience for people looking to get in coding. Code-wise this was my first real experience using the Canvas API and was a real challenge creating an isometric 2D experience.",
    websiteLink: "https://maximedruart.github.io/Ninjavascript",
    githubLink: "https://github.com/MaximeDruart/Ninjavascript",
    credits: {
      "Front end development": { name: "Maxime Druart" },
      "Designer 1": {
        name: "Cathy Dolle",
        link: "https://www.behance.net/cathydolle"
      },
      "Designer 2": {
        name: "Aurélie Do",
        link: "https://www.behance.net/aureliedo"
      }
    }
  },
  {
    name: "Playing Grounds",
    path: "playinggrounds",
    coverImg: pgCover,
    component: PlayingGrounds,
    date: "Since 2018",
    role: "Development",
    techs: ["HTML/CSS/JS", "canvas", "Pixi.js"],
    description:
      "Here are multiple experiments that I've done over the last few years with Javascript, with DOM, Canvas, p5.js or Pixi.js (and soon WebGL :)).",
    websiteLink: "",
    githubLink: "https://github.com/MaximeDruart"
  },
  {
    name: "Exit The Matrix",
    path: "exit-the-matrix",
    coverImg: etmCover,
    component: ExitTheMatrix,
    date: "October 2019",
    role: "Development",
    techs: ["HTML/CSS/JS"],
    description:
      "Exit The Matrix was a school developped over a week with the goal of creating and immersive experience. In Exit The Matrix, you find yourself in the role of Tank, the matrix operator sending back and forth Neo. Your task is to guide him out of the Matrix as agents are on his tail. This experience was developped entirely in DOM and as a 2 developper team.",
    websiteLink: "https://maximedruart.github.io/Exit-The-Matrix/",
    githubLink: "https://github.com/MaximeDruart/Exit-The-Matrix",
    credits: {
      "Front end development 1": { name: "Maxime Druart" },
      "Front end development 2": {
        name: "Eythan Saillet",
        link: "https://github.com/eythanSaillet"
      },
      Designer: {
        name: "Clément Borie",
        link: "https://www.behance.net/clementbor19d9"
      }
    }
  },
  {
    name: "Labyrinth",
    path: "labyrinth",
    coverImg: labCover,
    component: Labyrinth,
    date: "July 2017",
    role: "Game dev",
    techs: ["Python", "PyGame"],
    description:
      "My first real experience with code was this project ! This high school project which spanned over 6 months was about recreating the tabletop game Labyrinth, which proved to be quite a challenge. This experience left me wanting for more and to pursue a programming education",
    websiteLink: "",
    githubLink: "https://github.com/MaximeDruart/Labyrinth"
  }
]
