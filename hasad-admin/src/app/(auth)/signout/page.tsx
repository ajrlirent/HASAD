'use client'
import { useDeleteSession } from "@/hooks/use-delete-session";
import { onError } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Page() {
  const mutation = useDeleteSession();
  const router = useRouter();

  function onSubmit() {
    mutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('You have been signed out');
        router.push('/');
      },
      onError,
    });
  }
  const isPending = mutation.isPending

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign out of your account
        </h2>
        <p className="text-center mt-5">Are you sure you want to sign out?</p>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex gap-2">
          <div className="w-full">
            <button
              onClick={onSubmit}
              type="submit"
              disabled={isPending}
              className="flex w-full justify-center rounded-md bg-hasad-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-hasad-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hasad-600"
            >
              Sign out
            </button>
          </div>
          <div className="w-full">
            <Link
              href={"/"}
              className="flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
