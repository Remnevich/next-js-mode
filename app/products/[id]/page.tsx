import React from 'react';

type PageProps = Promise<{ id: string }>

export default async function Products(props: { params: PageProps }) {

    const {id} = await props.params

    return (
        <div>
            <p>{id}</p>
        </div>
    );
};

