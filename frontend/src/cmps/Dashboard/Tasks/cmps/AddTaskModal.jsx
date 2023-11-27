import { Box } from '@mui/system'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  ThemeProvider,
  createTheme,
} from '@mui/material'

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

export function AddTaskModal({ isModalOpen, setIsModalOpen, onAddTask, column }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <Box component='form' noValidate onSubmit={ev => onAddTask(ev, column.name)} sx={{ mt: 3 }}>
            <TextField
              autoFocus
              margin='dense'
              id='taskContent'
              label='Add a task'
              type='text'
              fullWidth
              variant='standard'
              name='taskContent'
              required
            />
            <TextField
              margin='dense'
              id='assignedTo'
              label='Assign it to someone'
              type='text'
              fullWidth
              variant='standard'
              name='assignedTo'
              required
            />
            <DialogActions>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type='submit'>Add</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}
