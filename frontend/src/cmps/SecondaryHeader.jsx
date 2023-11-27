import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../store/actions/user.actions'

import toast from 'react-hot-toast'
import { Avatar, Menu, MenuItem } from '@mui/material'

export function SecondaryHeader() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const user = useSelector(storeState => storeState.userModule.user)

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }

  async function onLogout() {
    handleClose()
    try {
      toast.promise(logout(), {
        loading: 'Logging out',
        success: `Ciao, ${user.fullname} 👋🏻`,
        error: err => {
          console.error("Can't logout: ", err)
          return 'Cannot logout'
        },
      })
    } catch (err) {
      console.error("Can't logout: ", err)
      toast.error("Something wen't terribly wrong")
    }
  }

  return (
    <header className='secondary-header'>
      <div className='logo'>
        <Link to='/'>
          <img src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698328658/white-weex_mvyhge.png' alt='' />
        </Link>
      </div>
      <div className='user-actions'>
        <NavLink to='/wap'>
          <button className={'templates-btn'}>Templates</button>
        </NavLink>
        <li>
          {user ? (
            <div className='flex align-center'>
              <Avatar
                id='user-avatar'
                src={user.imgUrl}
                alt={user.fullname}
                onClick={handleClick}
                className='user-avatar'
                aria-haspopup='true'
                aria-controls={open ? 'menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
              />
              <Menu
                id='menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'user-avatar',
                }}
              >
                <MenuItem component={Link} to={`/dashboard/${user._id}`} onClick={handleClose}>
                  Dashboard
                </MenuItem>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <NavLink className={'login-btn'} to='/login'>
              <button>Log in</button>
            </NavLink>
          )}
        </li>
      </div>
    </header>
  )
}
