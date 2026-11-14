import { OrderMatchNegotiationStatus, SubCategory, Timestamps } from "."
import { ConstructionEquipmentOrder, ConstructionEquipmentOrderBase } from "./construction-equipment-order"
import { Equipment } from "./equipment"
import { UserBase } from "./user"

export type ConstructionEquipmentOrderMatchBase = Timestamps & {
    id: number
    order_id: number
    provider_id: number
    construction_equipment_id: number
    price_per_day: number
    operator_price: number
    transport_price: number
    total_price: number
    status: OrderMatchNegotiationStatus
    renter_accepted_at: string
    provider_accepted_at: string
}

export type ConstructionEquipmentOrderMatch = Timestamps & ConstructionEquipmentOrderMatchBase & {
    order: ConstructionEquipmentOrderBase & {
        user: UserBase,
        sub_category: SubCategory
    }
    provider: UserBase
}

export type ConstructionEquipmentOrderMatchDetailed = Timestamps & ConstructionEquipmentOrderMatchBase & {
    order: ConstructionEquipmentOrder
    provider: UserBase
    constructionEquipment: Equipment
}