import { OrderPhoto, SubCategory, Timestamps, Transport } from "."
import { User } from "./user"

export type ConstructionAttachmentOrderBase = Timestamps & {
    id: number
    sub_category_id: number
    capacity: number
    quantity: number
    duration: number
    start_date: string
    end_date: string
    hour: string
    more_details: string
    transport: Transport
    user_id: number
}

export type ConstructionAttachmentOrder = Timestamps & ConstructionAttachmentOrderBase & {
    user: User
    sub_category: SubCategory
    photos: OrderPhoto[]
}