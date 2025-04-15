import React from 'react';
import {AlertCircle} from "lucide-react";

export const FormError = ({message}: { message?: string }) => {
    if (!message) return null
    return (
        <div className='flex gap-3 items-center bg-destructive text-secondary p-3 rounded-md'>
            <AlertCircle className='w-4 h-4'/>
            <p>{message}</p>
        </div>
    );
};