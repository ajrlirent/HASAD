import { TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useGetAccessToken } from "@/hooks/use-get-access-token";
import { useDeleteMachineSubCategory } from "@/hooks/use-delete-machine-sub-category";
import { onError } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Image from "next/image";

type ModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: number;
  machineType: "vehicle" | "equipment";
};

export function DeleteModal({ open, setOpen, id, machineType }: ModalProps) {
  const accessToken = useGetAccessToken();

  const queryClient = useQueryClient();

  const mutation = useDeleteMachineSubCategory(accessToken, id, machineType);

  function onDelete() {
    mutation.mutate(undefined, {
      onError: (error) => onError(error),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [
            `${machineType}-sub-categories`,
            id,
            accessToken,
            `${machineType}-category`,
          ],
        });
        toast.success("Item deleted successfully!");
        setOpen(false);
      },
    });
  }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-red-600"
                  />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Delete sub category
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this item?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={onDelete}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Delete
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

type Props = {
  photo: string;
  label: string;
  id: number;
  machineType: "vehicle" | "equipment";
  categoryId: number;
};

export function GridElement({
  photo,
  label,
  id,
  machineType,
  categoryId,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DeleteModal
        id={id}
        machineType={machineType}
        open={open}
        setOpen={setOpen}
      />
      <li className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
        <div className="flex flex-1 flex-col p-8">
          <Image
            className="mx-auto h-32 w-32 flex-shrink-0 rounded-2xl"
            src={photo}
            alt=""
            width={128}
            height={128}
          />
          <h3 className="mt-6 text-sm font-medium text-gray-900">{label}</h3>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1">
              <Link
                href={`/dashboard/${machineType}-categories/${categoryId}/${id}`}
                className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-3 text-sm font-semibold text-gray-900"
              >
                <PencilIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Edit
              </Link>
            </div>
            <div className="-ml-px flex w-0 flex-1">
              <button
                onClick={() => setOpen(true)}
                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-3 text-sm font-semibold text-gray-900"
              >
                <TrashIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Delete
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
