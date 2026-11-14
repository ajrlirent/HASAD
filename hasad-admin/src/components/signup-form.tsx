import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SignUpSchema } from "@/lib/validations/auth";
import { useSignUp } from "@/hooks/use-signup";
import { onError } from "@/lib/utils";
import { SignUpInput } from "@/types/auth";

export default function SignUpForm() {
  const { handleSubmit, register, formState, reset } = useForm<SignUpInput>({
    resolver: zodResolver(SignUpSchema),
  });

  const mutation = useSignUp();

  const router = useRouter();

  function onSubmit(data: SignUpInput) {
    mutation.mutate(data, {
      onError: (error) => onError(error),
      onSuccess: () => {
        toast.success("Account created successfully!");
        reset();
        router.push("/signin");
      },
    });
  }
  const isPending = formState.isSubmitting || mutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="col-span-full">
        <label
          htmlFor="photo"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Photo
        </label>
        <div className="mt-2 flex items-center gap-x-3">
          <UserCircleIcon
            aria-hidden="true"
            className="h-12 w-12 text-gray-300"
          />
          <input
            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            type="file"
            id="photo"
            accept="image/*"
            {...register("profile_picture")}
          />
          {formState.errors.profile_picture && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.profile_picture.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="first-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            First name
          </label>
          <div className="mt-2">
            <input
              id="first-name"
              type="text"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hasad-600 sm:text-sm sm:leading-6"
              {...register("first_name")}
            />
            {formState.errors.first_name && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.first_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="last-name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Last name
          </label>
          <div className="mt-2">
            <input
              id="last-name"
              type="text"
              autoComplete="family-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hasad-600 sm:text-sm sm:leading-6"
              {...register("last_name")}
            />
            {formState.errors.last_name && (
              <p className="mt-2 text-sm text-red-600">
                {formState.errors.last_name.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="phone-number"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Phone Number
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            id="phone-number"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hasad-600 sm:text-sm sm:leading-6"
            placeholder="+213549554612"
            {...register("phone")}
          />
          {formState.errors.phone && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.phone.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hasad-600 sm:text-sm sm:leading-6"
            {...register("email")}
          />
          {formState.errors.email && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hasad-600 sm:text-sm sm:leading-6"
            {...register("password")}
          />
          {formState.errors.password && (
            <p className="mt-2 text-sm text-red-600">
              {formState.errors.password.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full justify-center rounded-md bg-hasad-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hasad-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hasad-600"
        >
          Sign up
        </button>
      </div>
      <div>
        <Link
          href={"/"}
          className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
