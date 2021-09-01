/* eslint-disable no-dupe-keys */
import Sandwich from "../components/projects/Sandwich"
import Pitchfork from "../components/projects/Pitchfork"

import Coiny from "../components/projects/Coiny"
import Ninjavascript from "../components/projects/Ninjavascript"
import PlayingGrounds from "../components/projects/PlayingGrounds"
import Atomium from "../components/projects/Atomium"
import ExitTheMatrix from "../components/projects/ExitTheMatrix"
import Labyrinth from "../components/projects/Labyrinth"

import sandwichCover from "../assets/img/sandwich/cover.jpg"
import pitchforkCover from "../assets/img/pitchfork/cover.jpg"
import coinyCover from "../assets/img/coiny/coiny.jpg"
import labCover from "../assets/img/lab/lab-home.jpg"
import njsCover from "../assets/img/njs/njs.svg"
import pgCover from "../assets/img/pg/css-piano.jpg"
import etmCover from "../assets/img/etm/logo.jpg"
import atomCover from "../assets/img/atom/atom-intro.JPG"

export default [
  {
    name: "Sandwich Studio",
    path: "sandwich-studio",
    coverImg: sandwichCover,
    component: Sandwich,
    date: "Avr. 2021",
    role: "Front end dev, back end dev",
    techs: ["HTML/CSS/JS", "WebGL", "React (Gatsby)"],
    description:
      "I was contacted by a classmate of mine to create the website of his agency. Sandwich Studio offers support to brands specialising in CBD in the creation of their graphic identity, digital presence, packaging and marketing. The aim of the website was to showcase the agency's creative capabilities so we focused on creating a site that was as interactive as possible and with 3D.",
    websiteLink: "https://sandwich-studio.netlify.app/",
    githubLink: "https://github.com/MaximeDruart/sandwich-studio-gatsby",
    credits: {
      Development: { name: "Maxime Druart" },
      Designer: {
        name: "Sandro Raspaldo",
        link: "https://www.sandroraspaldo.com/",
      },
    },
  },
  {
    name: "Pitchfork",
    path: "pitchfork",
    coverImg: pitchforkCover,
    component: Pitchfork,
    date: "Jul. 2020",
    role: "Front end dev, back end dev",
    techs: ["HTML/CSS/JS", "React", "WebGL / THREE.js", "Node", "MongoDB"],
    description:
      "During a HETIC school project, we had to build an interactive data visualization experience in a team in 2 weeks. While looking for interesting data sets, I found a set corresponding to the whole set of Pitchfork magazine's music reviews and we used this as a basis to design a visualization and analysis of these data.  From there I conceptualized the project and worked with designers to develop the site.",
    websiteLink: "https://pitchfork.herokuapp.com/",
    githubLink: "https://github.com/MaximeDruart/pitchfork",
    credits: {
      Development: { name: "Maxime Druart" },
      Designer: {
        name: "Aurélie Do",
        link: "https://www.behance.net/aureliedo",
      },
    },
  },
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
        link: "https://www.behance.net/cathydolle",
      },
      "Designer 2": {
        name: "Sandro Raspaldo",
        link: "https://www.sandroraspaldo.com/",
      },
    },
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
    githubLink: "https://github.com/MaximeDruart",
  },
  {
    name: "Atomium",
    path: "atomium",
    coverImg: atomCover,
    component: Atomium,
    date: "March 2020",
    role: "Development",
    techs: ["HTML/CSS/JS", "THREE.js"],
    description:
      "Atomium was a school project developped over a week with the goal of creating a 3D museum. In this museum you can dive in the atomic world and discover what molecules and atoms are made of. You can also create your own molecules in an interactive playground ! ( still a work in progress ).",
    websiteLink: "https://atumyum.netlify.com/",
    githubLink: "https://github.com/MaximeDruart/Atomium",
    credits: {
      "Front end development 1": { name: "Maxime Druart" },
      "Designer 1": {
        name: "Johann Givre",
        link: "https://www.behance.net/",
      },
      "Designer 2": {
        name: "Zoe Lesouef",
        link: "https://www.behance.net/",
      },
    },
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
      "Exit The Matrix was a school project developped over a week with the goal of creating and immersive experience. In Exit The Matrix, you find yourself in the role of Tank, the matrix operator sending back and forth Neo. Your task is to guide him out of the Matrix as agents are on his tail. This experience was developped entirely in DOM and as a 2 developper team.",
    websiteLink: "https://maximedruart.github.io/Exit-The-Matrix/",
    githubLink: "https://github.com/MaximeDruart/Exit-The-Matrix",
    credits: {
      "Front end development 1": { name: "Maxime Druart" },
      "Front end development 2": {
        name: "Eythan Saillet",
        link: "https://github.com/eythanSaillet",
      },
      Designer: {
        name: "Clément Borie",
        link: "https://www.behance.net/clementbor19d9",
      },
    },
  },
]
