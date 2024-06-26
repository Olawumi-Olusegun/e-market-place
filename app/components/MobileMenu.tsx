"use client";


import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import React from 'react'
import { navbarLinks } from './NavbarLinks'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type Props = {}

function MobileMenu({}: Props) {
    const pathname = usePathname();

  return (
    <Sheet>
        <SheetTrigger>
            <Button className='h-8 w-8 ml-2 border-none' variant={"outline"} size={"icon"} asChild>
                <Menu  />
            </Button>
        </SheetTrigger>
        <SheetContent>
            <div className="mt-5 flex flex-col gap-2 px-2 ">
                {
                navbarLinks.map((item) => (
                        <Link key={item.href} href={item.href} className={cn(
                pathname === item.href ? "bg-muted" : "hover:bg-muted hover:bg-opacity-75",
                "group items-center px-2 py-2 font-medium rounded-md "
            )}>
                {item.name}
            </Link>
                 )) }
            </div>
        </SheetContent>
    </Sheet>
  )
}

export default MobileMenu