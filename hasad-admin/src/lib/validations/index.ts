import { z } from "zod"

export const EditApprovalStatusSchema = z.object({
  approvalStatus: z.enum(["approved", "not_approved"]),
})

export const EditMachineCategorySchema = z.object({
  label: z.string().min(2).max(255),
})

export const AddMachineCategorySchema = EditMachineCategorySchema

export const AddMachineSubCategorySchema = z.object({
  label: z.string().min(2).max(255),
  photo: z.instanceof(FileList)
    .refine(files => files?.length === 1, "Please select a photo")
})

export const EditMachineSubCategorySchema = z.object({
  label: z.string().min(2).max(255).optional(),
  photo: z.instanceof(FileList)
    .optional()
})