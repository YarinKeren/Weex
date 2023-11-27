import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { store } from '../store/store'
import { loadUser } from '../store/actions/user.actions'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'

import toast from 'react-hot-toast'

import { Main } from '../cmps/Dashboard/Main/Main'
import { ListItems } from '../cmps/Dashboard/ListItems'

import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Avatar,
  Button,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'

const drawerWidth = 240

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',
    backgroundImage: 'linear-gradient(to right, #36333f 0%, #2b232a 50%, #895cf2 100%)',
    backgroundSize: '300% 300%',
    color: '#fff',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(8),
      },
    }),
  },
}))

const defaultTheme = createTheme()

export function Dashboard() {
  const { userId } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [currentComponent, setCurrentComponent] = useState(<Main />)

  const user = useSelector(storeState => storeState.userModule.user)
  const wap = useSelector(storeState => storeState.wapModule.present.wap)

  useEffect(() => {
    loadUser(userId)

    socketService.emit(SOCKET_EMIT_USER_WATCH, userId)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    }
  }, [userId])

  function onUserUpdate(user) {
    toast.success(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }} className='dashboard'>
        <AppBar position='absolute'>
          <Toolbar
            sx={{
              backgroundColor: '#18161a',
              padding: '12px !important',
            }}
          >
            <Typography component='h1' variant='h6' color='inherit' sx={{ flex: 1 }}>
              <Link to='/' className='remove-link-style'>
                <Button
                  variant='contained'
                  color='secondary'
                  sx={{
                    backgroundColor: '#9359f5',
                    '&:hover': {
                      color: '#18161a',
                      backgroundColor: '#dbdbde',
                    },
                  }}
                >
                  Home
                </Button>
              </Link>
            </Typography>
            <Typography component='h1' variant='h6' color='inherit' noWrap sx={{ gap: '10px' }} className='flex'>
              {user?.imgUrl && <Avatar src={user?.imgUrl} sx={{ width: 32, height: 32 }} />} {user?.fullname}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={isOpen} sx={{}}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          ></Toolbar>
          <Divider />
          <List component='nav' sx={{}}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={() => setIsOpen(!isOpen)}
              sx={{
                marginInlineStart: '8px',
                color: '#e0e0e0',
                backgroundImage: 'linear-gradient(to right, #36333f 0%, #2b232a 50%, #895cf2 100%)',
                backgroundSize: '300% 300%',
                transition: '0.5s',
                '&:hover': {
                  backgroundPosition: 'right center',
                },
              }}
            >
              {isOpen ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <ListItems isOpen={isOpen} setCurrentComponent={setCurrentComponent} />
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />

          {currentComponent}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
