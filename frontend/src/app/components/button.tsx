import { useEffect, useState } from 'react'

import { ContractIds } from '@/deployments/deployments'
import _default from '@polkadot/types/interfaces/engine/definitions'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import toast from 'react-hot-toast'

export default function Button() {
  const { api } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Commerce)
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>(false)
  const [titleMessage, setTitleMessage] = useState<string>()
  const [descriptionMessage, setDescriptionMessage] = useState<string>()

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
      setTitleMessage(undefined)
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
      toast.error('Error while fetching title. Try again…')
      setDescriptionMessage(undefined)
    } finally {
      setFetchIsLoading(false)
      console.log('Commerce description:', descriptionMessage)
    }
  }

  useEffect(() => {
    fetchTitle()
  }, [])
  useEffect(() => {
    fetchDescription()
  }, [])

  return (
    <div className="w-full justify-center gap-4">
      <button
        className="bg-red-300/20"
        onClick={async () => await fetchTitle()}
        disabled={fetchIsLoading}
      >
        {fetchIsLoading ? 'Loading...' : 'Get Title'}
      </button>

      <button
        className="bg-red-300/20"
        onClick={async () => await fetchDescription()}
        disabled={fetchIsLoading}
      >
        {fetchIsLoading ? 'Loading...' : 'Get Description'}
      </button>
    </div>
  )
}
