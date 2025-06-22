"use client"
import React, { memo } from 'react'




const IntroductionWidget = () => {
    return (
        <div>
            <h1 aria-label='Welcome' className='text-2xl'>Welcome, Asad Tanvir</h1>
        </div>
    )
}

export default memo(IntroductionWidget)
