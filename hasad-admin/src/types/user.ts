import { Timestamps, UserType, ReceiveNotificationsFrom, MediaItem } from "."

export type UserDocument = MediaItem<'user_id'>

export type UserBase = Timestamps & {
  id: number
  first_name: string
  last_name: string
  email: string
  email_verified_at: string
  phone: string
  user_type: UserType
  receive_notifications_from: ReceiveNotificationsFrom
  profile_picture: string | null
}

export type User = UserBase & {
  documents: UserDocument[]
}