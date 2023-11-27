import { useSelector } from 'react-redux'
import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

import { logout } from '../store/actions/user.actions'

import { gsap } from 'gsap'
import toast from 'react-hot-toast'
import { Avatar, Menu, MenuItem } from '@mui/material'
import { DashboardModal } from './Modals/DashboardModal'

export function AppHeader() {
  const navRef = useRef(null)
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const user = useSelector(storeState => storeState.userModule.user)

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      0.8,
      { opacity: 0, y: -50, ease: 'power2.out' },
      {
        opacity: 1,
        y: 0,
        delay: 1,
      }
    )
  }, [])

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setIsModalOpen(true)
    setAnchorEl(null)
  }

  async function onLogout() {
    setAnchorEl(null)
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
    <header ref={navRef} className='header'>
      <div className='logo'>
        <Link to='/'>
          <img src='https://res.cloudinary.com/ds8ryiaxd/image/upload/v1698328658/white-weex_mvyhge.png' alt='' />
        </Link>
      </div>
      <div className='user-actions'>
        <NavLink to='/wap'>
          {location.pathname.includes('/wap') ? '' : <button className={'get-started-btn'}>Get started</button>}
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
                {/* <MenuItem component={Link} to={`/dashboard/${user._id}`} onClick={handleClose}> */}
                <MenuItem onClick={handleClose}>Dashboard</MenuItem>
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
      {isModalOpen && <DashboardModal user={user} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
    </header>
  )
}
