import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../container/Container'
import Logo from '../logo'

function Footer() {
  return (
    <footer className="bg-blue-950 border-t border-blue-950 py-6 mt-10">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          

          {/* Nav Links */}
          <ul className="flex flex-wrap justify-center gap-4 text-white font-serif text-sm">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/all-posts" className="hover:underline">All Posts</Link>
            </li>
            <li>
              <Link to="/add-posts" className="hover:underline">Add Post</Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">Login</Link>
            </li>
            <li>
              <Link to="/signup" className="hover:underline">Signup</Link>
            </li>
          </ul>

          {/* Copyright */}
          <div className="text-sm text-white font-serif text-center md:text-right">
            © {new Date().getFullYear()} Nimanpreet Kaur. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
