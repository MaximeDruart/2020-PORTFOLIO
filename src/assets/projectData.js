import Coiny from "../components/projects/Coiny"
import Ninjavascript from "../components/projects/Ninjavascript"
import PlayingGrounds from "../components/projects/PlayingGrounds"
import Labyrinth from "../components/projects/Labyrinth"

import coinyCover from "../assets/img/coiny.jpg"
import labCover from "../assets/img/lab.PNG"
import njsCover from "../assets/img/njs.svg"
import pgCover from "../assets/img/css-piano.PNG"

export default [
  {
    name: "Coiny",
    path: "coiny",
    coverImg: coinyCover,
    component: Coiny,
    date: "Dec. 2019",
    role: "Front end dev, back end dev",
    techs: ["HTML/CSS/JS", "React", "Node & Express", "MongoDB"],
    websiteLink: "https://coiny-app.herokuapp.com/",
    githubLink: "https://github.com/MaximeDruart/Coiny"
  },
  {
    name: "njs",
    path: "ninjavascript",
    coverImg: njsCover,
    component: Ninjavascript,
    date: "Apr. 2018",
    role: "Front end dev",
    techs: ["HTML/CSS/JS", "canvas"],
    websiteLink: "https://maximedruart.github.io/Ninjavascript",
    githubLink: "https://github.com/MaximeDruart/Ninjavascript"
  },
  {
    name: "Playing Grounds",
    path: "playinggrounds",
    coverImg: pgCover,
    component: PlayingGrounds,
    date: "Since 2018",
    role: "Development",
    techs: ["HTML/CSS/JS", "canvas", "Pixi.js"],
    websiteLink: "/",
    githubLink: "https://github.com/MaximeDruart"
  },
  {
    name: "Labyrinth",
    path: "labyrinth",
    coverImg: labCover,
    component: Labyrinth,
    date: "July 2017",
    role: "Game dev",
    techs: ["Python", "Pygame"],
    websiteLink: "/",
    githubLink: "https://github.com/MaximeDruart/Labyrinth"
  }
]
