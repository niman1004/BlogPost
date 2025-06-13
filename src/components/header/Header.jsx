import React, { useState } from 'react'
import Container from '../container/Container'
import Logo from '../logo'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LogoutBtn from '../header/LogoutBtn'
import { Menu, X } from 'lucide-react'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'My Posts', slug: '/my-posts', active: authStatus },
    { name: 'Add Posts', slug: '/add-post', active: authStatus },
  ]

  return (
    <header className="w-full top-0 z-50 bg-white shadow-sm border-b border-blue-950 py-3">
      <Container>
        <nav className="flex items-center justify-between relative">
          {/* Logo */}
          <Link to="/">
            <Logo />
          </Link>

          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden p-2 text-blue-950 z-50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Items */}
          <ul
            className={`
              absolute md:static top-full left-0 w-full md:w-auto
              bg-white md:bg-transparent
              flex-col md:flex-row md:flex items-center gap-2 md:gap-4
              p-4 md:p-0 transition-all duration-300 ease-in-out
              ${menuOpen ? 'flex' : 'hidden'} md:flex
              z-50
            `}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug)
                      setMenuOpen(false)
                    }}
                    className="inline-block px-4 py-2 border border-blue-950 duration-200 hover:bg-blue-950 rounded-full text-blue-950 hover:text-white font-serif"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
