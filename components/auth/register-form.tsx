'use client'

import {useState} from "react";
import {AuthCard} from "@/components/auth/auth-card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from "react-hook-form";
import {RegisterSchema} from "@/types/register-schema";
import * as z from "zod"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useAction} from 'next-safe-action/hooks'
import {cn} from "@/lib/utils";
import {emailRegister} from "@/server/actions/email-register";

export const RegisterForm = () => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: ""
        }
    })

    const {execute, status} = useAction(emailRegister, {
        onSuccess: (data) => {
            if (data?.data?.success) {
                console.log(data?.data?.success)
            }
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        execute(values)
    }

    return (
        <AuthCard cardTitle='Create an account'
                  backButtonHref='/auth/login'
                  backButtonLabel='Alread have an account?'
                  showSocials>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='Robert' type='text'
                                                   autoComplete='name'/>
                                        </FormControl>
                                        <FormDescription/>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='remnevich@gmail.com' type='email'
                                                   autoComplete='email'/>
                                        </FormControl>
                                        <FormDescription/>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} placeholder='*******' type='password'
                                                   autoComplete='current-password'/>
                                        </FormControl>
                                        <FormDescription/>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <Button size='sm' variant='link' asChild>
                                <Link href='auth/reset'>Forgot your password</Link>
                            </Button>
                        </div>
                        <Button className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')} type='submit'>
                            <span>Register</span>
                        </Button>
                    </form>
                </Form>
            </div>
        </AuthCard>
    )
}