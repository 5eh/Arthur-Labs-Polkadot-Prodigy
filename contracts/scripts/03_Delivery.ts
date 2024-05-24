import { getDeploymentData } from '@/utils/getDeploymentData'
import { initPolkadotJs } from '@/utils/initPolkadotJs'
import { writeContractAddresses } from '@/utils/writeContractAddresses'
import { deployContract } from '@scio-labs/use-inkathon/helpers'

const main = async () => {
  const initParams = await initPolkadotJs()
  const { api, chain, account } = initParams

  // Deploy package delivery contract
  const { abi, wasm } = await getDeploymentData('package_delivery')

  const pickupLocation = '4444 4th Street, Austin, TX 78701'
  const dropoffLocation = '3134 E 12th St, Austin, TX 78702'
  const compensation = '1000' // in DOT
  const productDescription = 'Pink Polkadot Dress'

  const delivery = await deployContract(api, account, abi, wasm, 'new', [
    pickupLocation,
    dropoffLocation,
    compensation,
    productDescription,
  ])

  // pickup_location: String,
  // dropoff_location: String,
  // compensation: u128,
  // product_description: String,

  // Write contract addresses to `{contract}/{network}.ts` file(s)
  await writeContractAddresses(chain.network, {
    delivery,
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
