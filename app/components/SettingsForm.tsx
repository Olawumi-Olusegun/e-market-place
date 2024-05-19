"use client";

import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useEffect } from 'react'
import SubmitButton from './SubmitButton';
import { State, UpdateUserSettings } from '../lib/actions/user';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';


interface SettingsFormProps {
    firstName: string;
    lastName: string;
    email: string;
}

function SettingsForm({firstName, lastName, email}: SettingsFormProps) {
    const inititialState: State = { message: "", status: undefined}
    const [state, formAction] = useFormState(UpdateUserSettings, inititialState);


    useEffect(() => {
        if(state.status === "error") {
            toast.error(state.message)
        } else if(state.status === "success") {
            toast.success(state.message)
        }
    }, [state])

  return (
    <form action={formAction}>
        <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Here you will find settings regarding your account</CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-y-5'>
            <div className="flex flex-col gap-y-2">
                <Label>Firstname</Label>
                <Input defaultValue={firstName} name='firstName' type='text' placeholder='Enter your firstname' />
            </div>
            <div className="flex flex-col gap-y-2">
                <Label>Lastname</Label>
                <Input defaultValue={lastName} name='lastName' type='text' placeholder='Enter your lastname' />
            </div>
            <div className="flex flex-col gap-y-2">
                <input type="hidden" name='email' value={email} />
                <Label>Email</Label>
                <Input defaultValue={email} className='border-primary/30' type='text' placeholder='user@mail.com' disabled readOnly />
            </div>
        </CardContent>
        <CardFooter>
            <SubmitButton title='Update your settings' className='ml-auto' />
        </CardFooter>
    </form>
  )
}

export default SettingsForm