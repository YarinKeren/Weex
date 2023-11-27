import { useState } from 'react'
import { useSelector } from 'react-redux'
import { updateCmp } from '../../../../store/actions/cmp-editor.actions'

import _ from 'lodash'
import { MultiSelect } from 'react-multi-select-component'

const options = [
  { label: 'Sunday', value: 'sunday' },
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
]

export function ScheduleInput({ cmp }) {
  const { schedule } = cmp.info
  const wap = useSelector(storeState => storeState.wapModule.present.wap)
  const [daysForward, setDaysForward] = useState(schedule?.daysForward || 6)
  const [eventDuration, setEventDuration] = useState(schedule?.eventDuration || 30)
  const [selected, setSelected] = useState(
    schedule.days?.map(day => ({
      label: _.capitalize(day),
      value: day,
    }))
  )

  function handleMultiSelectChange(updatedOptions) {
    const newDays = updatedOptions.map(day => day.value)
    setSelected(updatedOptions)
    updateCmp(wap, { ...cmp, info: { ...cmp.info, schedule: { ...schedule, days: newDays } } })
  }

  function handleMeetingLengthChange(ev) {
    setEventDuration(ev[0])
    updateCmp(wap, { ...cmp, info: { ...cmp.info, schedule: { ...schedule, eventDuration: ev[0] } } })
  }

  function handleDaysAheadChange(ev) {
    setDaysForward(ev[0])
    updateCmp(wap, { ...cmp, info: { ...cmp.info, schedule: { ...schedule, daysForward: ev[0] } } })
  }

  function onSelectHour(hour, type) {
    if (type === 'start') schedule.startHour = parseFloat(hour)
    else schedule.endHour = parseFloat(hour)
    updateCmp(wap, { ...cmp, info: { ...cmp.info, schedule: { ...schedule } } })
  }

  function createHourOptions() {
    return Array.from({ length: 9 }, (_, index) => {
      const hour = index + 9
      const value = `${hour < 10 ? `0${hour}` : hour}:00`
      return (
        <option key={hour} value={hour}>
          {value}
        </option>
      )
    })
  }

  return (
    <div className='schedule-input-container flex direction-column gap-10'>
      <div className='flex align-center space-between c-init' data-drag-cancel>
        <h5>Open Slots</h5>
        <input
          min='1'
          step='1'
          max='28'
          type='range'
          id='days-forward'
          value={daysForward}
          className='slider-input'
          onChange={ev => handleDaysAheadChange([parseInt(ev.target.value)])}
        />
        <h6>{` ${daysForward}days`}</h6>
      </div>
      <div className='flex align-center space-between c-init' data-drag-cancel>
        <h5>Meeting Length</h5>
        <input
          min='30'
          step='30'
          max='120'
          type='range'
          id='event-duration'
          value={eventDuration}
          className='slider-input'
          onChange={ev => handleMeetingLengthChange([parseInt(ev.target.value)])}
        />
        <h6>{` ${eventDuration}min`}</h6>
      </div>

      <div className='flex align-center space-between c-init' data-drag-cancel>
        <h5>Opening Times</h5>
        <select
          className='SelectTrigger'
          value={schedule.startHour}
          onChange={ev => onSelectHour(ev.target.value, 'start')}
          aria-label='Starting Hours'
        >
          {createHourOptions()}
        </select>
      </div>
      <div className='flex align-center space-between c-init' style={{ marginBlockEnd: '40px' }} data-drag-cancel>
        <h5>Closing Times</h5>
        <select
          className='SelectTrigger'
          value={schedule.endHour}
          onChange={ev => onSelectHour(ev.target.value, 'end')}
          aria-label='Ending Hours'
        >
          {createHourOptions()}
        </select>
      </div>
      <div className='multi-select-wrapper' data-drag-cancel>
        <MultiSelect
          className='dark'
          value={selected}
          options={options}
          labelledBy='Select'
          disableSearch={true}
          onChange={handleMultiSelectChange}
        />
      </div>
    </div>
  )
}
