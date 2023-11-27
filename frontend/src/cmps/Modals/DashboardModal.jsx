import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { loadWaps, setWap } from '../../store/actions/wap.actions'

import { Box } from '@mui/system'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'

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

export function DashboardModal({ user, isModalOpen, setIsModalOpen, onOpenDashboard }) {
  const navigate = useNavigate()
  const waps = useSelector(storeState => storeState.wapModule.present.waps)

  useEffect(() => {
    async function fetchWaps() {
      await loadWaps()
    }
    fetchWaps()
  }, [])

  function getUserWaps() {
    return waps.filter(wap => wap.owner?._id === user._id)
  }

  async function handleClick(wap) {
    await setWap(wap)
    setIsModalOpen(false)
    navigate(`/dashboard/${user._id}`)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Choose an app to manage</DialogTitle>
        <DialogContent>
          <Box className='waps-container'>
            {getUserWaps().map(wap => (
              <div
                key={wap._id}
                className={`wap-container flex direction-column align-center justify-center  ${!wap.imgUrl && 'blank'}`}
              >
                <h3>{wap.name}</h3>
                {wap.imgUrl ? (
                  <img src={wap.imgUrl} alt={wap.name} onClick={() => handleClick(wap)} />
                ) : (
                  <button onClick={() => handleClick(wap)}>Choose</button>
                )}
              </div>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}
