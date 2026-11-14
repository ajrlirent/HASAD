import { MediaItem, Timestamps, OfferType, ActivityStatus, ApprovalStatus, Category, SubCategory } from "."
import { UserBase } from "./user"

export type VehiclePhoto = MediaItem<'vehicle_id'>

export type VehicleDocument = MediaItem<'vehicle_id'>

export type VehicleAttachment = Timestamps & {
  id: number
  sub_category_id: number
  price: number
  vehicle_id: number
  sub_category: SubCategory
}

export type VehicleBase = Timestamps & {
  id: number
  category_id: number
  sub_category_id: number
  brand: string
  model: string
  year: number
  price_per_day: number
  price_per_month: number
  offer_type: OfferType
  transport_price: number
  operator_price: number
  region: string
  city: string
  phone_number: string
  activity_status: ActivityStatus
  approval_status: ApprovalStatus
  user_id: number
}

export type Vehicle = Timestamps & VehicleBase & {
  category: Category
  sub_category: SubCategory
  user: UserBase
  photos: VehiclePhoto[]
  documents: VehicleDocument[]
  attachments?: VehicleAttachment[]
}