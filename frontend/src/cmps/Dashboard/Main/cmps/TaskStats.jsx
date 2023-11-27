import * as React from 'react'
import { useSelector } from 'react-redux'
import { utilService } from '../../../../services/util.service'
import { getTasksData } from '../../../../store/actions/user.actions'

import { BarChart } from '@mui/x-charts'
import Title from './Title'
import { Tasks } from '../../Tasks/Tasks'
import { Link, Typography } from '@mui/material'

export function TaskStats({ setCurrentComponent }) {
  const user = useSelector(state => state.userModule.user)
  const tasksData = getTasksData(user)

  return (
    <React.Fragment>
      <Title>Tasks Status</Title>
      <BarChart
        xAxis={[
          {
            id: 'barCategories',
            data: ['To Do', 'In Progress', 'Done'],
            scaleType: 'band',
          },
        ]}
        series={[
          {
            data: [tasksData.todo, tasksData['in-progress'], tasksData.done],
          },
        ]}
        height={300}
        // width={400}
      />
      <Typography color='text.secondary' sx={{ flex: 1 }}>
        on {utilService.getFormattedDate()}
      </Typography>
      <div>
        <Link color='primary' href='#' onClick={() => setCurrentComponent(<Tasks />)}>
          Manage your tasks
        </Link>
      </div>
    </React.Fragment>
  )
}

// export function TaskStats({ setCurrentComponent }) {
//   const user = useSelector(state => state.userModule.user)
//   const tasksData = getTasksData(user)
//   return (
//     <React.Fragment>
//       <Title>Tasks Status</Title>
//       <Typography component='p' variant='h6' className='tasks-status'>
//         Todo: {tasksData.todo}
//         <br />
//         In Progress: {tasksData['in-progress']}
//         <br />
//         Done: {tasksData.done}
//       </Typography>
//       <Typography color='text.secondary' sx={{ flex: 1 }}>
//         on {utilService.getFormattedDate()}
//       </Typography>
//       <div>
//         <Link color='primary' href='#' onClick={() => setCurrentComponent(<Tasks />)}>
//           Manage your tasks
//         </Link>
//       </div>
//     </React.Fragment>
//   )
// }
