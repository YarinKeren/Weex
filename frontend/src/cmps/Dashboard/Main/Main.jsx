import Chart from './cmps/Chart'
import Orders from './cmps/Orders'
import Deposits from './cmps/Deposits'

import { WapsStats } from './cmps/WapsStats'
import { TaskStats } from './cmps/TaskStats'
import BasicDateCalendar from './cmps/DateCalendar'
import { Container, Grid, Paper } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
  },
})

export function Main({ setCurrentComponent }) {
  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={4}>
          <Paper
            sx={{
              p: 2,
              mb: 4,
              display: 'flex',
              flexDirection: 'column',
              height: 360,
            }}
          >
            <TaskStats setCurrentComponent={setCurrentComponent} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Paper
            sx={{
              p: 2,
              mb: 4,
              display: 'flex',
              flexDirection: 'column',
              height: 360,
            }}
          >
            <WapsStats />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            sx={{
              p: 2,
              mb: 4,
              display: 'flex',
              flexDirection: 'column',
              height: 360,
            }}
          >
            <BasicDateCalendar />
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Orders />
        </Paper>
      </Grid>
    </Container>
  )
}
