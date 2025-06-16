import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  modalNewChat: {
    status: false,
  },
  modalRemoveChat: {
    status: false,
  },
  modalRenameChat: {
    status: false,
  },
  currentChannel: null,
}

const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModalNewChat: (state) => {
      state.modalNewChat.status = true
    },
    closeModalNewChat: (state) => {
      state.modalNewChat.status = false
    },
    openModalRemoveChat: (state) => {
      state.modalRemoveChat.status = true
    },
    closeModalRemoveChat: (state) => {
      state.modalRemoveChat.status = false
    },
    openModalRenameChat: (state) => {
      state.modalRenameChat.status = true
    },
    closeModalRenameChat: (state) => {
      state.modalRenameChat.status = false
    },
    setCurrentChannel: (state, { payload }) => {
      state.currentChannel = payload
    }
  }
})

export const {
  openModalNewChat,
  closeModalNewChat,
  openModalRemoveChat,
  closeModalRemoveChat,
  openModalRenameChat, 
  closeModalRenameChat,
  setCurrentChannel, 
} = modalsSlice.actions

export default modalsSlice.reducer
