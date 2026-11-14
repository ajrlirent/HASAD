import { OrderPhoto, SubCategory, Timestamps, Transport } from "."
import { User } from "./user"

export type ConstuctionVehicleOrderAttachment = Timestamps & {
    id: number
    sub_category_id: number
    order_id: number
    sub_category: SubCategory
}

export type ConstructionVehicleOrderBase = Timestamps & {
    id: number
    sub_category_id: number
    operator: boolean
    capacity: number
    quantity: number
    duration: number
    start_date: string
    end_date: string
    hour: string
    transport: Transport
    more_details: string
    user_id: number
}

export type ConstructionVehicleOrder = Timestamps & ConstructionVehicleOrderBase & {
    user: User
    sub_category: SubCategory
    photos: OrderPhoto[]
    attachments?: ConstuctionVehicleOrderAttachment[]
}