import React from 'react'
import Container from '../container/Container'
import Logo from '../logo'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from '../header/LogoutBtn'





function Header( ) {
    const authStatus= useSelector((state)=> state.auth.status)

    const navigate= useNavigate()
    const navItems= [
        {
            name:'Home',
            slug:'/',
            active: true
        }, 
        {
            name: "Login",
            slug: '/login',
            active: !authStatus
        },

        {
            name: "Signup",
            slug: '/signup',
            active: !authStatus
        },
        {
            name:"All posts",
            slug:"/all-posts",
            active: authStatus
        },

        {
            name:"Add posts",
            slug:"/add-post",
            active: authStatus
        }
    ]
  return (
    <header className="w-full top-0 z-50 bg-white shadow-sm border-b border-blue-950 py-3">

        <Container>
            <nav className='flex'>
                <div className='mr-4'>
                    <Link to='/'>
                        <Logo  />
                    </Link>
                </div>
                <ul className='flex items-center ml-auto gap-2'>
                    {
                        navItems.map((item)=> item.active ?(
                            <li key={item.name}>
                                <button
                                onClick={()=> navigate(item.slug)}
                                className='inline-block px-6 py-2 border border-blue-950 duration-200 hover:bg-blue-950 rounded-full text-blue-950 hover:text-white font-serif'
                                >
                                        {item.name}
                                </button>
                            </li>
                        ) : null)
                    }
                    {authStatus && (
                        <li>
                            <LogoutBtn/>
                        </li>
                    )}
                </ul>

            </nav>
        </Container>

    </header>
  )
}

export default Header
