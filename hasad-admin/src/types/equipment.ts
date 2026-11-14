import { MediaItem, Timestamps, OfferType, ActivityStatus, ApprovalStatus, Category, SubCategory } from "."
import { UserBase } from "./user"

export type EquipmentPhoto = MediaItem<'equipment_id'>

export type EquipmentDocument = MediaItem<'equipment_id'>

export type EquipmentBase = Timestamps & {
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

export type Equipment = Timestamps & EquipmentBase & {
  category: Category
  sub_category: SubCategory
  user: UserBase
  photos: EquipmentPhoto[]
  documents: EquipmentDocument[]
}