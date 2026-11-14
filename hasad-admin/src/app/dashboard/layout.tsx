/* eslint-disable @next/next/no-img-element */
"use client"
import { useGetSessionPayload } from "@/hooks/use-get-session-payload"
import { useGetUserById } from "@/hooks/use-get-user-by-id"
import { Fragment, useState } from 'react'
import { Dialog, DialogPanel, Menu, MenuButton, MenuItem, MenuItems, Transition, TransitionChild } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from "next/image"
import Link from "next/link"
import { classNames, modifiedUrl } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Breadcrumbs } from "@/components/breadcrumbs"

const navigation = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Vehicles', href: '/dashboard/vehicles' },
  { name: 'Equipments', href: '/dashboard/equipments' },
  { name: 'Attachments', href: '/dashboard/attachments' },
  { name: 'Users', href: '/dashboard/users' },
  { name: 'Vehicle categories', href: '/dashboard/vehicle-categories' },
  { name: 'Equipment categories', href: '/dashboard/equipment-categories' },
  { name: 'Construction vehicle orders', href: '/dashboard/construction-vehicle-orders' },
  { name: 'Construction equipment orders', href: '/dashboard/construction-equipment-orders' },
  { name: 'Construction attachment orders', href: '/dashboard/construction-attachment-orders' },
  { name: 'Transportation vehicle orders', href: '/dashboard/transportation-vehicle-orders' },
  { name: 'Construction vehicle order matches', href: '/dashboard/construction-vehicle-order-matches' },
  { name: 'Construction equipment order matches', href: '/dashboard/construction-equipment-order-matches' },
  { name: 'Construction attachment order matches', href: '/dashboard/construction-attachment-order-matches' },
  { name: 'Transportation vehicle order matches', href: '/dashboard/transportation-vehicle-order-matches' },

]
const userNavigation = [
  { name: 'Sign out', href: '/signout' },
]

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const query = useGetSessionPayload()
  const payload = query?.data?.payload
  const accessToken = payload?.access_token
  const id = payload?.id

  const userQuery = useGetUserById(id, accessToken)
  const userData = userQuery?.data?.data
  const firstName = userData?.first_name
  const lastName = userData?.last_name
  const profilePicture = userData?.profile_picture

  return (
    <>
      <div>
        <Transition show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <TransitionChild
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </TransitionChild>

            <div className="fixed inset-0 flex">
              <TransitionChild
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <TransitionChild
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </TransitionChild>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-hasad-600 px-6 pb-4">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src={"/hasad-logo.png"}
                        alt="Company logo"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.href === pathname
                                      ? 'bg-hasad-700 text-white'
                                      : 'text-hasad-200 hover:text-white hover:bg-hasad-700',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-hasad-600 px-6 pb-4">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src={"/hasad-logo.png"}
                alt="Company logo"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.href === pathname
                              ? 'bg-hasad-700 text-white'
                              : 'text-hasad-200 hover:text-white hover:bg-hasad-700',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex flex-1 gap-x-4 self-stretch justify-end lg:gap-x-6">
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    {profilePicture ? (
                      <Image
                        className="h-8 w-8 rounded-full bg-gray-50"
                        src={modifiedUrl(profilePicture)}
                        alt=""
                        width={32}
                        height={32}
                      />
                    ) : (
                      <div className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-200"></div>
                    )}
                    <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        {(firstName && lastName) ? `${firstName} ${lastName}` : (<div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 animate-pulse" />)}
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                  </MenuButton>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                          <Link
                            href={item.href}
                            className='block px-3 py-1 text-sm leading-6 text-gray-900'
                          >
                            {item.name}
                          </Link>
                        </MenuItem>
                      ))}
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="mb-5">
                <Breadcrumbs />
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}