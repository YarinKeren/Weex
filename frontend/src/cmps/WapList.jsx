import { WapPreview } from './WapPreview'
import { DesignServicesOutlined } from '@mui/icons-material'

export function WapList({ waps, onCreateWap }) {
  return (
    <ul className='wap-list'>
      <li className='wap-preview'>
        <div className='image-container blank-img'>
          <div className='action-buttons blank-template'>
            <DesignServicesOutlined onClick={onCreateWap} className='btn-create' />
          </div>
        </div>
        <h4 className='wap-title'>Blank space, get creative.</h4>
      </li>

      {waps.map(wap => (
        <WapPreview wap={wap} key={wap._id} />
      ))}
    </ul>
  )
}
