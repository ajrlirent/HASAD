import { ReceiveNotificationsFrom, UserType } from "@/types";
import { Attachment } from "@/types/attachment";
import { ConstructionAttachmentOrder } from "@/types/construction-attachment-order";
import { ConstructionAttachmentOrderMatchDetailed } from "@/types/construction-attachment-order-match";
import { ConstructionEquipmentOrder } from "@/types/construction-equipment-order";
import { ConstructionEquipmentOrderMatchDetailed } from "@/types/construction-equipment-order-match";
import { ConstructionVehicleOrder } from "@/types/construction-vehicle-order";
import { ConstructionVehicleOrderMatchDetailed } from "@/types/construction-vehicle-order-match";
import { Equipment } from "@/types/equipment";
import { TransportationVehicleOrder } from "@/types/transportation-vehicle-order";
import { TransportationVehicleOrderMatchDetailed } from "@/types/transportation-vehicle-order-match";
import { User } from "@/types/user";
import { Vehicle } from "@/types/vehicle";
import { UseQueryResult } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

export function onError(error: Error) {
  console.error(error);
  if (axios.isAxiosError(error) && error.response) {
    toast.error(`${error.response.data.message || "Something went wrong"}`);
  } else {
    toast.error(`${error.message}`);
  }
}

export function classNames(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export function modifiedUrl(url: string) {
  const modifiedUrl = url.replace("public", "");
  return `http://192.168.1.7:8000/storage${modifiedUrl}`;
}

export function getFileNameFromPath(filePath: string): string {
  return filePath.split("/").pop() || "";
}

export function formatNumberWithCommas(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function displayUserType(userType: UserType) {
  switch (userType) {
    case "provider_individual":
      return "Provider Individual";
    case "provider_society":
      return "Provider Society";
    case "renter_individual":
      return "Renter Individual";
    case "renter_society":
      return "Renter Society";
    default:
      return "Admin";
  }
}

export function displayReceiveNotificationsFrom(
  receiveNotificationsFrom: ReceiveNotificationsFrom
) {
  switch (receiveNotificationsFrom) {
    case "renter_society":
      return "Renter Society";
    case "renter_individual":
      return "Renter Individual";
    case "both":
      return "Renters Society and Individual";
    default:
      return "None";
  }
}

export function filterUserData(data: User) {
  return {
    fullName: `${data?.first_name} ${data?.last_name}`,
    email: data?.email,
    phone: data?.phone,
    userType: displayUserType(data?.user_type),
    receiveNotificationsFrom: displayReceiveNotificationsFrom(
      data?.receive_notifications_from
    ),
    documents: data?.documents?.map((document) => ({
      id: document?.id,
      fileName: getFileNameFromPath(document?.path),
      url: modifiedUrl(document?.path),
    })),
    profilePicture: data.profile_picture
      ? modifiedUrl(data.profile_picture)
      : "",
  };
}

export function filterVehicleData(data: Vehicle) {
  return {
    category: data?.category?.label,
    subCategory: data?.sub_category?.label,
    subCategoryPhoto: modifiedUrl(data?.sub_category?.photo ?? ""),
    brand: data?.brand,
    model: data?.model,
    year: data?.year,
    offerType: data?.offer_type,
    pricePerDay: data?.price_per_day,
    pricePerMonth: data?.price_per_month,
    transportationPrice: data?.transport_price,
    operatorPrice: data?.operator_price,
    region: data?.region,
    city: data?.city,
    phoneNumber: data?.phone_number,
    activityStatus: data?.activity_status,
    approvalStatus: data?.approval_status,
    owner: `${data?.user?.first_name} ${data?.user?.last_name}`,
    attachments:
      data?.attachments?.map((attachment) => ({
        id: attachment?.id,
        subCategory: attachment?.sub_category?.label,
        price: attachment?.price,
      })) ?? [],
    documents: data?.documents?.map((document) => ({
      id: document?.id,
      fileName: getFileNameFromPath(document?.path),
      url: modifiedUrl(document?.path),
    })),
    photos: data?.photos?.map((photo) => modifiedUrl(photo?.path)),
  };
}

export function filterEquipmentData(data: Equipment) {
  return {
    category: data?.category?.label,
    subCategory: data?.sub_category?.label,
    subCategoryPhoto: modifiedUrl(data?.sub_category?.photo ?? ""),
    brand: data?.brand,
    model: data?.model,
    year: data?.year,
    offerType: data?.offer_type,
    pricePerDay: data?.price_per_day,
    pricePerMonth: data?.price_per_month,
    transportationPrice: data?.transport_price,
    operatorPrice: data?.operator_price,
    region: data?.region,
    city: data?.city,
    phoneNumber: data?.phone_number,
    activityStatus: data?.activity_status,
    approvalStatus: data?.approval_status,
    owner: `${data?.user?.first_name} ${data?.user?.last_name}`,
    documents: data?.documents?.map((document) => ({
      id: document?.id,
      fileName: getFileNameFromPath(document?.path),
      url: modifiedUrl(document?.path),
    })),
    photos: data?.photos?.map((photo) => modifiedUrl(photo?.path)),
  };
}

export function filterAttachmentData(data: Attachment) {
  return {
    subCategory: data?.sub_category?.label,
    subCategoryPhoto: modifiedUrl(data?.sub_category?.photo ?? ""),
    brand: data?.brand ?? "NA",
    model: data?.model ?? "NA",
    year: data?.year ?? "NA",
    offerType: data?.offer_type ?? "NA",
    pricePerDay: data?.price_per_day ?? 0,
    pricePerMonth: data?.price_per_month ?? 0,
    transportationPrice: data?.transport_price ?? 0,
    region: data?.region ?? "NA",
    city: data?.city ?? "NA",
    phoneNumber: data?.phone_number ?? "NA",
    activityStatus: data?.activity_status,
    approvalStatus: data?.approval_status,
    owner: `${data?.user?.first_name} ${data?.user?.last_name}`,
    documents: data?.documents?.map((document) => ({
      id: document?.id,
      fileName: getFileNameFromPath(document?.path),
      url: modifiedUrl(document?.path),
    })),
    photos: data?.photos?.map((photo) => modifiedUrl(photo?.path)),
  };
}

export function filterConstructionVehicleOrderData(
  data: ConstructionVehicleOrder
) {
  return {
    subCategory: data?.sub_category?.label,
    subCategoryPhoto: modifiedUrl(data?.sub_category?.photo ?? ""),
    operator: data?.operator,
    capacity: data?.capacity,
    quantity: data?.quantity,
    duration: data?.duration,
    startDate: data?.start_date,
    endDate: data?.end_date,
    hour: data?.hour,
    transport: data?.transport,
    moreDetails: data?.more_details,
    user: `${data?.user?.first_name} ${data?.user?.last_name}`,
    photos: data?.photos?.map((photo) => modifiedUrl(photo?.path)),
    userId: data?.user_id,
    attachments:
      data?.attachments?.map((attachment) => ({
        id: attachment?.id,
        subCategory: attachment?.sub_category?.label,
      })) ?? [],
  };
}

export function filterConstructionEquipmentOrderData(
  data: ConstructionEquipmentOrder
) {
  return {
    subCategory: data?.sub_category?.label,
    subCategoryPhoto: modifiedUrl(data?.sub_category?.photo ?? ""),
    operator: data?.operator,
    capacity: data?.capacity,
    quantity: data?.quantity,
    duration: data?.duration,
    startDate: data?.start_date,
    endDate: data?.end_date,
    hour: data?.hour,
    transport: data?.transport,
    moreDetails: data?.more_details,
    user: `${data?.user?.first_name} ${data?.user?.last_name}`,
    photos: data?.photos?.map((photo) => modifiedUrl(photo?.path)),
    userId: data?.user_id,
  };
}

export function filterConstructionAttachmentOrderData(
  data: ConstructionAttachmentOrder
) {
  return {
    subCategory: data?.sub_category?.label,
    subCategoryPhoto: modifiedUrl(data?.sub_category?.photo ?? ""),
    capacity: data?.capacity,
    quantity: data?.quantity,
    duration: data?.duration,
    startDate: data?.start_date,
    endDate: data?.end_date,
    hour: data?.hour,
    transport: data?.transport,
    moreDetails: data?.more_details,
    user: `${data?.user?.first_name} ${data?.user?.last_name}`,
    photos: data?.photos?.map((photo) => modifiedUrl(photo?.path)),
    userId: data?.user_id,
  };
}

export function filterTransportationVehicleOrderData(
  data: TransportationVehicleOrder
) {
  return {
    subCategory: data?.sub_category?.label,
    subCategoryPhoto: modifiedUrl(data?.sub_category?.photo ?? ""),
    operator: data?.operator,
    capacity: data?.capacity,
    quantity: data?.quantity,
    equipments: data?.equipments,
    yourNeed: data?.your_need,
    departureLocation: data?.departure_location,
    arrivalLocation: data?.arrival_location,
    duration: data?.duration,
    startDate: data?.start_date,
    endDate: data?.end_date,
    hour: data?.hour,
    moreDetails: data?.more_details,
    user: `${data?.user?.first_name} ${data?.user?.last_name}`,
    photos: data?.photos?.map((photo) => modifiedUrl(photo?.path)),
    userId: data?.user_id,
  };
}

export function filterConstructionVehicleOrderMatchData(
  data: ConstructionVehicleOrderMatchDetailed
) {
  return {
    subCategory: data?.order?.sub_category?.label,
    subCategoryPhoto: modifiedUrl(data?.order?.sub_category?.photo ?? ""),
    provider: `${data?.provider?.first_name} ${data?.provider?.last_name}`,
    renter: `${data?.order?.user?.first_name} ${data?.order?.user?.last_name}`,
    capacity: data?.order?.capacity,
    quantity: data?.order?.quantity,
    duration: data?.order?.duration,
    startDate: data?.order?.start_date,
    endDate: data?.order?.end_date,
    operator: data?.order?.operator,
    hour: data?.order?.hour,
    transport: data?.order?.transport,
    attachments: data?.attachments?.map(attachment => ({
      id: attachment?.id,
      subCategory: attachment?.attachment?.sub_category?.label,
      price: attachment?.price
    })),
    moreDetails: data?.order?.more_details,
    photos: data?.order?.photos?.map((photo) => modifiedUrl(photo?.path)),
    pricePerDay: data?.price_per_day,
    operatorPrice: data?.operator_price,
    transportPrice: data?.transport_price,
    totalPrice: data?.total_price,
    negotiationStatus: data?.status,
    renterId: data?.order?.user_id,
    providerId: data?.provider_id,
  };
}

export function filterConstructionEquipmentOrderMatchData(
  data: ConstructionEquipmentOrderMatchDetailed
) {
  return {
    subCategory: data?.order?.sub_category?.label,
    subCategoryPhoto: modifiedUrl(data?.order?.sub_category?.photo ?? ""),
    provider: `${data?.provider?.first_name} ${data?.provider?.last_name}`,
    renter: `${data?.order?.user?.first_name} ${data?.order?.user?.last_name}`,
    capacity: data?.order?.capacity,
    quantity: data?.order?.quantity,
    duration: data?.order?.duration,
    startDate: data?.order?.start_date,
    endDate: data?.order?.end_date,
    operator: data?.order?.operator,
    hour: data?.order?.hour,
    transport: data?.order?.transport,
    moreDetails: data?.order?.more_details,
    photos: data?.order?.photos?.map((photo) => modifiedUrl(photo?.path)),
    pricePerDay: data?.price_per_day,
    operatorPrice: data?.operator_price,
    transportPrice: data?.transport_price,
    totalPrice: data?.total_price,
    negotiationStatus: data?.status,
    renterId: data?.order?.user_id,
    providerId: data?.provider_id
  };
}

export function filterConstructionAttachmentOrderMatchData(
  data: ConstructionAttachmentOrderMatchDetailed
) {
  return {
    subCategory: data?.order?.sub_category?.label,
    subCategoryPhoto: modifiedUrl(data?.order?.sub_category?.photo ?? ""),
    provider: `${data?.provider?.first_name} ${data?.provider?.last_name}`,
    renter: `${data?.order?.user?.first_name} ${data?.order?.user?.last_name}`,
    capacity: data?.order?.capacity,
    quantity: data?.order?.quantity,
    duration: data?.order?.duration,
    startDate: data?.order?.start_date,
    endDate: data?.order?.end_date,
    hour: data?.order?.hour,
    transport: data?.order?.transport,
    moreDetails: data?.order?.more_details,
    photos: data?.order?.photos?.map((photo) => modifiedUrl(photo?.path)),
    pricePerDay: data?.price_per_day,
    operatorPrice: data?.operator_price,
    transportPrice: data?.transport_price,
    totalPrice: data?.total_price,
    negotiationStatus: data?.status,
    renterId: data?.order?.user_id,
    providerId: data?.provider_id
  };
}

export function filterTransportationVehicleOrderMatchData(
  data: TransportationVehicleOrderMatchDetailed
) {
  return {
    subCategory: data?.order?.sub_category?.label,
    subCategoryPhoto: modifiedUrl(data?.order?.sub_category?.photo ?? ""),
    provider: `${data?.provider?.first_name} ${data?.provider?.last_name}`,
    renter: `${data?.order?.user?.first_name} ${data?.order?.user?.last_name}`,
    capacity: data?.order?.capacity,
    quantity: data?.order?.quantity,
    equipments: data?.order?.equipments,
    yourNeed: data?.order?.your_need,
    departureLocation: data?.order?.departure_location,
    arrivalLocation: data?.order?.arrival_location,
    duration: data?.order?.duration,
    startDate: data?.order?.start_date,
    endDate: data?.order?.end_date,
    operator: data?.order?.operator,
    hour: data?.order?.hour,
    moreDetails: data?.order?.more_details,
    photos: data?.order?.photos?.map((photo) => modifiedUrl(photo?.path)),
    pricePerDay: data?.price_per_day,
    operatorPrice: data?.operator_price,
    priceOfDistance: data?.price_of_distance,
    totalPrice: data?.total_price,
    negotiationStatus: data?.status,
    renterId: data?.order?.user_id,
    providerId: data?.provider_id
  };
}

export function getMachineApprovalStatus<
  T extends Vehicle | Equipment | Attachment
>(query: UseQueryResult<AxiosResponse<T, any>, Error>) {
  const data = query?.data?.data as T;
  return data?.approval_status;
}

export function capitalize(str: string): string {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
