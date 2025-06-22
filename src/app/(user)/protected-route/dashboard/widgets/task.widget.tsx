import { DataTable } from '@/components/ui/tables/task-table/data-table'
import { taskData } from '@/mocks/data'
import Task from '@/types/task-type'
import React from 'react'

const TaskWidget = () => {
  return (
    <DataTable data={taskData ? taskData as Task[] : []} />

  )
}

export default TaskWidget
