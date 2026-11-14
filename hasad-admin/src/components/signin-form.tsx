import { SignInSchema } from "@/lib/validations/auth";
import { SignInInput } from "@/types/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSignIn } from "@/hooks/use-signin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useCreateSession } from "@/hooks/use-create-session";
import { onError } from "@/lib/utils";

export default function SignInForm() {
  const { handleSubmit, register, formState, reset } = useForm<SignInInput>({
    resolver: zodResolver(SignInSchema),
  });

  const mutation = useSignIn();

  const createSessionMutation = useCreateSession();

  const router = useRouter();

  function onSubmit(data: SignInInput) {
    mutation.mutate(data, {
      onError: (error) => onError(error),
      onSuccess: async (data) => {
        reset();
        createSessionMutation.mutate(
          {
            id: data.data.user.id,
            access_token: data.data.access_token,
          },
          {
            onError: (error) => onError(error),
            onSuccess: () => {
              toast.success("User signed in successfully!");
              router.push("/dashboard");
            },
          }
        );
      },
    });
  }

  const isPending = formState.isSubmitting || mutation.isPending;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            required
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
            required
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
          disabled={isPending}
          type="submit"
          className="flex w-full justify-center rounded-md bg-hasad-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hasad-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hasad-600"
        >
          Sign in
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
