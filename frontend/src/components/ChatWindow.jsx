import { Card } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import axios from 'axios'
import MessageForm from './MessageForm.jsx'
import { addMessages } from '../slices/messagesSlice.js'

const getMessages = async (userToken) => {
  try {
    const response = await axios.get('/api/v1/messages', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    const channels = response.data
    return channels
  }
  catch (err) {
    console.log(err)
    throw err
  }
}

const ChatWindow = () => {
  const dispatch = useDispatch()

  const token = useSelector(state => state.auth.user.token)
  const messages = useSelector(state => state.messages.messages)
  const activeChannel = useSelector(state => state.channels.activeChannel)
  const filteredMessages = messages.filter(message => message.channelId === activeChannel?.id)

  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: 'instant' })
  }, [filteredMessages])

  useEffect(() => {
    if (token) {
      const fetchMessages = async () => {
        try {
          const messages = await getMessages(token)
          dispatch(addMessages(messages))
        }
        catch (error) {
          console.log(error)
        }
      }
      fetchMessages()
    }
  }, [token, dispatch])

  return (
    <>
      {activeChannel && (
        <div className="bg-light border-bottom p-3">
          <h5 className="mb-0">{`# ${activeChannel.name}`}</h5>
        </div>
      )}
      <Card className="flex-grow-1 rounded-0 border-0 d-flex flex-column">
        <Card.Body className="overflow-auto" style={{ maxHeight: '79vh' }}>
          {filteredMessages.map(message => (
            <div key={message.id} className="mb-2" style={{ wordWrap: 'break-word' }}>
              <strong>
                {message.username}
                :
              </strong>
              {message.body}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Card.Body>
      </Card>
      <MessageForm />
    </>
  )
}

export default ChatWindow
