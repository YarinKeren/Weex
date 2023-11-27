export const SET_CMP = 'SET_CMP'
export const UPDATE_CMP = 'UPDATE_CMP'
export const UNDO_CMP = 'UNDO_CMP'

const initialState = {
  cmp: {},
  lastUpdatedCmp: null,
}

export function cmpEditorReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CMP:
      return { ...state, cmp: { ...action.cmp } }

    case UPDATE_CMP:
      return { ...state, cmp: action.cmp }

    // case UNDO_CMP:
    //   if (state.lastRemovedCmp) {
    //     return { ...state, cmp: cmp, lastRemovedWap: null }
    //   } else {
    //     return state
    //   }

    default:
      return state
  }
}
