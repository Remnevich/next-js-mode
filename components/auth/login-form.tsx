'use client'

import {useState} from "react";
import {AuthCard} from "@/components/auth/auth-card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from "react-hook-form";
import {LoginSchema} from "@/types/login-schema";
import * as z from "zod"
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {emailSignIn} from '@/server/actions/email-signin'
import {useAction} from 'next-safe-action/hooks'
import {cn} from "@/lib/utils";
import {FormSuccess} from "@/components/auth/form-success";
import {FormError} from "@/components/auth/form-error";

export const LoginForm = () => {
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const {execute, status} = useAction(emailSignIn, {
        onSuccess: (data) => {
            if (data?.data?.error) setError(data?.data?.error);
            if (data?.data?.success) setSuccess(data?.data?.success);
        }
    })

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        execute(values)
    }

    return (
        <AuthCard cardTitle='Welcome back!' backButtonHref='/auth/register' backButtonLabel='Create a new account'
                  showSocials>
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div>
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
                            <FormSuccess message={success}/>
                            <FormError message={error}/>
                            <Button size='sm' variant='link' asChild>
                                <Link href='auth/reset'>Forgot your password</Link>
                            </Button>
                        </div>
                        <Button className={cn('w-full', status === 'executing' ? 'animate-pulse' : '')} type='submit'>
                            <span>Login</span>
                        </Button>
                    </form>
                </Form>
            </div>
        </AuthCard>
    )
}