import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { socketService } from '../../../services/socket.service'
import { updateWap } from '../../../store/actions/wap.actions'

export function Leads() {
  const wap = useSelector(storeState => storeState.wapModule.present.wap)
  const [leads, setLeads] = useState(wap.leads || [])

  useEffect(() => {
    setLeads(wap.leads || [])
    socketService.off('add-lead')
    socketService.on('add-lead', async newLead => {
      setLeads([...leads, newLead])
    })
  }, [wap.leads])

  return (
    <table className='leads'>
      <thead>
        <tr>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        {leads.map((lead, index) => (
          <tr key={index}>
            <td>{lead.email}</td>
            <td>{lead['first name']}</td>
            <td>{lead['last name']}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
