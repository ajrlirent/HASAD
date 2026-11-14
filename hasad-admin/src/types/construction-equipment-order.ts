import { OrderPhoto, SubCategory, Timestamps, Transport } from "."
import { User } from "./user"

export type ConstructionEquipmentOrderBase = Timestamps & {
    id: number
    sub_category_id: number
    operator: boolean
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

export type ConstructionEquipmentOrder = Timestamps & ConstructionEquipmentOrderBase & {
    user: User
    sub_category: SubCategory
    photos: OrderPhoto[]
}