import React  , {useId} from 'react'
//forward ref passes info to the parent like props pass info to the child
const Input = React.forwardRef(function Input(
  {label , 
  type= 'text' , className="" , ...props
} , ref){
const id= useId()
  return(
<div className='w-full'>
 {label && ( <label htmlFor={id}
 className='inline-block mb-1 pl-1'
 >{label}</label>

 )}

 <input
  type={type} 
  ref={ref}
  {...props}
  id={id}
  className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200
    border border-gray-200 w-full ${className}`}
 />

</div>

  )

} )

export default Input
