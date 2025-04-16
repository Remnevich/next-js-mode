'use client'

import {useSearchParams, useRouter} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {newVerification} from "@/server/actions/tokens";
import {AuthCard} from "@/components/auth/auth-card";
import {FormSuccess} from "@/components/auth/form-success";
import {FormError} from "@/components/auth/form-error";

export const EmailVerificationForm = () => {
    const token = useSearchParams().get("token");
    const router = useRouter()
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<string>('');

    const handleVerification = useCallback(() => {
        if (success || error) return;
        if (!token) {
            setError('No token found');
            return
        }
        newVerification(token).then((result) => {
            if (result.error) {
                setError(result.error);
            }
            if (result.success) {
                setSuccess(result.success)
                router.push('/auth/login')
            }
        })
    }, [])

    useEffect(() => {
        handleVerification()
    }, [])

    return (
        <AuthCard cardTitle='Verify your account'
                  backButtonHref='/auth/login'
                  backButtonLabel='Back to login'>
            <div className='flex items-center flex-col justify-center w-full'>
                <p>{!success && !error ? 'Verifying email...' : null}</p>
                <FormSuccess message={success}/>
                <FormError message={error}/>
            </div>
        </AuthCard>
    )
}