"use client"
import React from 'react'
import Container from './Container'
import Logo from './navbar/Logo'
import Search from './navbar/Search'
import UserMenu from './navbar/UserMenu'
import { User } from '@prisma/client'
import Categories from './navbar/Categories'

const NavBar = ({currentUser}:{currentUser?:User |null}) => {

  return (
    <div className=' fixed w-full bg-white z-10 shadow-sm'>
<div className=' py-4 border-b-[1px]'>
    <Container>
<div className=' flex flex-row justify-between gap-3 md:gap-0'>
<Logo/>
<Search/>
<UserMenu currentUser={currentUser}/>
</div>
  </Container>
  </div>
<Categories/>
      </div>
  )
}

export default NavBar