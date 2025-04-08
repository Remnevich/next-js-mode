'use client'

import {Button} from "@/components/ui/button";
import {signIn} from "next-auth/react";

export default function Socials() {
    return (
        <div>
            <Button onClick={() => signIn('github', {
                redirect: false,
                callbackUrl: '/'
            })}>Sign in with Github</Button>
            <Button onClick={() => signIn('yandex', {
                redirect: false,
                callbackUrl: '/'
            })}>Sign in with Yandex</Button>
        </div>
    )
}