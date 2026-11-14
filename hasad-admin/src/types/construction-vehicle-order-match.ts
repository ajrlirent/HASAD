import { OrderMatchNegotiationStatus, SubCategory, Timestamps } from "."
import { ConstructionVehicleOrder, ConstructionVehicleOrderBase } from "./construction-vehicle-order"
import { UserBase } from "./user"

export type ConstructionVehicleOrderMatchAttachment = Timestamps & {
    id: number
    match_id: number
    attachment_id: number,
    price: number
    attachment: Timestamps &{
        id: number
        sub_category_id: number
        price: number
        vehicle_id: number
        sub_category: SubCategory
    }
}

export type ConstructionVehicleOrderMatchBase = Timestamps & {
    id: number
    order_id: number
    provider_id: number
    construction_vehicle_id: number
    price_per_day: number
    operator_price: number
    transport_price: number
    total_price: number
    status: OrderMatchNegotiationStatus
    renter_accepted_at: string
    provider_accepted_at: string
}

export type ConstructionVehicleOrderMatch = Timestamps & ConstructionVehicleOrderMatchBase & {
    order: ConstructionVehicleOrderBase & {
        user: UserBase,
        sub_category: SubCategory
    }
    provider: UserBase
}

export type ConstructionVehicleOrderMatchDetailed = Timestamps & ConstructionVehicleOrderMatchBase & {
    order: ConstructionVehicleOrder
    provider: UserBase
    attachments: ConstructionVehicleOrderMatchAttachment[]
}