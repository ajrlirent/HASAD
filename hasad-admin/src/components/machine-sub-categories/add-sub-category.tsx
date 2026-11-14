"use client"

import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { classNames, onError } from "@/lib/utils"
import { AddMachineSubCategorySchema } from "@/lib/validations"
import { AddMachineSubCategoryInput } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useAddMachineSubCategory } from "@/hooks/use-add-machine-sub-category"
import { useState, useEffect } from "react"
import Image from "next/image"

type Props = {
    machineType: "vehicle" | "equipment"
    categoryId: number
}

export function AddSubCategory({
    machineType,
    categoryId
}: Props) {
    const router = useRouter()

    function goBack() {
        router.back()
    }

    const queryClient = useQueryClient()

    const accessToken = useGetAccessToken()

    const mutation = useAddMachineSubCategory(accessToken, machineType, categoryId)

    const {
        handleSubmit,
        register,
        formState,
        watch
    } = useForm<AddMachineSubCategoryInput>({
        resolver: zodResolver(AddMachineSubCategorySchema),
    })

    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const watchPhoto = watch("photo")

    useEffect(() => {
        if (watchPhoto && watchPhoto.length > 0) {
            const file = watchPhoto[0]; // Get the first file
            const previewUrl = URL.createObjectURL(file);
            setPhotoPreview(previewUrl);

            // Clean up the URL when the component unmounts or photo changes
            return () => URL.revokeObjectURL(previewUrl);
        }
    }, [watchPhoto]);

    function onSubmit(data: AddMachineSubCategoryInput) {
        mutation.mutate(data, {
            onError: (error) => onError(error),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [`${machineType}-sub-categories`, accessToken] })
                toast.success('Sub category added successfully!')
                goBack()
            }
        })
    }

    const isPending = formState.isSubmitting || mutation.isPending || !formState.isDirty

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Add sub category</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        Add {machineType} sub category.
                    </p>

                    <div className="mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                type="text"
                                autoComplete="given-name"
                                className="block w-6/12 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hasad-600 sm:text-sm sm:leading-6"
                                {...register("label")}
                            />
                        </div>
                    </div>

                    <div className="col-span-full mt-4">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                            photo
                        </label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                        htmlFor="photo"
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload an image</span>
                                        <input
                                            id="photo"
                                            type="file"
                                            accept="image/*"
                                            className="sr-only"
                                            {...register("photo")}
                                        />
                                    </label>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, WEBP</p>
                            </div>
                        </div>

                        {photoPreview && (
                            <div className="mt-6">
                                <Image
                                    src={photoPreview ?? ""}
                                    alt=""
                                    width={128}
                                    height={128}
                                    className="w-32 h-32 object-cover rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={goBack} type="button" className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isPending}
                    className={classNames(isPending ? "bg-gray-300" : "bg-hasad-600 hover:bg-hasad-500", "rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hasad-600")}
                >
                    Save
                </button>
            </div>
        </form>
    )
}