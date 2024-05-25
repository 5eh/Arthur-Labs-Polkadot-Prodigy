import React, { useState, useEffect, useCallback } from 'react'

import { ContractIds } from '@/deployments/deployments'
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import toast from 'react-hot-toast'

import listings from '../../components/Types/listings'

export default function Listings() {
  const { api } = useInkathon()
  const [listingsData, setListingsData] = useState([])
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Commerce)
  const [messages, setMessages] = useState({
    title: '',
    description: '',
    photo: '',
    price: '',
    location: '',
  })
  const [fetchIsLoading, setFetchIsLoading] = useState(false)

  const fetchData = useCallback(async () => {
    try {
      const fetchedListingsData = await listings()
      setListingsData(fetchedListingsData)
    } catch (e) {
      console.error(e)
    }
  }, [])

  const fetchMessage = useCallback(
    async (messageType, queryMethod) => {
      if (!contract || !api) return

      setFetchIsLoading(true)
      try {
        const result = await contractQuery(api, '', contract, queryMethod)
        const { output, isError, decodedOutput } = decodeOutput(result, contract, queryMethod)
        if (isError) throw new Error(decodedOutput)
        setMessages((prev) => ({ ...prev, [messageType]: output }))
      } catch (e) {
        console.error(e)
        toast.error(`Error while fetching ${messageType}. Try again…`)
        setMessages((prev) => ({ ...prev, [messageType]: '' }))
      } finally {
        setFetchIsLoading(false)
      }
    },
    [contract, api],
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessage('title', 'get_title')
      fetchMessage('description', 'get_description')
      fetchMessage('photo', 'get_photo')
      fetchMessage('price', 'get_price')
      fetchMessage('location', 'get_location')
    }, 1000)

    return () => clearInterval(interval)
  }, [fetchMessage])

  useEffect(() => {
    if (messages.title && messages.description && messages.photo) {
      const newListing = {
        title: messages.title,
        description: messages.description,
        photo: messages.photo,
        price: messages.price,
        location: messages.location,
        contractAddress,
      }
      setListingsData((prevListings) => {
        // Avoid adding duplicate listings
        const isDuplicate = prevListings.some(
          (listing) =>
            listing.title === newListing.title &&
            listing.description === newListing.description &&
            listing.photo === newListing.photo,
        )
        return isDuplicate ? prevListings : [...prevListings, newListing]
      })
    }
  }, [messages, contractAddress])

  return (
    <div className="x-6 mx-auto max-w-7xl md:pt-24 lg:px-8 lg:pt-24">
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        {listingsData.map((listing, index) => (
          <li
            key={index}
            className="col-span-1 flex flex-col divide-y divide-gray-200 border border-gray-200 bg-gray-400/20 text-center shadow"
          >
            <div className="flex flex-1 flex-col p-8">
              <img
                className="mx-auto h-32 w-32 flex-shrink-0 object-cover"
                src={
                  listing.photo ||
                  'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
                }
                alt="Profile"
              />
              <h3 className="mt-6 text-sm font-medium text-gray-300">
                {listing.title || 'Loading...'}
              </h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Description</dt>
                <dd className="text-sm text-gray-400">{listing.description || 'Loading...'}</dd>
                <dt className="sr-only">Role</dt>
                <div className="mt-3">
                  <p className="ml-1 mr-1 inline-flex items-center bg-pink-200/10 px-2 py-1 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-600/20">
                    {listing.price || 'Loading...'} DOT
                  </p>
                  <p className="ml-1 mr-1 inline-flex items-center bg-blue-200/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    {listing.location || 'Austin Texas'}
                  </p>
                </div>
              </dl>
              <div className="mb-2 mt-2 bg-gray-400/20 pb-2 pl-2 pr-2 pt-2 text-primary">
                {listing.contractAddress
                  ? `Contract: ${listing.contractAddress.slice(0, 6)}...${listing.contractAddress.slice(-6)}`
                  : 'Pay with Fiat'}
              </div>
            </div>

            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1 hover:bg-primary/10">
                  <a
                    href={`${listing._id}`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-300"
                  >
                    <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    MESSAGE
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1 hover:bg-primary/10">
                  <a
                    href={`${listing._id}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-300"
                  >
                    PURCHASE
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
