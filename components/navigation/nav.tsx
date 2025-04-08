import React from 'react';
import {auth} from '@/server/auth'

import {UserButton} from "@/components/navigation/user-button";
import Logo from "@/components/navigation/logo";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LogIn} from "lucide-react";

export default async function Nav() {
    const session = await auth()

    return (
        <header className='bg-slate-500 py-4'>
            <nav>
                <ul className='flex justify-between items-center'>
                    <li><Logo/></li>
                    {!session ? (
                        <li>
                            <Button asChild>
                                <Link aria-label='sign-in' className='flex gap-2' href="/auth/login">
                                    <LogIn size={16}/>
                                    <span>Login</span>
                                </Link>
                            </Button>
                        </li>
                    ) : <li><UserButton expires={session?.expires ?? ''} user={session?.user}/></li>}
                </ul>
            </nav>
        </header>
    )
}