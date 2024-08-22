
import React from 'react'
import SoftwareHeader from './header/SoftwareHeader'
import Hero from './Hero'
import MiniDrawer from './MiniDrawer'

const SoftwareDashboard = () => {

    console.log("SoftwareDashboard");
    return (
        <>
            <SoftwareHeader />
            <Hero />
            <MiniDrawer />
        </>
    )
}

export default SoftwareDashboard