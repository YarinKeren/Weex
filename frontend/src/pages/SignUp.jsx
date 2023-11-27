import { useState } from 'react'
import { useNavigate } from 'react-router'
import { signup } from '../store/actions/user.actions'
import { uploadService } from '../services/upload.service'

import toast from 'react-hot-toast'
import { AppHeader } from '../cmps/AppHeader'
import { MuiFileInput } from 'mui-file-input'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Box, Grid, TextField, Button, Link, Typography, Container, Avatar, CssBaseline } from '@mui/material'
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

export function SignUp() {
  const navigate = useNavigate()
  const [userImgUrl, setUserImgUrl] = useState(null)
  const [file, setFile] = useState('Upload an image')

  async function handleSubmit(ev) {
    ev.preventDefault()
    const data = new FormData(ev.currentTarget)

    const signupCredentials = {
      fullname: `${data.get('firstName')} ${data.get('lastName')}`,
      email: data.get('email'),
      password: data.get('password'),
      imgUrl: userImgUrl,
    }

    onSignup(signupCredentials)
  }

  async function onSignup(signupCredentials) {
    if (!signupCredentials.email || !signupCredentials.password || !signupCredentials.fullname) return

    try {
      toast.promise(signup(signupCredentials), {
        loading: "Wer'e on it !",
        success: data => {
          navigate('/')
          return `So happy your'e with us, ${data.fullname} !`
        },
        error: err => {
          console.error('Cannot signup: ', err)
          return 'Something went wrong, try again'
        },
      })
    } catch (err) {
      console.error('An unexpected error occurred: ', err)
      toast.error('An unexpected error occurred')
    }
  }

  async function onUploadImage(ev) {
    try {
      toast.promise(uploadService.uploadImg(ev), {
        loading: 'Uploading image...',
        success: data => {
          setFile(ev)
          setUserImgUrl(data.url)
          return 'Image uploaded successfully'
        },
        error: err => {
          console.error('Cannot upload image: ', err)
          return 'Something went wrong, try again'
        },
      })
    } catch (err) {
      console.error('An unexpected error occurred: ', err)
      toast.error('An unexpected error occurred')
    }
  }

  return (
    <ThemeProvider theme={customTheme}>
      <SecondaryHeader />
      <Container component='main' maxWidth='xs' sx={{ borderRadius: '8px', bgcolor: '#36333f', color: '#e0e0e0' }}>
        <CssBaseline />
        <Box
          sx={{
            padding: '24px',
            marginTop: {
              xs: 0,
              sm: 8,
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#9359f5' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id='email' label='Email Address' name='email' autoComplete='email' />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
              <Grid item xs={12}>
                <MuiFileInput label={file.name || file} onChange={onUploadImage} />
              </Grid>
            </Grid>
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
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='/login' variant='body2' sx={{ color: '#e0e0e0', textDecorationColor: '#9359f5' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
