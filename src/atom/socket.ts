import { atom } from 'recoil'
import { Socket as S, SocketOptions } from 'socket.io-client'

const Socket = atom<S | null>({
  key: 'Socket',
  default: null,
  dangerouslyAllowMutability: true,
})
export default Socket
