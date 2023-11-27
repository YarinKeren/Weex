import { useState, Fragment } from 'react'

import { Chat } from './Chat/Chat'
import { Main } from './Main/Main'
import { Tasks } from './Tasks/Tasks'

import { ListItemButton as MUIListItemButton, ListItemIcon, ListItemText, Divider, Tooltip } from '@mui/material'
import {
  Assignment,
  AssignmentOutlined,
  ChatOutlined,
  DashboardOutlined,
  CalendarMonth,
  PaidOutlined,
} from '@mui/icons-material'
import { Calendar } from './Calendar/Calendar'
import { Leads } from './Leads/Leads'

export function ListItems({ isOpen, setCurrentComponent }) {
  const [activeItem, setActiveItem] = useState('Dashboard')

  function onSelectTab(cmp, item) {
    setActiveItem(item)
    setCurrentComponent(cmp)
  }

  function renderTooltip(title, children) {
    return !isOpen ? (
      <Tooltip
        title={title}
        placement='right'
        PopperProps={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -15],
              },
            },
          ],
        }}
      >
        {children}
      </Tooltip>
    ) : (
      children
    )
  }

  const ListItemButton = props => (
    <MUIListItemButton
      sx={{
        backgroundImage: 'linear-gradient(to right, #36333f 0%, #2b232a 50%, #895cf2 100%)',
        backgroundSize: '300% 300%',
        transition: '0.5s',
        '&:hover': {
          backgroundPosition: 'right center',
        },
      }}
      {...props}
    >
      {props.children}
    </MUIListItemButton>
  )

  return (
    <Fragment>
      {renderTooltip(
        'Dashboard',
        <div>
          <ListItemButton onClick={() => onSelectTab(<Main setCurrentComponent={setCurrentComponent} />, 'Dashboard')}>
            <ListItemIcon
              sx={{
                color: activeItem === 'Dashboard' ? '#895cf2' : '#e0e0e0',
              }}
            >
              <DashboardOutlined />
            </ListItemIcon>
            <ListItemText
              primary='Dashboard'
              sx={{
                color: activeItem === 'Dashboard' ? '#895cf2' : '#e0e0e0',
              }}
            />
          </ListItemButton>
        </div>
      )}
      {renderTooltip(
        'Leads',
        <div>
          <ListItemButton onClick={() => onSelectTab(<Leads />, 'Leads')}>
            <ListItemIcon
              sx={{
                color: activeItem === 'Leads' ? '#895cf2' : '#e0e0e0',
              }}
            >
              <PaidOutlined />
            </ListItemIcon>
            <ListItemText
              primary='Leads'
              sx={{
                color: activeItem === 'Leads' ? '#895cf2' : '#e0e0e0',
              }}
            />
          </ListItemButton>
        </div>
      )}
      {renderTooltip(
        'Chat',
        <div>
          <ListItemButton onClick={() => onSelectTab(<Chat setCurrentComponent={setCurrentComponent} />, 'Chat')}>
            <ListItemIcon
              sx={{
                color: activeItem === 'Chat' ? '#895cf2' : '#e0e0e0',
              }}
            >
              <ChatOutlined />
            </ListItemIcon>
            <ListItemText
              primary='Chat'
              sx={{
                color: activeItem === 'Chat' ? '#895cf2' : '#e0e0e0',
              }}
            />
          </ListItemButton>
        </div>
      )}
      {renderTooltip(
        'Tasks',
        <div>
          <ListItemButton onClick={() => onSelectTab(<Tasks />, 'Tasks')}>
            <ListItemIcon
              sx={{
                color: activeItem === 'Tasks' ? '#895cf2' : '#e0e0e0',
              }}
            >
              <AssignmentOutlined />
            </ListItemIcon>
            <ListItemText
              primary='Tasks'
              sx={{
                color: activeItem === 'Tasks' ? '#895cf2' : '#e0e0e0',
              }}
            />
          </ListItemButton>
        </div>
      )}
      {renderTooltip(
        'Calendar',
        <div>
          <ListItemButton onClick={() => onSelectTab(<Calendar />, 'Calendar')}>
            <ListItemIcon
              sx={{
                color: activeItem === 'Calendar' ? '#895cf2' : '#e0e0e0',
              }}
            >
              <CalendarMonth />
            </ListItemIcon>
            <ListItemText
              primary='Calendar'
              sx={{
                color: activeItem === 'Calendar' ? '#895cf2' : '#e0e0e0',
              }}
            />
          </ListItemButton>
        </div>
      )}
    </Fragment>
  )
}
