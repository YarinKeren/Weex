import { useSelector } from 'react-redux'
import { useEffect, useState, Fragment } from 'react'
import { utilService } from '../../../services/util.service'
import { updateCmp } from '../../../store/actions/cmp-editor.actions'
import { socketService, SOCKET_EMIT_SEND_SCHEDULE } from '../../../services/socket.service'

import { ScheduleModal } from '../../Modals/ScheduleModal'
import { ScheduleMeeting } from 'react-schedule-meeting'
import { updateWap } from '../../../store/actions/wap.actions'

export function ScheduleCmp({ cmp }) {
  const { info, style, className } = cmp
  const [isModalOpen, setIsModalOpen] = useState(false)
  const wap = useSelector(storeState => storeState.wapModule.present.wap)
  const { daysForward, borderRadius, primaryColor, eventDuration, data, days, startHour, endHour } = info.schedule
  let [availableTimeslots, setAvailableTimeslots] = useState(data)
  const [meetingInputs, setMeetingInputs] = useState({ fullname: '', phoneNumber: '', datetime: '' })

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

  function updateSchedule(newTimeslots) {
    setAvailableTimeslots(newTimeslots)
    const newSchedule = { ...info.schedule, data: newTimeslots }
    updateCmp(wap, { ...cmp, info: { ...info, schedule: newSchedule } })
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

  function handleTimeslotClicked(selectedMeeting) {
    const selectedMeetingIdx = selectedMeeting.availableTimeslot.id
    setMeetingInputs(prev => ({ ...prev, datetime: availableTimeslots[selectedMeetingIdx] }))
    availableTimeslots.splice(selectedMeetingIdx, 1)
    updateCmp(wap, { ...cmp, info: { ...info, schedule: { ...info.schedule, data: availableTimeslots } } })
    setIsModalOpen(true)
  }

  function onFinalizeBooking(ev) {
    ev.preventDefault()
    info.schedule.meetings.push(meetingInputs)
    if (!wap.meetings) wap.meetings = []
    wap.meetings.push(meetingInputs)
    socketService.emit(SOCKET_EMIT_SEND_SCHEDULE, { data: meetingInputs, to: wap.owner._id })
    updateCmp(wap, { ...cmp, info })
    updateWap(wap)
    setIsModalOpen(false)
  }

  function handleChange({ target: { name, value } }) {
    setMeetingInputs(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Fragment>
      <div style={style} className={className}>
        <ScheduleMeeting
          borderRadius={borderRadius}
          primaryColor={primaryColor}
          startTimeFormatString='HH:mm'
          startTimeListStyle='scroll-list'
          availableTimeslots={availableTimeslots}
          onStartTimeSelect={handleTimeslotClicked}
          eventDurationInMinutes={parseInt(eventDuration)}
        />
      </div>
      {isModalOpen && (
        <ScheduleModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          handleChange={handleChange}
          onFinalizeBooking={onFinalizeBooking}
          meetingInputs={meetingInputs}
        />
      )}
    </Fragment>
  )
}
