import { OrderMatchNegotiationStatus, SubCategory, Timestamps } from "."
import { Attachment } from "./attachment"
import { ConstructionAttachmentOrder } from "./construction-attachment-order"
import { UserBase } from "./user"

export type ConstructionAttachmentOrderMatchBase = Timestamps & {
    id: number
    order_id: number
    provider_id: number
    construction_attachment_id: number
    price_per_day: number
    operator_price: number
    transport_price: number
    total_price: number
    status: OrderMatchNegotiationStatus
    renter_accepted_at: string
    provider_accepted_at: string
}

export type ConstructionAttachmentOrderMatch = Timestamps & ConstructionAttachmentOrderMatchBase & {
    order: ConstructionAttachmentOrder & {
        user: UserBase,
        sub_category: SubCategory
    }
    provider: UserBase
}

export type ConstructionAttachmentOrderMatchDetailed = Timestamps & ConstructionAttachmentOrderMatchBase & {
    order: ConstructionAttachmentOrder
    provider: UserBase
    constructionEquipment: Attachment
}