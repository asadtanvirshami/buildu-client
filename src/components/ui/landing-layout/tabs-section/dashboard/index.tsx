import React from 'react'
import { ChartAreaInteractive } from './demo-chart'
import DemoCardTransaction from './demo-card'
import ForexNewsCarousel from './demo-news'
import TransactionTable from './demo-transactions'
import { ChartRadarDots } from './demo-radar'
import { TopPerformingPairs } from './demo-position'



const DashboardDemo = () => {
    return (
        <div className='p-2 w-full'>
            <h1 className='font-semibold text-xl ml-5 mb-3'>Welcome, John</h1>
            <div className='space-y-3 no-flex md:flex lg:flex justify-evenly gap-4'>
                <div className=' space-y-5'>
                    <ChartAreaInteractive />
                    <TopPerformingPairs />
                </div>
                <div className=' space-y-5'>
                    <DemoCardTransaction />
                    <ChartRadarDots />
                </div>
            </div>
            <TransactionTable />
            <ForexNewsCarousel />
        </div>
    )
}

export default DashboardDemo
