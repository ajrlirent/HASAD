import { MediaItem, Timestamps, OfferType, ActivityStatus, ApprovalStatus, SubCategory } from "."
import { UserBase } from "./user"

export type AttachmentPhoto = MediaItem<'attachment_id'>

export type AttachmentDocument = MediaItem<'attachment_id'>

export type AttachmentBase = Timestamps & {
  id: number
  sub_category_id: number
  brand: string | null
  model: string | null
  year: number | null
  price_per_day: number | null
  price_per_month: number | null
  offer_type: OfferType | null
  transport_price: number | null
  region: string | null
  city: string | null
  phone_number: string | null
  activity_status: ActivityStatus
  approval_status: ApprovalStatus
  user_id: number
}

export type Attachment = Timestamps & AttachmentBase & {
  sub_category: SubCategory
  user: UserBase
  photos: AttachmentPhoto[]
  documents: AttachmentDocument[]
}