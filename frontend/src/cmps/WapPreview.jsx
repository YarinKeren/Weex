import { Link } from 'react-router-dom'

export function WapPreview({ wap }) {
  const { _id, name, description, imgUrl, mobileImgUrl } = wap
  return (
    <li className='wap-preview' key={_id}>
      <div className='mobile-container'>
        <Link to={`/edit/${_id}`} state={{ deviceType: 'phone' }}>
          {mobileImgUrl && <img src={mobileImgUrl} alt={name} />}
        </Link>
      </div>
      <div className='image-container'>
        {imgUrl && <img src={imgUrl} alt={name} />}
        <div className='action-buttons'>
          <Link to={`/edit/${_id}`}>
            <button className='btn btn-edit'>Edit</button>
          </Link>
          <Link to={`/preview/${_id}`} target='_blank'>
            <button className='btn btn-preview'>Preview</button>
          </Link>
        </div>
      </div>
      <h4 className='wap-title'>{name}</h4>
      <h4 className='wap-description'>{description}</h4>
    </li>
  )
}
