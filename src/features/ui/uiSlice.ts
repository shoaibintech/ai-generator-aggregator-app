import { createSlice } from '@reduxjs/toolkit'

type UiState = {
  feedbackOpen: boolean
  selectedGenerationId: string | null
}

const initialState: UiState = {
  feedbackOpen: false,
  selectedGenerationId: null,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    closeFeedback(state) {
      state.feedbackOpen = false
    },
    openFeedback(state) {
      state.feedbackOpen = true
    },
    selectGeneration(state, action: { payload: string }) {
      state.selectedGenerationId = action.payload
    },
    clearSelectedGeneration(state) {
      state.selectedGenerationId = null
    },
  },
})

export const { clearSelectedGeneration, closeFeedback, openFeedback, selectGeneration } = uiSlice.actions
export default uiSlice.reducer
