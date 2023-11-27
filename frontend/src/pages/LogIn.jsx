import { useNavigate } from 'react-router'

import toast from 'react-hot-toast'
import { AppHeader } from '../cmps/AppHeader'
import { login } from '../store/actions/user.actions'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@mui/material'
import { SecondaryHeader } from '../cmps/SecondaryHeader'

const customTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          style: { color: 'white' },
        },
        inputProps: {
          style: { color: 'white' },
        },
      },
    },
  },
})

export function LogIn() {
  const navigate = useNavigate()

  async function onLogin(loginCredentials) {
    if (!loginCredentials.email || !loginCredentials.password) return
    try {
      toast.promise(login(loginCredentials), {
        loading: 'Loading',
        success: data => {
          navigate(-1)
          return `Welcome back ${data.fullname}`
        },
        error: err => {
          navigate('/login')
          console.error("Can't login: ", err)
          return "Can't login 😢"
        },
      })
    } catch (err) {
      console.error('An unexpected error occurred: ', err)
      toast.error('An unexpected error occurred')
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const data = new FormData(ev.currentTarget)
    onLogin({ email: data.get('email'), password: data.get('password') })
  }

  return (
    <ThemeProvider theme={customTheme}>
      <div className='login'>
        <SecondaryHeader />
        <Grid container component='main' sx={{ height: '94vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                'url(https://res.cloudinary.com/ds8ryiaxd/image/upload/v1696342263/ltcx2hn03oklifc7r6ey.png)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: t => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              color: '#e0e0e0',
              backgroundColor: '#36333f',
            }}
          >
            <Box
              sx={{
                my: 12,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: '#9359f5' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1'>Welcome to WeeX ! 👋🏻</Typography>
              <Typography variant='body2' sx={{ my: 1 }}>
                Please sign-in to your account and start the adventure
              </Typography>
              <div className='guest-credentials'>
                <p>Username: guest / Password: guest</p>
                <p>Username: admin / Password: admin</p>
              </div>
              <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  defaultValue='guest'
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  defaultValue='guest'
                  autoComplete='current-password'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{
                    mt: 3,
                    mb: 2,
                    backgroundColor: '#9359f5',
                    color: '#e0e0e0',
                    '&:hover': {
                      color: '#18161a',
                      backgroundColor: '#dbdbde',
                    },
                  }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item>
                    <Link href='/signup' variant='body2' sx={{ color: '#e0e0e0', textDecorationColor: '#9359f5' }}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </ThemeProvider>
  )
}
