'use client'

import { useEffect } from 'react'

import { useInkathon } from '@scio-labs/use-inkathon'
import { toast } from 'react-hot-toast'

import Button from '@/app/components/button'
import { ConnectButton } from '@/components/web3/connect-button'

import FormDisplay from './components/formInput'

export default function HomePage() {
  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  return (
    <>
      <ConnectButton />
      <Button />
      <FormDisplay />
    </>
  )
}
