
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import React from 'react'

type Props = {}

const UserNav = (props: Props) => {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger>
            <Button variant={"ghost"} className='relative h-10 w-10 rounded-full' asChild>
                <Avatar className='h-10 w-10'>
                    <AvatarFallback>OLU</AvatarFallback>
                </Avatar>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
                <div className=" flex flex-col space-y-1">
                    <p className='text-sm font-medium leading-none'>Olawumi Olusegun</p>
                    <p className='text-xs leading-none text-muted-foreground'>olawumi.olusegun@gmail.com</p>
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem>Test</DropdownMenuItem>
                <DropdownMenuItem>Test</DropdownMenuItem>
                <DropdownMenuItem>Test</DropdownMenuItem>
                <DropdownMenuItem>Test</DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserNav