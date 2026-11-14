"use client";
import EmblaCarousel from "@/components/photos-carousel";
import { useGetAccessToken } from "@/hooks/use-get-access-token";
import { useGetMachineOrderById } from "@/hooks/use-get-machine-order-by-id";
import { filterConstructionEquipmentOrderData } from "@/lib/utils";
import { ConstructionEquipmentOrder } from "@/types/construction-equipment-order";
import Image from "next/image";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const accessToken = useGetAccessToken();

  const query = useGetMachineOrderById<ConstructionEquipmentOrder>(
    Number(params.id),
    accessToken,
    "construction-equipment-orders",
    "construction-equipment-order"
  );

  const data = filterConstructionEquipmentOrderData(
    query?.data?.data as ConstructionEquipmentOrder
  );

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error : {query.error.message}</div>;
  }

  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Construction equipment order Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          All the details of the submitted construction equipment order.
        </p>
      </div>
      <div className="flex flex-1 flex-col py-2">
        <Image
          className="h-44 w-44 flex-shrink-0 border rounded-2xl"
          src={data?.subCategoryPhoto}
          alt=""
          width={176}
          height={176}
        />
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Sub category
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.subCategory}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Needs operator?
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.operator ? "yes" : "no"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Capacity
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.capacity}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Quantity
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.quantity}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Start date
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.startDate}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              End date
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.endDate}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Hour
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.hour}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Duration
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.duration} days
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Needs transportation?
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.transport ? "yes" : "no"}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              More details
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.moreDetails}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Order submitted by
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{data?.user}</span>
              <span className="ml-4 mr-5 flex-shrink-0">
                <Link
                  href={`/dashboard/users/${data?.userId}`}
                  className="rounded-md bg-white font-medium text-hasad-600 hover:text-hasad-500"
                >
                  Details
                </Link>
              </span>
            </dd>
          </div>

          {data?.photos.length > 0 && (
            <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Photos
              </dt>
              <dd className="mt-2 text-sm text-gray-900">
                <EmblaCarousel slides={data?.photos} />
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
