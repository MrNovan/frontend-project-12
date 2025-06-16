import { Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { setActiveChannel } from "../../slices/channelsSlice"

const UnremovableChannel = ({ channel, isActive }) => {
  const dispatch = useDispatch()

  const handleClick = (channel) => {
    dispatch(setActiveChannel(channel))
  }

  return (
    <Button
      variant={isActive ? 'primary' : 'light'}
      onClick={() => handleClick(channel)}
      className={`w-100 text-start rounded-0 border-0 ${isActive ? 'text-white' : ''}`}
      style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
    >
      # {channel.name}
    </Button>
  )
}

export default UnremovableChannel