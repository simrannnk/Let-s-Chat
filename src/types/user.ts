export type UserType = {
  name: string
  userId: string
  email: string
  roomIds: {
    _id: string
    name: string
    users: string[]
    isNotification?: boolean
  }[]
}
