import { Box } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

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

export function CreateWapModal({ isModalOpen, setIsModalOpen, handleCreateWap }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Add Name & Description</DialogTitle>
        <DialogContent>
          <Box component='form' noValidate onSubmit={handleCreateWap}>
            <TextField
              required
              autoFocus
              fullWidth
              type='text'
              id='wapName'
              name='wapName'
              margin='dense'
              variant='standard'
              label='Name goes here..'
            />
            <TextField
              required
              fullWidth
              type='text'
              margin='dense'
              variant='standard'
              id='wapDescription'
              name='wapDescription'
              label='Describe it shortly..'
            />
            <DialogActions>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type='submit'>Let's go !</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}
