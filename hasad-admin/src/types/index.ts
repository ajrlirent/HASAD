import { z } from "zod"
import { AddMachineCategorySchema, AddMachineSubCategorySchema, EditApprovalStatusSchema, EditMachineCategorySchema, EditMachineSubCategorySchema } from "@/lib/validations"
import { ConstructionAttachmentOrder, ConstructionAttachmentOrderBase } from "./construction-attachment-order"
import { ConstructionEquipmentOrder, ConstructionEquipmentOrderBase } from "./construction-equipment-order"
import { ConstructionVehicleOrder, ConstructionVehicleOrderBase } from "./construction-vehicle-order"
import { TransportationVehicleOrder, TransportationVehicleOrderBase } from "./transportation-vehicle-order"
import { ConstructionVehicleOrderMatch, ConstructionVehicleOrderMatchDetailed } from "./construction-vehicle-order-match"
import { ConstructionEquipmentOrderMatch, ConstructionEquipmentOrderMatchDetailed } from "./construction-equipment-order-match"
import { ConstructionAttachmentOrderMatch, ConstructionAttachmentOrderMatchDetailed } from "./construction-attachment-order-match"
import { TransportationVehicleOrderMatch, TransportationVehicleOrderMatchDetailed } from "./transportation-vehicle-order-match"

export type MachineTypePlural = "vehicles" | "attachments" | "equipments"

export type ResourceType = "vehicles" | "attachments" | "equipments" | "users" | MachineOrderTypePlural | MachineOrderMatchTypePlural

export type MachineType = "vehicle" | "equipment" | "attachment"

export type UserType = "provider_individual" | "provider_society" | "renter_individual" | "renter_society" | "admin"

export type ReceiveNotificationsFrom = "renter_individual" | "renter_society" | "both" | "none"

export type ActivityStatus = "active" | "in_service" | "out_of_service"

export type ApprovalStatus = "approved" | "not_approved"

export type OfferType = "fixed" | "negotiable"

export type Timestamps = {
  created_at: string
  updated_at: string
}

export type Category = Timestamps & {
  id: number
  label: string
  value: string
}

export type SubCategory = Timestamps & {
  id: number
  category_id: number
  label: string
  value: string
  photo: string
}

export type OrderMatchNegotiationStatus = "pending" | "accepted_by_renter" | "accepted_by_provider" | "negotiation" | "settled"

export type MediaItem<IDType extends string> = Timestamps & {
  id: number
  path: string
} & Record<IDType, number>

export type Transport = "by_yourself" | "by_us"

export type OrderPhoto = MediaItem<'order_id'>

export type OrderBase = ConstructionVehicleOrderBase | ConstructionEquipmentOrderBase | ConstructionAttachmentOrderBase | TransportationVehicleOrderBase

export type Order = ConstructionVehicleOrder | ConstructionEquipmentOrder | ConstructionAttachmentOrder | TransportationVehicleOrder

export type Match = ConstructionVehicleOrderMatch | ConstructionEquipmentOrderMatch | ConstructionAttachmentOrderMatch | TransportationVehicleOrderMatch

export type MatchDetailed = ConstructionVehicleOrderMatchDetailed | ConstructionEquipmentOrderMatchDetailed | ConstructionAttachmentOrderMatchDetailed | TransportationVehicleOrderMatchDetailed

export type MachineOrderTypePlural = "construction-vehicle-orders" | "construction-equipment-orders" | "construction-attachment-orders" | "transportation-vehicle-orders"

export type MachineOrderMatchTypePlural = "construction-vehicle-order-matches" | "construction-equipment-order-matches" | "construction-attachment-order-matches" | "transportation-vehicle-order-matches"

export type MachineOrderType = "construction-vehicle-order" | "construction-equipment-order" | "construction-attachment-order" | "transportation-vehicle-order"

export type MachineOrderMatchType = "construction-vehicle-order-match" | "construction-equipment-order-match" | "construction-attachment-order-match" | "transportation-vehicle-order-match"

export type EditApprovalStatusInput = z.infer<typeof EditApprovalStatusSchema>

export type EditMachineCategoryInput = z.infer<typeof EditMachineCategorySchema>

export type AddMachineCategoryInput = z.infer<typeof AddMachineCategorySchema>

export type AddMachineSubCategoryInput = z.infer<typeof AddMachineSubCategorySchema>

export type EditMachineSubCategoryInput = z.infer<typeof EditMachineSubCategorySchema>