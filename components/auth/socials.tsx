'use client'

import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";
import Image from 'next/image';
import yandexIcon from './assets/yandex-icon.svg'
import githubIcon from './assets/github.svg';


export default function Socials() {
    return (
        <div className='flex flex-col items-center w-full gap-4'>
            <Button
                variant='outline'
                className='flex gap-2 w-full'
                onClick={() => signIn('github', {
                    redirect: false,
                    callbackUrl: '/'
                })}>
                <p>Sign in with Github</p>
                <Image src={githubIcon} alt='GitHub icon' width={20} height={20}/>
            </Button>
            <Button
                variant='outline'
                className='flex gap-2 w-full'
                onClick={() => signIn('yandex', {
                    redirect: false,
                    callbackUrl: '/'
                })}>
                <p>Sign in with Yandex</p>
                <Image src={yandexIcon} alt='Yandex icon' width={20} height={20}/>
            </Button>
        </div>
    )
}