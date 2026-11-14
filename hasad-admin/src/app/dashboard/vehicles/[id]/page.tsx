"use client";
import { DisplayActivityStatus } from "@/components/display-activity-status";
import { DisplayApprovalStatus } from "@/components/display-approval-status";
import { DocumentView } from "@/components/document-view";
import EmblaCarousel from "@/components/photos-carousel";
import { useGetAccessToken } from "@/hooks/use-get-access-token";
import { useGetMachineById } from "@/hooks/use-get-machine-by-id";
import { filterVehicleData, formatNumberWithCommas } from "@/lib/utils";
import { Vehicle } from "@/types/vehicle";
import Image from "next/image";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const accessToken = useGetAccessToken();

  const query = useGetMachineById<Vehicle>(
    Number(params.id),
    accessToken,
    "vehicles",
    "vehicle"
  );

  const data = filterVehicleData(query?.data?.data as Vehicle);

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
          Vehicle Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          All the details of the submitted vehicle.
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
              Category
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.category}
            </dd>
          </div>

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
              Brand
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.brand}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Model
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.model}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Year
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.year}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Offer type
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.offerType}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Price per day
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {formatNumberWithCommas(data?.pricePerDay)} DZD
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Price per month
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {formatNumberWithCommas(data?.pricePerMonth)} DZD
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Transportation price
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {formatNumberWithCommas(data?.transportationPrice)} DZD
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Operator price
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {formatNumberWithCommas(data?.operatorPrice)} DZD
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Region
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.region}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              City
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.city}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Phone number
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {data?.phoneNumber}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Activity status
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <DisplayActivityStatus value={data?.activityStatus} />
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Approval status
            </dt>
            <dd className="mt-1 flex justify-between text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <DisplayApprovalStatus value={data?.approvalStatus} />
              <span className="ml-4 mr-5 flex-shrink-0">
                <Link
                  href={`/dashboard/vehicles/${params.id}/edit-approval-status`}
                  className="rounded-md bg-white font-medium text-hasad-600 hover:text-hasad-500"
                >
                  Edit
                </Link>
              </span>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Owner
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{data?.owner}</span>
              <span className="ml-4 mr-5 flex-shrink-0">
                <Link
                  href={`/dashboard/vehicles/${params.id}/owner`}
                  className="rounded-md bg-white font-medium text-hasad-600 hover:text-hasad-500"
                >
                  Details
                </Link>
              </span>
            </dd>
          </div>

          {data?.attachments?.map((attachment, i) => (
            <div
              key={attachment.id}
              className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            >
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Attachment N°{i}
              </dt>
              <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                <span className="flex-grow">{attachment?.subCategory}</span>
                <span className="ml-4 mr-5 flex-shrink-0">
                  {formatNumberWithCommas(attachment?.price)} DZD
                </span>
                <span className="ml-4 mr-5 flex-shrink-0">
                  <Link
                    href={`/dashboard/attachments/${attachment?.id}`}
                    className="rounded-md bg-white font-medium text-hasad-600 hover:text-hasad-500"
                  >
                    Details
                  </Link>
                </span>
              </dd>
            </div>
          ))}

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Documents
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
                {data?.documents?.map((document) => (
                  <DocumentView
                    key={document.id}
                    fileName={document.fileName}
                    url={document.url}
                  />
                ))}
              </ul>
            </dd>
          </div>
          <div className="border-t border-gray-100 px-4 py-6 sm:col-span-2 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Photos
            </dt>
            <dd className="mt-2 text-sm text-gray-900">
              <EmblaCarousel slides={data?.photos} />
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
