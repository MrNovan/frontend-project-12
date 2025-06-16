import { io } from 'socket.io-client'

const socket = io(import.meta.env.REACT_APP_SOCKET_PROD_ENV)
//import.meta.env.REACT_APP_SOCKET_PROD_ENV
export default socket