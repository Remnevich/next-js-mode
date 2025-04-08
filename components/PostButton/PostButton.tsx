'use client'
import {useFormStatus} from 'react-dom'

import React from 'react';

const PostButton = () => {
    const {pending} = useFormStatus();

    return (
        <button
            className='bg-blue-600 py-2 px-4 text-cyan-400'
            disabled={pending}
            type='submit'>Post</button>
    );
};

export default PostButton;