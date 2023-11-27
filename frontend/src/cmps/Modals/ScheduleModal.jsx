import { Box } from '@mui/system'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

export function ScheduleModal({ isModalOpen, setIsModalOpen, handleChange, onFinalizeBooking, meetingInputs }) {
  return (
    <div>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <Box component='form' noValidate onSubmit={onFinalizeBooking}>
            <TextField
              autoFocus
              margin='dense'
              id='fullName'
              label='Fullname'
              type='text'
              fullWidth
              variant='standard'
              name='fullname'
              required
              onChange={handleChange}
              value={meetingInputs.fullname}
            />
            <TextField
              margin='dense'
              id='phoneNumber'
              label='Phone Number'
              type='tel'
              fullWidth
              variant='standard'
              name='phoneNumber'
              required
              onChange={handleChange}
              value={meetingInputs.phoneNumber}
            />
            <DialogActions>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type='submit'>Add</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  )
}
