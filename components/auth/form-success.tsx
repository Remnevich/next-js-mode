import React from 'react';
import {CheckCircle} from "lucide-react";


export const FormError = ({message}: { message?: string }) => {
    if (!message) return null
    return (
        <div className='bg-teal-400 text-secondary p-3 rounded-md'>
            <CheckCircle className='w-4 h-4'/>
            <p>{message}</p>
        </div>
    );
};