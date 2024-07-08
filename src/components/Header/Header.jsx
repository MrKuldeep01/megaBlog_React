import React from 'react'
import {Logo,LogoutBtn,Container} from "../index"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
const Header = () => {
  const userStatus = useSelector(state => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]
  return (
    <div>
    <Logo/>   

    </div>
  )
}

export default Header
