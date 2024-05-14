import { UserType } from 'types/user'
import { atom } from 'recoil'
import { MomentInput } from 'moment'
import { RecentUsers } from 'types/chat'

export const CallData = atom<{
  incoming: boolean
  from: UserType | null
  active: boolean
}>({
  key: 'CallData',
  default: {
    incoming: false,
    from: null,
    active: false,
  },
})

// export const CallData = atom<{
//   incoming: boolean
//   active: boolean
//   from: UserType | null
//   incomingSignal: string
//   myPeerId: string
//   type: 'audio' | 'video'
//   to: RecentUsers | null
//   outgoing: boolean
//   time: MomentInput
//   acceptCall: (() => void) | null
//   callUser: (() => {}) | null
// }>({
//   key: 'CallData',
//   default: {
//     incoming: false,
//     active: false,
//     from: null,
//     incomingSignal: '',
//     outgoing: false,
//     myPeerId: '',
//     to: null,
//     type: 'video',
//     acceptCall: null,
//     callUser: null,
//     time: 0,
//   },
// })

export const CallSpecs = atom<{
  micOn: boolean
  videoOn: boolean
  friendVideoOn: boolean
  sharingScreen: boolean
  switchVideo: boolean
  busy: boolean
  ringing: boolean
  pipMode: boolean
  message: string
}>({
  key: 'CallSpecs',
  default: {
    micOn: true,
    videoOn: true,
    sharingScreen: false,
    friendVideoOn: true,
    switchVideo: false,
    busy: false,
    ringing: false,
    pipMode: false,
    message: '',
  },
})
