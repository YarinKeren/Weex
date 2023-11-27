import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router'
import { loadWap } from '../store/actions/wap.actions'

import { Loader } from '../cmps/Loader'
import { DynamicCmp } from '../cmps/WapEdit/Cmps/DynamicCmp'

export function WapDetails() {
  const { wapId, wapUrl } = useParams()
  const location = useLocation()
  const wap = useSelector(storeState => storeState.wapModule.present.wap)

  function getTheme() {
    if (wap && wap.cmps && wap.cmps.length > 0) {
      const theme = wap.cmps[0].theme
      return theme
    }
    return 'default-theme'
  }

  useEffect(() => {
    if (wapId) loadWap(wapId)
    else if (wapUrl) loadWap(wapId, wapUrl)
  }, [wapId, wapUrl, location])

  if (!wap) return <Loader />

  return (
    <div className={wap.theme ? wap.theme : getTheme()}>
      {wap?.cmps?.map(cmp => (
        <DynamicCmp cmp={cmp} key={cmp._id} />
      ))}
    </div>
  )
}
