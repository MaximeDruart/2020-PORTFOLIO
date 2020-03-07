// import images
import Coiny from "../components/projects/Coiny"
import Ninjavascript from "../components/projects/Ninjavascript"
import PlayingGrounds from "../components/projects/PlayingGrounds"
import Labyrinth from "../components/projects/Labyrinth"

import coinyCover from "../assets/img/coiny.jpg"
import labCover from "../assets/img/lab.PNG"
import njsCover from "../assets/img/njs.png"
import pgCover from "../assets/img/css-piano.PNG"

export default [
  {
    name: "Coiny",
    path: "coiny",
    coverImg: coinyCover,
    component: Coiny
  },
  {
    name: "Ninjavascript",
    path: "ninjavascript",
    coverImg: njsCover,
    component: Ninjavascript
  },
  {
    name: "Playing Grounds",
    path: "playinggrounds",
    coverImg: pgCover,
    component: PlayingGrounds
  },
  {
    name: "Labyrinth",
    path: "labyrinth",
    coverImg: labCover,
    component: Labyrinth
  }
]
