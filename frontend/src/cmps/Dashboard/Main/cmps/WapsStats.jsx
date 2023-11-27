import * as React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { utilService } from '../../../../services/util.service'
// import { getUserWapsData } from '../../../../store/actions/user.actions'

import Title from './Title'
import { Typography, Link as MuiLink } from '@mui/material'

export function WapsStats() {
  const navigate = useNavigate()
  const waps = useSelector(state => state.wapModule.waps)
  const user = useSelector(state => state.userModule.user)
  // const userWapsData = getUserWapsData(user, waps)

  return (
    <React.Fragment>
      <Title>Waps Status</Title>
      <Typography component='p' variant='h6' className='tasks-status'>
        Published: {user.dashboard.wapsStats?.published.length || 0}
        <br />
        In Progress: {user.dashboard.wapsStats?.inProgress.length || 0}
      </Typography>
      <Typography color='text.secondary' sx={{ flex: 1 }}>
        on {utilService.getFormattedDate()}
      </Typography>
      <div>
        <MuiLink href='#' onClick={() => navigate('/wap')}>
          Manage your waps
        </MuiLink>
      </div>
    </React.Fragment>
  )
}
