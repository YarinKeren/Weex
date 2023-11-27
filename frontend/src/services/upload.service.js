export const uploadService = {
  uploadItem,
}

async function uploadItem(ev) {
  const CLOUD_NAME = 'ds8ryiaxd'
  const UPLOAD_PRESET = 'ggcep0zn'
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  if (!(ev.target.files?.length > 0)) {
    throw new Error('No files to upload.')
  }

  try {
    const formData = new FormData()
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('file', ev.target.files[0])

    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const imgUrl = await res.json()
    return imgUrl.url
  } catch (err) {
    console.error('Failed to upload item:', err)
    throw new Error(`Failed to upload item: ${err.message || err}`)
  }
}
