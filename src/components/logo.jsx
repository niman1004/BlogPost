import React from 'react'
import logo from '../assets/logo.png'

function Logo({width = '100%'} ) {
  return (
    <div>
      <img src={logo} className='h-10' style={{width}} alt='logo placeholder'/>
    </div>
  )
}

export default Logo
