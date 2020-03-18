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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas lacinia rutrum. Phasellus velit libero, malesuada in velit in, tristique tempus augue. Pellentesque facilisis dui risus, at vulputate libero dignissim non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse vulputate eget nisi maximus feugiat. Mauris ut nulla sit amet mauris scelerisque placerat. Nam in ex dictum mi vulputate rhoncus.",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas lacinia rutrum. Phasellus velit libero, malesuada in velit in, tristique tempus augue. Pellentesque facilisis dui risus, at vulputate libero dignissim non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse vulputate eget nisi maximus feugiat. Mauris ut nulla sit amet mauris scelerisque placerat. Nam in ex dictum mi vulputate rhoncus.",
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
    description: "Here are multiple experiments that I've done over the last few years with Javascript.",
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
    description: "lorem",
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas lacinia rutrum. Phasellus velit libero, malesuada in velit in, tristique tempus augue. Pellentesque facilisis dui risus, at vulputate libero dignissim non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse vulputate eget nisi maximus feugiat. Mauris ut nulla sit amet mauris scelerisque placerat. Nam in ex dictum mi vulputate rhoncus.",
    websiteLink: "",
    githubLink: "https://github.com/MaximeDruart/Labyrinth"
  }
]
