import { uploadService } from '../../../../services/upload.service'

export function VideoInput({ cmp, updateComponent }) {
  async function onVideoInput(event) {
    try {
      toast.promise(uploadService.uploadItem(event), {
        loading: 'Uploading video...',
        success: uploadedImg => {
          updateComponent('info', 'imgUrl', uploadedImg)
          return 'Video uploaded successfully'
        },
        error: err => {
          console.error("Can't upload video: ", err)
          return "Can't upload video 😢"
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='upload-input flex direction-column align-center justify-center'>
      <video
        height='150'
        width='200'
        src={cmp.info?.src}
        alt={cmp?.info?.src || cmp.type}
        className='img-preview'
        data-drag-cancel
      />
      <label htmlFor='img-uploader' className='img-upload-btn' data-drag-cancel>
        Upload video
      </label>
      <input type='file' id='img-uploader' hidden onChange={onVideoInput} />
    </div>
  )
}
