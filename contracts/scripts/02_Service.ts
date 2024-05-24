import { getDeploymentData } from '@/utils/getDeploymentData'
import { initPolkadotJs } from '@/utils/initPolkadotJs'
import { writeContractAddresses } from '@/utils/writeContractAddresses'
import { deployContract } from '@scio-labs/use-inkathon/helpers'

const main = async () => {
  const initParams = await initPolkadotJs()
  const { api, chain, account } = initParams

  // Deploy service contract
  const { abi, wasm } = await getDeploymentData('service')

  const title = 'Task Service'
  const description = 'Description of the task service'
  const photo = 'https://example.com/photo.jpg'
  const price = '100000' // Ensure this is a string that can be converted to u128
  const quantity = '10'
  const location = 'New York, USA'
  const serviceType = 'Service Type'
  const termsAndConditions = 'Terms and conditions text'
  const requirements = 'Requirements text'
  const completionDate = '2024-12-31'

  const service = await deployContract(api, account, abi, wasm, 'new', [
    title,
    description,
    photo,
    price,
    quantity,
    location,
    serviceType,
    termsAndConditions,
    requirements,
    completionDate,
  ])

  // Write contract addresses to `{contract}/{network}.ts` file(s)
  await writeContractAddresses(chain.network, {
    service,
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
