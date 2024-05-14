import axois from './axiosInstance'

export const GetUser = async ({
  userId,
  token,
}: {
  userId: string
  token: string
}) => {
  const res = await axois.get(`/getuser/${userId}`, {
    headers: {
      AUTH_TOKEN: token,
    },
  })
  return res.data
}
