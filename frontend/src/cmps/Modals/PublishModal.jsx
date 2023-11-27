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

export function PublishModal({ isModalOpen, setIsModalOpen, onPublishWap }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Choose a name for your app</DialogTitle>
        <DialogContent>
          <Box component='form' noValidate onSubmit={onPublishWap}>
            <TextField
              autoFocus
              margin='dense'
              id='wapName'
              label='Name goes here..'
              type='text'
              fullWidth
              variant='standard'
              name='wapName'
              required
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
