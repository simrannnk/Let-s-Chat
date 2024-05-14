import axois from './axiosInstance'

export const SignUpMutation = async (payload: {
  name: string
  email: string
  password: string
}) => {
  const res = await axois.post('/signup', payload)
  return res.data
}

export const LoginMutation = async (payload: {
  email: string
  password: string
}) => {
  const res = await axois.post('/login', payload)
  return res.data
}
