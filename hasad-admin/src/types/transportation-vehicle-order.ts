import { OrderPhoto, SubCategory, Timestamps } from "."
import { User } from "./user"

export type YourNeed = "per_day" | "per_distance"

export type TransportationVehicleOrderBase = Timestamps & {
    id: number
    sub_category_id: number
    operator: boolean
    capacity: number
    quantity: number
    equipments: boolean
    your_need: YourNeed
    departure_location?: string
    arrival_location?: string
    duration?: number
    start_date?: string
    end_date?: string
    hour?: string
    more_details: string
    user_id: number
}

export type TransportationVehicleOrder = Timestamps & TransportationVehicleOrderBase & {
    user: User
    sub_category: SubCategory
    photos: OrderPhoto[]
}