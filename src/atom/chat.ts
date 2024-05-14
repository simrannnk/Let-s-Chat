import { atom } from 'recoil'

export const ActiveUser = atom<{
  name: string
  userId: string
} | null>({
  key: 'ActiveUser',
  default: null,
  dangerouslyAllowMutability: true,
})

export const Room = atom<{ createRoom: boolean; addRoom: boolean }>({
  key: '',
  default: {
    createRoom: false,
    addRoom: false,
  },
})
