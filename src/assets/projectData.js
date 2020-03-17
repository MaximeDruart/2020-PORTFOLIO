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
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas lacinia rutrum. Phasellus velit libero, malesuada in velit in, tristique tempus augue. Pellentesque facilisis dui risus, at vulputate libero dignissim non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse vulputate eget nisi maximus feugiat. Mauris ut nulla sit amet mauris scelerisque placerat. Nam in ex dictum mi vulputate rhoncus.",
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
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas lacinia rutrum. Phasellus velit libero, malesuada in velit in, tristique tempus augue. Pellentesque facilisis dui risus, at vulputate libero dignissim non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse vulputate eget nisi maximus feugiat. Mauris ut nulla sit amet mauris scelerisque placerat. Nam in ex dictum mi vulputate rhoncus.",
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
    description: "Here are multiple experiments that I've done over the last few years with Javascript.",
    websiteLink: "",
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
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi egestas lacinia rutrum. Phasellus velit libero, malesuada in velit in, tristique tempus augue. Pellentesque facilisis dui risus, at vulputate libero dignissim non. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Suspendisse vulputate eget nisi maximus feugiat. Mauris ut nulla sit amet mauris scelerisque placerat. Nam in ex dictum mi vulputate rhoncus.",
    websiteLink: "",
    githubLink: "https://github.com/MaximeDruart/Labyrinth"
  }
]
