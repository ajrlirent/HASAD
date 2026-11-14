"use client"
import Link from "next/link";

export default function Page() {

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome to HASAD&apos;s Admin Panel
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <div>
              <Link
                href={"/signin"}
                className="flex w-full justify-center rounded-md bg-hasad-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-hasad-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hasad-600"
              >
                Sign in
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
