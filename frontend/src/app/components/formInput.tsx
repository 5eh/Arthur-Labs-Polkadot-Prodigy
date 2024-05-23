import React, { useState, useEffect } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import { DollarSign } from 'lucide-react'
import toast from 'react-hot-toast'

export default function FormDisplay() {
  const { api } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Commerce)
  const [titleMessage, setTitleMessage] = useState<string>('')
  const [descriptionMessage, setDescriptionMessage] = useState<string>('')
  const [photoURL, setPhotoURL] = useState<string>('')
  const [priceMessage, setPriceMessage] = useState<string>('')
  const [locationMessage, setLocationMessage] = useState<string>('')
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>(false)

  const fetchTitle = async () => {
    if (!contract || !api) return

    setFetchIsLoading(true)
    try {
      const result = await contractQuery(api, '', contract, 'get_title')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'get_title')
      if (isError) throw new Error(decodedOutput)
      setTitleMessage(output)
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching title. Try again…')
      setTitleMessage('')
    } finally {
      setFetchIsLoading(false)
      console.log('Commerce message:', titleMessage)
    }
  }

  const fetchDescription = async () => {
    if (!contract || !api) return

    setFetchIsLoading(true)
    try {
      const result = await contractQuery(api, '', contract, 'get_description')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'get_description')
      if (isError) throw new Error(decodedOutput)
      setDescriptionMessage(output)
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching description. Try again…')
      setDescriptionMessage('')
    } finally {
      setFetchIsLoading(false)
      console.log('Greeter description:', descriptionMessage)
    }
  }

  const fetchPhoto = async () => {
    if (!contract || !api) return

    setFetchIsLoading(true)
    try {
      const result = await contractQuery(api, '', contract, 'get_photo')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'get_photo')
      if (isError) throw new Error(decodedOutput)
      setPhotoURL(output)
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching photo URL. Try again…')
      setPhotoURL('')
    } finally {
      setFetchIsLoading(false)
      console.log('Greeter Photo:', photoURL)
    }
  }

  const fetchPrice = async () => {
    if (!contract || !api) return

    setFetchIsLoading(true)
    try {
      const result = await contractQuery(api, '', contract, 'get_price')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'get_price')
      if (isError) throw new Error(decodedOutput)
      setPriceMessage(output)
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching price. Try again…')
      setPriceMessage('')
    } finally {
      setFetchIsLoading(false)
      console.log('Price:', priceMessage)
    }
  }

  const fetchLocation = async () => {
    if (!contract || !api) return

    setFetchIsLoading(true)
    try {
      const result = await contractQuery(api, '', contract, 'get_location')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'get_location')
      if (isError) throw new Error(decodedOutput)
      setLocationMessage(output)
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching photo URL. Try again…')
      setLocationMessage('')
    } finally {
      setFetchIsLoading(false)
      console.log('Location message:', locationMessage)
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!titleMessage || !descriptionMessage || !photoURL) {
        fetchTitle()
        fetchDescription()
        fetchPhoto()
        fetchPrice()
        fetchLocation()
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [api, contract, titleMessage, descriptionMessage, photoURL])

  return (
    <div className="x-6 mx-auto  max-w-7xl md:pt-24 lg:px-8 lg:pt-24">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <li className="col-span-1 flex flex-col divide-y divide-gray-200  border border-gray-200 bg-gray-400/20 text-center shadow">
          <div className="flex flex-1 flex-col p-8">
            <img
              className="mx-auto h-32 w-32 flex-shrink-0 object-cover"
              src={
                photoURL ||
                'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
              }
              alt="Profile"
            />
            <h3 className="mt-6 text-sm font-medium text-gray-300">
              {titleMessage || 'Loading...'}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Description</dt>
              <dd className="text-sm text-gray-400">{descriptionMessage || 'Loading...'}</dd>
              <dt className="sr-only">Role</dt>
              <div className="mt-3">
                <p className="ml-1 mr-1 inline-flex items-center bg-pink-200/10 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-600/20">
                  {priceMessage || 'Loading...'} DOT
                </p>
                <p className="ml-1 mr-1 inline-flex items-center bg-blue-200/10  px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  {locationMessage || 'Loading...'}
                </p>
              </div>
            </dl>
            <div className="mb-2 mt-2 bg-gray-400/20 pb-2 pl-2 pr-2 pt-2 text-primary">
              Contract:{' '}
              <span className="text-gray-300">
                {contractAddress
                  ? `${contractAddress.slice(0, 6)}...${contractAddress.slice(-6)}`
                  : 'Loading...'}
              </span>
            </div>
          </div>

          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1 hover:bg-primary/10">
                <a
                  href={`mailto:${contractAddress}`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-300"
                >
                  <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  MESSAGE
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1 hover:bg-primary/10">
                <a
                  href={`tel:${contractAddress}`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-300"
                >
                  PURCHASE
                </a>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}
