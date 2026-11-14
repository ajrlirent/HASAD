"use client"

import { useGetAccessToken } from "@/hooks/use-get-access-token"
import { classNames, modifiedUrl, onError } from "@/lib/utils"
import { EditMachineSubCategorySchema } from "@/lib/validations"
import { EditMachineSubCategoryInput } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { PhotoIcon } from '@heroicons/react/24/solid'
import { useState, useEffect } from "react"
import Image from "next/image"
import { useGetMachineSubCategoryById } from "@/hooks/use-get-machine-sub-category-by-id"
import { useEditMachineSubCategory } from "@/hooks/use-edit-machine-sub-category"

type Props = {
    machineType: "vehicle" | "equipment"
    id: number
}

export function EditSubCategory({
    machineType,
    id
}: Props) {
    const router = useRouter()

    function goBack() {
        router.back()
    }

    const queryClient = useQueryClient()

    const accessToken = useGetAccessToken()

    const query = useGetMachineSubCategoryById(accessToken, machineType, id)

    const currentLabel = query?.data?.data?.label!

    const currentPhoto = query?.data?.data?.photo!

    const mutation = useEditMachineSubCategory(accessToken, "vehicle", id)

    const {
        handleSubmit,
        register,
        formState,
        watch
    } = useForm<EditMachineSubCategoryInput>({
        resolver: zodResolver(EditMachineSubCategorySchema),
        defaultValues: {
            label: currentLabel
        }
    })

    const [photoPreview, setPhotoPreview] = useState<string | undefined>(undefined);

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

    function onSubmit(data: EditMachineSubCategoryInput) {
        mutation.mutate(data, {
            onError: (error) => onError(error),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [`${machineType}-sub-categories`, accessToken] })
                toast.success('Sub category edited successfully!')
                goBack()
            }
        })
    }

    const isPending = formState.isSubmitting || !formState.isDirty

    if (query.isLoading) {
        return <div>Loading...</div>
    }

    if (query.isPending) {
        return <div>Loading...</div>
    }

    if (query.isError) {
        return <div>Error : {query.error.message}</div>
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Edit sub category</h2>
                    <p className="mt-1 text-sm leading-6 t128
128ext-gray-600">
                        Edit {machineType} sub category.
                    </p>

                    <div className="mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                type="text"
                                autoComplete="name"
                                defaultValue={currentLabel}
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
                                <div className="mt-4 flex text-sm item leading-6 text-gray-600">
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
                                <p className="text-xs leading-5 text-gray-600">Image size cannot be larger than 2mb</p>
                            </div>
                        </div>

                        {/* {photoPreview && ( */}
                            <div className="mt-6">
                                <Image
                                    src={photoPreview ?? modifiedUrl(currentPhoto)}
                                    alt=""
                                    width={144}
                                    height={144}
                                    className="w-36 h-36 object-cover rounded-lg"
                                />
                            </div>
                        {/* )} */}
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