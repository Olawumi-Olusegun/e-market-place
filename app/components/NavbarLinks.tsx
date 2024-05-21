"use client";

import { cn } from '@/lib/utils';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'


export const navbarLinks = [
    {
        id: 0,
        name: "Home",
        title: "home",
        href: "/"
    },
    {
        id: 1,
        name: "Templates",
        title: "template",
        href: "/products/template"
    },
    {
        id: 2,
        name: "UI Kits",
        title: "uikit",
        href: "/products/uikit"
    },
    {
        id: 3,
        name: "Icon",
        title: "icon",
        href: "/products/icon"
    },
]

function NavbarLinks() {

    const pathname = usePathname();

  return (
    <div className='hidden md:flex justify-center col-span-6 gap-x-2'>
        {navbarLinks.map((item) => (
            <Link href={item.href} key={item.id} className={cn(
                pathname === item.href ? "bg-muted" : "hover:bg-muted hover:bg-opacity-75",
                "group items-center px-2 py-2 font-medium rounded-md "
            )}>{item.name}</Link>
        ))}
    </div>
  )
}

export default NavbarLinks