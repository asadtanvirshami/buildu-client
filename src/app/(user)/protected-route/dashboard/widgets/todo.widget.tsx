import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { todoData } from '@/mocks/data'
import { format } from 'date-fns'
import React, { memo } from 'react'

const TodoWidget = () => {
    return (
        <div >
            <h1>Todos</h1>
            <div className='md:w-full lg:w-[30rem] h-full mt-4 bg-card space-y-5 p-3 rounded-xl border'>
                {todoData.map((ele, i) => (
                    <div className='space-y-2' key={ele.id}>
                        <div aria-label='header' className='flex justify-between'>
                            <div className='flex items-center gap-3 p-0'>
                                <Checkbox  className='rounded-full' />
                                <div>
                                    <h1 className='text-xs '>{ele.name}</h1>
                                    <p className='text-xs'>{format(new Date(ele.date), 'PPpp')}</p>
                                </div>
                            </div>
                            <Badge className={`${ele.priority === 'low' ? 'bg-green-500' : ele.priority === 'medium' ? 'bg-yellow-500' : 'bg-red-500'} text-[10px] rounded-sm h-5 text-white`}>{ele.priority}</Badge>
                        </div>
                        {i === todoData.length - 1 ? null : <Separator />}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default memo(TodoWidget)
