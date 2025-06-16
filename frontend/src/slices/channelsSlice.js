import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  channels: [],
  activeChannel: null,
}

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: (state, { payload }) => {
      state.channels = payload
    },
    setActiveChannel: (state, { payload }) => {
      state.activeChannel = payload
    },
    addNewChannel: (state, { payload }) => {
      state.channels.push(payload)
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload
      state.channels = state.channels.filter((channel) => channel.id !== id)
    },
    renameChannel: (state, { payload }) => {
      const newChannels = state.channels.map((channel) => channel.id === payload.id ? payload : channel)
      state.channels = newChannels
    },
  }
})

export const { addChannels, addNewChannel, removeChannel, renameChannel, setActiveChannel } = channelsSlice.actions
export default channelsSlice.reducer