import React from 'react';
import Link from "next/link";

const About = () => {
    return (
        <div>
            <h1>Страница о нас</h1>
            <p>Вся нужная информация</p>
            <Link href="/public">Кнопка домой</Link>
        </div>
    );
};

export default About;