import { UserToken } from 'atom/user'
import { useRecoilValue } from 'recoil'
import axois from './axiosInstance'

export const CreateRoomMutation = async (payload: {
  userId: string
  name: string
  token: string
}) => {
  const res = await axois.post('/create-room', payload, {
    headers: {
      AUTH_TOKEN: payload.token,
    },
  })
  return res.data
}

export const AddRoomMutation = async (payload: {
  name: string
  userId: string
  token: string
}) => {
  const res = await axois.put('/joinroom', payload, {
    headers: {
      AUTH_TOKEN: payload.token,
    },
  })
  return res.data
}

export const GetRecentUserQuery = async (payload: {
  userId: string
  token: string
}) => {
  const res = await axois.get(`/getRooms/${payload.userId}`, {
    headers: {
      AUTH_TOKEN: payload.token,
    },
  })
  return res.data
}
