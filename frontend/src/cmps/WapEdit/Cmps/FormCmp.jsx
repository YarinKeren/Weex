import { useState } from 'react'

import { InputCmp } from './InputCmp'
import { DynamicCmp } from './DynamicCmp'
import { useSelector } from 'react-redux'
import { updateWap } from '../../../store/actions/wap.actions'
import { SOCKET_EMIT_ADD_LEAD, socketService } from '../../../services/socket.service'

export function FormCmp({ cmp }) {
  const { className, style, cmps } = cmp
  const [formValues, setFormValues] = useState({})
  const wap = useSelector(storeState => storeState.wapModule.present.wap)

  function handleChange({ target: { value } }, fieldId) {
    setFormValues({ ...formValues, [fieldId]: value })
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!wap.leads) wap.leads = []
    wap.leads.push(formValues)
    socketService.emit(SOCKET_EMIT_ADD_LEAD, { data: formValues, to: wap.owner._id })
    updateWap(wap)
    // setFormValues({})
  }

  const componentMap = {
    txt: DynamicCmp,
    btn: DynamicCmp,
    title: DynamicCmp,
    input: InputCmp,
  }

  return (
    <form style={style} className={className} onSubmit={handleSubmit}>
      {cmps.map(nestedCmp => {
        const CmpToRender = componentMap[nestedCmp.type]
        return (
          <CmpToRender
            cmp={nestedCmp}
            key={nestedCmp._id}
            handleChange={nestedCmp.type === 'input' ? handleChange : undefined}
          />
        )
      })}
    </form>
  )
}
