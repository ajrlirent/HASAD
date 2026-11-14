import { OrderMatchNegotiationStatus, SubCategory, Timestamps } from "."
import { TransportationVehicleOrder } from "./transportation-vehicle-order"
import { UserBase } from "./user"
import { Vehicle } from "./vehicle"

export type TransportationVehicleOrderMatchBase = Timestamps & {
    id: number
    order_id: number
    provider_id: number
    transportation_vehicle_id: number
    price_per_day: number
    operator_price: number
    price_of_distance: number
    total_price: number
    status: OrderMatchNegotiationStatus
    renter_accepted_at: string
    provider_accepted_at: string
}

export type TransportationVehicleOrderMatch = Timestamps & TransportationVehicleOrderMatchBase & {
    order: TransportationVehicleOrder & {
        user: UserBase,
        sub_category: SubCategory
    }
    provider: UserBase
}

export type TransportationVehicleOrderMatchDetailed = Timestamps & TransportationVehicleOrderMatchBase & {
    order: TransportationVehicleOrder
    provider: UserBase
    transportationVehicle: Vehicle
}