import React from 'react'
import './Button.css'
const Button = ({name, style, onClick}) => {
  return (
    <div>
      <button  className="btn" style={style} onClick={onClick}>{name}</button>
    </div>
  )
}

export default Button
