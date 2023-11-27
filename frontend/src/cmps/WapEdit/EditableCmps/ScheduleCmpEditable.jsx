import { useSelector } from 'react-redux'
import { useEffect, useState, Fragment } from 'react'
import { utilService } from '../../../services/util.service'
import { updateCmp } from '../../../store/actions/cmp-editor.actions'

import { useHover } from '../../../hooks/useHover'
import { ScheduleMeeting } from 'react-schedule-meeting'

export function ScheduleCmpEditable({ cmp, activeCmpId, handleElClick }) {
  const { info, style, className, _id } = cmp
  const { hoverHandlers, isHovered } = useHover()
  const wap = useSelector(storeState => storeState.wapModule.present.wap)
  const { daysForward, borderRadius, primaryColor, eventDuration, data, days, startHour, endHour } = info.schedule
  let [availableTimeslots, setAvailableTimeslots] = useState(data)
  const computedClassName = `${className} ${isHovered ? 'hover' : ''} ${activeCmpId === _id ? 'active-cmp' : ''}`.trim()

  useEffect(() => {
    generateTimeslots()
  }, [])

  useEffect(() => {
    const newSlots = generateEmptyTimeslots()
    setAvailableTimeslots(newSlots)
  }, [eventDuration, startHour, days, daysForward, endHour])

  function generateTimeslots() {
    let savedTimeslots = data
    if (!savedTimeslots || savedTimeslots.length === 0) {
      savedTimeslots = generateEmptyTimeslots()
      updateSchedule(savedTimeslots)
      return
    }
    // if (utilService.isYesterday(savedTimeslots[0].startTime)) {
    //   savedTimeslots = removeYesterdayMeetings(savedTimeslots)
    //   const newIntervals = generateIntervalsForLastDay()
    //   savedTimeslots = [...savedTimeslots, ...newIntervals]
    // }
    setAvailableTimeslots(savedTimeslots)
    updateCmp(wap, { ...cmp, info: { ...info, schedule: { ...info.schedule, data: savedTimeslots } } })
  }

  function generateEmptyTimeslots() {
    const MS_PER_MINUTE = 60000
    const dayStartHour = startHour
    const dayEndHour = endHour

    // Create start and end dates
    const startDate = new Date().setHours(dayStartHour, 0, 0, 0)
    const endDate = new Date().setDate(new Date().getDate() + daysForward)
    const endDateTime = new Date(endDate).setHours(dayEndHour, 0, 0, 0)

    const intervals = []
    let currentTime = startDate
    let timeslotId = 0

    while (currentTime < endDateTime) {
      const current = new Date(currentTime)
      if (days.includes(utilService.getDayName(current).toLowerCase())) {
        const endTime = new Date(currentTime + eventDuration * MS_PER_MINUTE)
        intervals.push({
          id: timeslotId++,
          startTime: new Date(currentTime),
          endTime: endTime,
        })
        currentTime = endTime.getTime()
        // Move to next day if the end time exceeds the day's available hours
        if (new Date(currentTime).getHours() >= dayEndHour) {
          currentTime = new Date(currentTime).setHours(24 + dayStartHour, 0, 0, 0)
        }
      } else {
        // Skip to the next day
        currentTime = new Date(currentTime).setHours(24 + dayStartHour, 0, 0, 0)
      }
    }
    return intervals
  }

  function updateSchedule(newTimeslots) {
    setAvailableTimeslots(newTimeslots)
    updateCmp(wap, { ...cmp, info: { ...info, schedule: { ...info.schedule, data: newTimeslots } } })
  }

  return (
    <Fragment>
      <div style={style} {...hoverHandlers} onClick={ev => handleElClick(ev, cmp)} className={computedClassName}>
        <ScheduleMeeting
          primaryColor={primaryColor}
          borderRadius={borderRadius}
          startTimeFormatString='HH:mm'
          startTimeListStyle='scroll-list'
          availableTimeslots={availableTimeslots}
          eventDurationInMinutes={parseInt(eventDuration)}
        />
      </div>
    </Fragment>
  )
}
