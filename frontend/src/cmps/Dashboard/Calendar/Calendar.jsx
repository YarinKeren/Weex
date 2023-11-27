import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { socketService } from '../../../services/socket.service'

import moment from 'moment'
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'

const localizer = momentLocalizer(moment)

export function Calendar({ user }) {
  const wap = useSelector(storeState => storeState.wapModule.present.wap)
  const [meetings, setMeetings] = useState(wap?.meetings || [])
  const events = meetings?.reduce((acc, meeting) => {
    acc.push({
      start: moment(meeting.datetime.startTime).toDate(),
      end: moment(meeting.datetime.endTime).toDate(),
      title: `${meeting.fullname}, ${meeting.phoneNumber}`,
    })
    return acc
  }, [])

  useEffect(() => {
    setMeetings(wap.meetings)
    socketService.off('add-schedule')
    socketService.on('add-schedule', newMeeting => {
      setMeetings(prevMeetings => [...prevMeetings, newMeeting])
    })
  }, [])

  return (
    <div className='calendar-dashboard'>
      <div className='calendar-header flex align-center space-between'>
        <h2>Meetings calendar</h2>
        <h3 className='total-meetings'>{events?.length} Meetings ahead</h3>
      </div>

      <div className='calendar-container'>
        <BigCalendar localizer={localizer} defaultDate={moment().toDate()} defaultView='month' events={events} />
      </div>
    </div>
  )
}
