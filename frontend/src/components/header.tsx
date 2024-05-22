'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { MARKETPLACE_NAME, MARKETPLACE_HEADER } from '@/marketplaceVariables/index'

import LOGO from './favicon.png'
import { ConnectButton } from './web3/connect-button'

type HeaderMenuLink = {
  label: string
  href: string
  icon?: React.ReactNode
}

export const menuLinks: HeaderMenuLink[] = []

export const Header = () => {
  return (
    <div className="navbar static top-0 z-20 mb-2 mt-2 flex min-h-0 flex-shrink-0 justify-between px-0 shadow-md shadow-primary sm:px-2">
      <div className="navbar-start w-1/2">
        <Link href="/" passHref className="ml-4 mr-6 flex shrink-0 items-center gap-2">
          <div className="relative flex h-12 w-12 rounded bg-black">
            <Image alt={`${MARKETPLACE_NAME} LOGO`} className="cursor-pointer" fill src={LOGO} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">{MARKETPLACE_NAME}</span>
            <span className="text-xs">{MARKETPLACE_HEADER}</span>
          </div>
        </Link>
      </div>
      <div className="navbar-end flex flex-grow gap-3 pb-2">
        <ConnectButton />
      </div>
    </div>
  )
}
