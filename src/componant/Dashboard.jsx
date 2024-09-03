import React, { useState } from 'react';
import HeaderBar from './header/HeaderBar';
import Hero from './Hero.jsx';
import Features from './Features.jsx';

export default function Dashboard() {

    return (
        <>
            <HeaderBar />
            <Hero />
            <Features/>
        </>

    );
}