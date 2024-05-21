
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components'
import Link from 'next/link'
import React from 'react'

type Props = {}

interface UserNavProps {
    name: string;
    email: string;
    image: string | undefined;

} 

const UserNav = ({name, email, image}: UserNavProps) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant={"ghost"} className='relative h-10 w-10 border p-1 rounded-full' asChild>
                <Avatar className='h-10 w-10'>
                    <AvatarImage src={image} alt="user-image" className='h-full w-full rounded-full' />
                    <AvatarFallback className='text-sm font-medium'>{name.slice(0,3)}</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
                <div className=" flex flex-col space-y-1">
                    <p className='text-sm font-medium leading-none'>{name}</p>
                    <p className='text-xs leading-none text-muted-foreground'>{email}</p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link href={"/sell"}>Sell</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link href={"/settings"}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link href={"/my-products"}>My Products</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className='cursor-pointer'>
                    <Link href={"/billing"}>Billing</Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer' asChild>
                <LogoutLink>Log Out</LogoutLink>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav