import { getDeploymentData } from '@/utils/getDeploymentData'
import { initPolkadotJs } from '@/utils/initPolkadotJs'
import { writeContractAddresses } from '@/utils/writeContractAddresses'
import { deployContract } from '@scio-labs/use-inkathon/helpers'

/**
 * Script that deploys the commerce contract and writes its address to a file.
 *
 * Parameters:
 *  - `DIR`: Directory to read contract build artifacts & write addresses to (optional, defaults to `./deployments`)
 *  - `CHAIN`: Chain ID (optional, defaults to `development`)
 *
 * Example usage:
 *  - `pnpm run deploy`
 *  - `CHAIN=alephzero-testnet pnpm run deploy`
 */
const main = async () => {
  const initParams = await initPolkadotJs()
  const { api, chain, account } = initParams

  // Deploy commerce contract
  const { abi, wasm } = await getDeploymentData('commerce')

  const listingTitle = 'Titlee'
  const listingDescription = 'Descriptionn'
  const listingPhoto = 'PhotoURLL'
  const listingPrice = '10000'
  const listingQuantity = '10'
  const listingLocation = 'Locationn'
  const listingServiceType = 'ServiceTypee'

  const commerce = await deployContract(api, account, abi, wasm, 'new', [
    listingTitle,
    listingDescription,
    listingPhoto,
    listingPrice,
    listingQuantity,
    listingLocation,
    listingServiceType,
  ])

  // title: String,
  // description: String,
  // photo: String,
  // price: u128,
  // quantity: u128,
  // location: String,
  // service_type: String,

  // Write contract addresses to `{contract}/{network}.ts` file(s)
  await writeContractAddresses(chain.network, {
    commerce,
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
