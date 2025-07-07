import { ArrowDownCircleIcon, ArrowUpCircle, BadgeDollarSign, ChartCandlestickIcon, ListEndIcon } from 'lucide-react'
import React from 'react'

const DemoCardTransaction = () => {
    return (
        <div className='bg-card rounded-lg p-4 border h-fit w-full flex justify-center'>
            <div className='grid grid-cols-2 gap-9 justify-center items-center'>
                <div className='flex-col flex'>
                    <h1 className='text-3xl font-bold text-green-500 flex items-center gap-1'><ArrowUpCircle className='w-6 h-6' />1,000</h1>
                    <p className='text-sm font-semibold flex items-center gap-1 mt-2'> <BadgeDollarSign className='w-4 h-4' /> Profit</p>
                    <small className='text-xs text-gray-500'>Total profit in trades.</small>
                </div>
                <div className='flex-col flex'>
                    <h1 className='text-3xl font-bold text-red-500 flex items-center gap-1'><ArrowDownCircleIcon className='w-6 h-6' />300</h1>
                    <p className='text-sm font-semibold flex items-center gap-1 mt-2'><BadgeDollarSign className='w-4 h-4' />  Loss</p>
                    <small className='text-xs text-gray-500'>Total loss in trades.</small>
                </div>
                <div className='flex-col flex'>
                    <h1 className='text-3xl font-bold'>203</h1>
                    <p className='text-sm font-semibold flex items-center gap-1 mt-2'><ChartCandlestickIcon className='w-4 h-4' />Trades</p>
                    <small className='text-xs text-gray-500'>Total trades you have now.</small>
                </div>
                <div className='flex-col flex'>
                    <h1 className='text-3xl font-bold'>34</h1>
                    <p className='text-sm font-semibold flex items-center gap-1 mt-2'><ListEndIcon className='w-4 h-4' /> Sell</p>
                    <small className='text-xs text-gray-500'>Total sell you have done.</small>
                </div>
            </div>
        </div >
    )
}

export default DemoCardTransaction
