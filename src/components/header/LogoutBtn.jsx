import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth.js'
import {logout} from '../../store/authSlice.js'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logoutHandler= ()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        })
    }

  return (
    <button
    onClick={logoutHandler}
    className='px-5 py-2 bg-blue-950 text-white font-serif rounded-3xl hover:bg-white hover:text-blue-950 hover:border border-blue-950'
    >Logout</button>
  )
}

export default LogoutBtn
