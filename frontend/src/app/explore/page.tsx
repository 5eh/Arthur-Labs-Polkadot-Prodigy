'use client'

import { useEffect } from 'react'

import { useInkathon } from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'

import FormDisplay from '@/app/components/formInput'
import { ConnectButton } from '@/components/web3/connect-button'

export default function HomePage() {
  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      <ConnectButton />
      <FormDisplay />
    </>
  )
}
