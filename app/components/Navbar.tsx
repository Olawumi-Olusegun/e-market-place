
import Link from 'next/link'
import React from 'react'
import NavbarLinks from './NavbarLinks'
import { Button } from '@/components/ui/button'
import MobileMenu from './MobileMenu'
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import UserNav from './UserNav'


type Props = {}

async function Navbar({}: Props) {

    const {getUser} = getKindeServerSession();

    const user = await getUser();



  return (
    <nav className='relative max-w-7xl w-full flex items-center md:grid md:grid-cols-12 px-4 md:px-8 mx-auto py-7'>
        <div className='md:col-span-3'>
            <Link href={"/"}>
                <h1 className='text-2xl font-semibold'>Market <span className='text-primary'>Place</span></h1>
            </Link>
        </div>
        
        <NavbarLinks />
        
        <div className="flex items-center gap-x-2 ms-auto ">
            {
                user ? (
                    <UserNav />
                )
                     : (
                        <div className="flex items-center gap-2">
                            <Button asChild>
                                <LoginLink>Login</LoginLink>
                            </Button>
                        
                            <Button variant={"secondary"} asChild>
                                <RegisterLink>Register</RegisterLink>
                            </Button>
                        </div>
                     )
            }
        </div>

        <div className="md:hidden">
            <MobileMenu />
        </div>
    </nav>
  )
}

export default Navbar