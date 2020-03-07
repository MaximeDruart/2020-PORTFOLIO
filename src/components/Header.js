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
        <div className='about'>About</div>
      </div>
    </header>
  )
}

export default Header
