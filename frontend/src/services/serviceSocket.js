import socket from '../utils/socket'
import { dispatch, getState } from '../slices/index.js'
import { addNewChannel, removeChannel, renameChannel, setActiveChannel } from '../slices/channelsSlice.js'
import { addNewMessage, removeMessage } from '../slices/messagesSlice.js'

const setupSocketListeners = () => {
  socket.on('newChannel', (payload) => {
    dispatch(addNewChannel(payload))
  })

  socket.on('removeChannel', (payload) => {
    const { channels, activeChannel } = getState().channels
    const { messages } = getState().messages
    dispatch(removeChannel(payload))
    messages.forEach(message => dispatch(removeMessage(payload, message)))
    if (payload.id === activeChannel.id) {
      dispatch(setActiveChannel(channels[0]))
    }
  })

  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload))
  })

  socket.on('newMessage', (payload) => {
    dispatch(addNewMessage(payload))
  })

  return () => {
    socket.off('newChannel')
    socket.off('removeChannel')
    socket.off('renameChannel')
    socket.off('newMessage')
  }
}

export const initSocket = () => {
  return setupSocketListeners()
}
