export type RecentUsers = {
  uuid: string
  fullName: string
  emailId: string
  profileUrl: string
}

export interface ChatMessageType {
  id: string
  roomId: string
  from: string
  msg: string
  createdAt: string
  isSent?: boolean
  name: string
}
