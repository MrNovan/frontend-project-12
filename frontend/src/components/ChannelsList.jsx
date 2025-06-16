import { ListGroup, Button, Container } from 'react-bootstrap'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import RemovableChannel from './channels/RemovableChannel.jsx'
import UnremovableChannel from './channels/UnremovableChannel.jsx'
import { openModalNewChat } from '../slices/modalsSlice.js'

const ChannelList = ({ channels }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const activeChannel = useSelector(state => state.channels.activeChannel)

  const handleShow = () => dispatch(openModalNewChat())

  const activeChannelRef = useRef(null)

  useEffect(() => {
    if (activeChannelRef.current) {
      activeChannelRef.current.scrollIntoView({ behavior: 'instant' })
    }
  }, [activeChannel])

  return (
    <Container fluid className="p-0 d-flex flex-column" style={{ height: '91vh' }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">{t('homepage.channels')}</h4>
        <Button variant="outline-primary" size="sm" onClick={handleShow}>
          +
        </Button>
      </div>
      <div style={{ flex: '1 1 auto', overflowY: 'auto', minHeight: '0' }}>
        <ListGroup>
          {channels.map(channel => (
            <ListGroup.Item
              ref={activeChannel?.id === channel.id ? activeChannelRef : null}
              key={channel.id}
              active={channel.id === activeChannel.id}
              className="p-0 border-0"
            >
              {channel.removable
                ? (
                    <RemovableChannel
                      channel={channel}
                      isActive={channel.id === activeChannel.id}
                    />
                  )
: (
                    <UnremovableChannel
                      channel={channel}
                      isActive={channel.id === activeChannel.id}
                    />
                  )}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  )
}

export default ChannelList
