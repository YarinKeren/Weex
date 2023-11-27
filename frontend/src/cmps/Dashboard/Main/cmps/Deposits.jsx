import * as React from 'react'
import { utilService } from '../../../../services/util.service'

import Title from './Title'
import { Link, Typography } from '@mui/material'

export default function Deposits() {
  return (
    <React.Fragment>
      <Title>Total Profits</Title>
      <Typography component='p' variant='h4'>
        ₪3,024.00
      </Typography>
      <Typography color='text.secondary' sx={{ flex: 1 }}>
        on {utilService.getFormattedDate()}
      </Typography>
      <div>
        <Link color='primary' href='https://www.mizrahi-tefahot.co.il/' target='_blank'>
          Consult your banker
        </Link>
      </div>
    </React.Fragment>
  )
}
