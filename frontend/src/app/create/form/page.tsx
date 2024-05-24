'use client'

import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

import { COMPANY, WEB3_FUNCTIONALITY } from '@/marketplaceVariables'
import { PhotoIcon } from '@heroicons/react/20/solid'

import { Upcharge } from '@/components/Types/userListingData'

export default function Form() {
  const searchParams = useSearchParams() || new URLSearchParams()
  const serviceTitle = searchParams.get('title')

  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
      <FormInput serviceTitle={serviceTitle} />
    </div>
  )
}

function FormInput({ serviceTitle }: { serviceTitle: string | null }) {
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [upcharges, setUpcharges] = useState<Upcharge[]>([])
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    photo:
      'https://images.unsplash.com/photo-1560996024-466726bfddaa?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: '',
    includedFeatureOne: '',
    includedFeatureTwo: '',
    serviceType: serviceTitle || 'custom',
    location: '',
  })

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    setIsSubmitting(true)

    const completeData = {
      ...formData,
    }

    console.log('Comepled Listing Data', completeData)
  }

  const mergeLocations = (locations: string[]) => {
    return locations.join(', ')
  }

  const handleLocationChange = (field, value) => {
    if (field === 'city') {
      setCity(value)
      setFormData((prevData) => ({
        ...prevData,
        location: mergeLocations([value, state]),
      }))
    } else if (field === 'state') {
      setState(value)
      setFormData((prevData) => ({
        ...prevData,
        location: mergeLocations([city, value]),
      }))
    }
  }

  const addUpcharge = () => {
    setUpcharges([...upcharges, { upcharge: '', value: '' }])
  }

  const updateUpchargeValue = (index, value, field) => {
    const updatedValue = field === 'value' ? Number(value) : value
    const updatedUpcharges = upcharges.map((item, i) =>
      i === index ? { ...item, [field]: updatedValue } : item,
    )
    setUpcharges(updatedUpcharges)
  }

  const deleteUpcharge = (index: number) => {
    const newUpcharges = [...upcharges]
    newUpcharges.splice(index, 1)
    setUpcharges(newUpcharges)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-white/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                TITLE
              </label>
              <div className="mt-2">
                <input
                  type="title"
                  name="title"
                  id="title"
                  autoComplete="title"
                  className="w-full border-b border-gray-900  bg-gray-500/20 px-3 py-2 text-left text-sm leading-6 text-gray-800 hover:border-primary/60 focus:border-primary/40 focus:bg-gray-700/20 focus:outline-none dark:border-gray-200/20 dark:text-gray-300"
                  placeholder="Elegant Pink Dress with polkadots"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="description" className="block text-sm font-medium leading-6 ">
                DESCRIPTION
              </label>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Write a few sentences about the service you&apos;re providing.
              </p>

              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full border border-gray-200/20 bg-gray-500/20 px-3 py-2 text-left text-sm leading-6 text-gray-800 hover:border-primary/60 focus:border-primary/40 focus:bg-gray-700/20 focus:outline-none dark:text-gray-300"
                placeholder="Super cool information about this elegant, if not enchanting dress."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                PHOTO
              </label>

              <label
                htmlFor="photo"
                className="mt-2 flex cursor-pointer justify-center rounded-lg border border-dashed border-gray-900 px-6 py-10 dark:border-white/25"
              >
                <div className="justify-center text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                  <div className="text-sm leading-6 text-gray-400">
                    <span className="relative font-semibold text-gray-900 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary/40 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-primary dark:text-white">
                      Upload an image file
                    </span>
                    <input id="photo" name="photo" type="file" className="sr-only" />
                    <p>or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </label>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                TOTAL PRICE
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="w-full border-b border-gray-900  bg-gray-500/20 px-3 py-2 text-left text-sm leading-6 text-gray-800 hover:border-primary/60 focus:border-primary/40 focus:bg-gray-700/20 focus:outline-none dark:border-gray-200/20 dark:text-gray-300"
                  placeholder="7.2 DOT"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <span> In DOT </span>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="includedFeatureOne"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                INCLUDED FEATURE 1
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="includedFeatureOne"
                  id="includedFeatureOne"
                  autoComplete="given-name"
                  placeholder="Soft fabric, easy to wash"
                  className="w-full border-b border-gray-900  bg-gray-500/20 px-3 py-2 text-left text-sm leading-6 text-gray-800 hover:border-primary/60 focus:border-primary/40 focus:bg-gray-700/20 focus:outline-none dark:border-gray-200/20 dark:text-gray-300"
                  value={formData.includedFeatureOne}
                  onChange={(e) => setFormData({ ...formData, includedFeatureOne: e.target.value })}
                />
              </div>
            </div>

            <div className="sm:col-span-3"></div>

            <div className="sm:col-span-3">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                INCLUDED FEATURE 2
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="includedFeatureTwo"
                  id="includedFeatureTwo"
                  placeholder="Elegant design, perfect for parties"
                  className="w-full border-b border-gray-900  bg-gray-500/20 px-3 py-2 text-left text-sm leading-6 text-gray-800 hover:border-primary/60 focus:border-primary/40 focus:bg-gray-700/20 focus:outline-none dark:border-gray-200/20 dark:text-gray-300"
                  value={formData.includedFeatureTwo}
                  onChange={(e) => setFormData({ ...formData, includedFeatureTwo: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                CITY
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="Austin"
                  autoComplete="address-level2"
                  className="w-full border-b border-gray-900  bg-gray-500/20 px-3 py-2 text-left text-sm leading-6 text-gray-800 hover:border-primary/60 focus:border-primary/40 focus:bg-gray-700/20 focus:outline-none dark:border-gray-200/20 dark:text-gray-300"
                  value={city}
                  onChange={(e) => handleLocationChange('city', e.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="region"
                className="block text-sm font-medium leading-6 text-gray-900 dark:text-white"
              >
                STATE / PROVINCE
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  placeholder="Texas"
                  className="w-full border-b border-gray-900  bg-gray-500/20 px-3 py-2 text-left text-sm leading-6 text-gray-800 hover:border-primary/60 focus:border-primary/40 focus:bg-gray-700/20 focus:outline-none dark:border-gray-200/20 dark:text-gray-300"
                  value={state}
                  onChange={(e) => handleLocationChange('state', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-x-6">
        {WEB3_FUNCTIONALITY && (
          <button
            type="button"
            onClick={handleSubmit}
            className={`border border-gray-800 bg-gray-400 px-3  py-2  text-right text-sm font-semibold text-black hover:border-primary dark:border-gray-200/20 dark:bg-gray-500/20 dark:text-gray-300 dark:hover:border-primary/60
              ${isSubmitting ? 'bg-gray-700/20' : 'focus:border-primary/40 focus:bg-gray-700/20'}
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
              focus-visible:outline-primary/50`}
          >
            {isSubmitting ? 'LOADING ... ' : 'COMPLETE AND PUBLISH'}
          </button>
        )}
      </div>

      {WEB3_FUNCTIONALITY && (
        <div className="mt-4 text-center uppercase">
          <span className="text-primary">Web3 Disclaimer</span>

          <p className="text-gray-400">
            {COMPANY} is powered and secured by the Polkadot Blockchain. By pressing{' '}
            <span className="text-primary">DEPLOY ON BLOCKCHAIN</span> You understand the risks and
            considerations when publishing information into a public database. The information you
            are providing in the form above will be stored in a public ledger, where anyone has
            access to this information. smart contracts additionally carry risks in the form of
            bugs, hacks, and other vulnerabilities. By pressing{' '}
            <span className="text-primary">DEPLOY ON BLOCKCHAIN</span> you are agreeing to these
            terms and conditions.
          </p>

          <div>
            <span className="text-primary">
              <a href="/blockchain-policy">READ MORE HERE</a>
            </span>
          </div>
        </div>
      )}
    </form>
  )
}
