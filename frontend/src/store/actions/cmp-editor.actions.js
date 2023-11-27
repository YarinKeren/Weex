import { store } from '../store.js'
import { wapService } from '../../services/wap.service.local.js'

import { SET_WAP } from '../reducers/wap.reducer.js'
import { SET_CMP } from '../reducers/cmp-editor.reducer.js'

import { cloneDeep } from 'lodash'
import toast from 'react-hot-toast'
import domToImage from 'dom-to-image'

export function setCmp(cmp) {
  store.dispatch({ type: SET_CMP, cmp })
}

export async function updateCmp(wap, updatedCmp, editorLayoutRef) {
  // OPTIMISTIC APPROACH
  const rollbackWap = cloneDeep(wap)

  const newWap = cloneDeep(wap)
  wapService.replaceCmpInWap(updatedCmp, newWap)

  store.dispatch({ type: 'SET_WAP', wap: newWap })
  store.dispatch({ type: 'SET_CMP', cmp: updatedCmp })

  try {
    await wapService.save(newWap)
  } catch (err) {
    console.error('Cannot update cmp', err)
    toast.error('Cannot update cmp')
    store.dispatch({ type: 'SET_WAP', wap: rollbackWap })
  }
}

// Used for making a screenshot of the provided ref for rendering purposes
async function _screenShotWap(newWap, editorLayoutRef) {
  if (editorLayoutRef.current) {
    try {
      const dataUrl = await domToImage.toPng(editorLayoutRef.current)
      newWap.dashboardThumbnail = dataUrl
    } catch (imageError) {
      console.error('dom-to-image error:', imageError)
    }
  }
}

export async function deleteCmp(wap, cmpToDelete) {
  try {
    store.dispatch({ type: SET_CMP, cmp: null })
    store.dispatch({ type: SET_WAP, wap })

    wapService.deleteCmpFromWap(cmpToDelete, wap)

    toast.promise(
      wapService.save(wap),
      {
        loading: 'Removing...',
        success: 'Removed',
        error: 'Cannot save',
      },
      {
        success: {
          icon: '🗑️',
        },
      }
    )
  } catch (err) {
    console.error('Cannot delete cmp', err)
    toast.error('Cannot delete cmp')
    throw err
  }
}
