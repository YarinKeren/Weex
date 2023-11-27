import { Tooltip as MuiTooltip } from '@mui/material'

export function Tooltip(props) {
  return (
    <MuiTooltip
      PopperProps={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -10],
            },
          },
        ],
      }}
      {...props}
    />
  )
}
