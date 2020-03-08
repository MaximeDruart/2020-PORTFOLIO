import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <div className='left'>Maxime Druart</div>
      <div className='right'>
        <Link to='/about' className='contact'>
          Contact
        </Link>
        <a className='about' href='mailto:maxime.druart@hetic.net'>
          About
        </a>
      </div>
    </header>
  )
}

export default Header
