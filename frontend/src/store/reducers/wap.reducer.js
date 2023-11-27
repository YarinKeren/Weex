export const SET_WAP = 'SET_WAP'
export const ADD_WAP = 'ADD_WAP'
export const REMOVE_WAP = 'REMOVE_WAP'
export const SET_WAPS = 'SET_WAPS'
export const REMOVE_CMP = 'REMOVE_CMP'
export const UPDATE_WAP = 'UPDATE_WAP'
export const UPDATE_WAPS = 'UPDATE_WAPS'
export const UNDO_REMOVE_CMP = 'UNDO_REMOVE_CMP'

const initialState = {
  wap: {},
  waps: [],
  lastRemovedWap: null,
}

export function wapReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WAP:
      return { ...state, wap: { ...action.wap } }

    case SET_WAPS:
      return { ...state, waps: action.waps }

    case REMOVE_CMP: {
      const lastRemovedWap = state.wap.cmps.find(cmp => cmp._id === action.cmpId)
      const cmps = state.wap.cmps.filter(cmp => cmp._id !== action.cmpId)
      const updatedWap = { ...state.wap, cmps }
      return { ...state, wap: updatedWap, lastRemovedWap }
    }

    case ADD_WAP:
      return { ...state, waps: [...state.waps, action.wap] }

    case REMOVE_WAP:
      return { ...state, waps: state.waps.filter(wap => wap._id !== action.wapId) }

    case UPDATE_WAP:
      return { ...state, wap: { ...action.wap } }

    case UPDATE_WAPS:
      return { ...state, waps: [...state.waps, action.wap] }

    //TODO: Decide if needed
    // case UNDO_REMOVE_WAP:
    //   if (state.lastRemovedWap) {
    //     return { ...state, wap: [...state.wap.cmps, state.lastRemovedWap], lastRemovedWap: null }
    //   } else {
    //     return state
    //   }

    case UNDO_REMOVE_CMP:
      return {
        ...state,
        wap: {
          ...state.wap,
          cmps: [...state.wap.cmps, action.removedCmp],
        },
      }

    default:
      return state
  }
}
