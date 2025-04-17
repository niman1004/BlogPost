import React from 'react'

function Button({
    children , 
    type= "button",
    bgColor = "bg-blue-950",
    textColor="text-white",
    className ="",
    ...props
}) {
  return (
    <button
    className={`px-4 py-4  ${className} font-serif rounded-xl hover:text-blue-950 hover:bg-white hover:border border-blue-950  duration-200 ${bgColor} ${textColor} `}
    {...props}
    >{children}</button>
  )
}

export default Button
