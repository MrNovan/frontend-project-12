import { Button, Dropdown, } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { setActiveChannel } from '../../slices/channelsSlice'
import { openModalRemoveChat, openModalRenameChat, setCurrentChannel } from '../../slices/modalsSlice'


const RemovableChannel = ({ channel, isActive }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const handleSetActive = (channel) => {
    dispatch(setActiveChannel(channel))
  }

  const handleClick = (openModalFunc) => {
    dispatch(setCurrentChannel(channel))
    dispatch(openModalFunc())
  }

  return (
    <div className="d-flex">
      <Button
        variant={isActive ? 'primary' : 'light'}
        onClick={() => handleSetActive(channel)}
        className={`text-start flex-grow-1 rounded-0 border-end-0 ${isActive ? 'text-white' : ''}`}
        style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
      >
        # {channel.name}
      </Button>
      <Dropdown
        align="end"
        drop="down"
        className="rounded-0"
      >
        <Dropdown.Toggle
          variant={isActive ? 'primary' : 'light'}
          className={`rounded-0 border-start-0 ${isActive ? 'text-white' : ''}`}
        >
          <span className="visually-hidden">{t('modals.controlChannel')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1" onClick={() => handleClick(openModalRemoveChat)} active={false}>{t('remove')}</Dropdown.Item>
          <Dropdown.Item eventKey="2" onClick={() => handleClick(openModalRenameChat)} active={false}>{t('rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default RemovableChannel