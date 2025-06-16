import { useEffect } from 'react'
import { initSocket } from '../services/serviceSocket.js'

const useSocket = () => {
  useEffect(() => {
    const cleanup = initSocket()
    return cleanup
  }, [])
}

export default useSocket