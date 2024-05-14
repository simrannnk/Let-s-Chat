import { UserType } from 'types/user'
import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
const User = atom<UserType | null>({
  key: 'User',
  default: null,
  effects_UNSTABLE: [persistAtom],
})
export const UserToken = atom<{ token: string; userId: string } | null>({
  key: 'UserToken',
  default: null,
  effects_UNSTABLE: [persistAtom],
})

export default User
