import { getDeploymentData } from '@/utils/getDeploymentData'
import { initPolkadotJs } from '@/utils/initPolkadotJs'
import { writeContractAddresses } from '@/utils/writeContractAddresses'
import { deployContract } from '@scio-labs/use-inkathon/helpers'

const main = async () => {
  const initParams = await initPolkadotJs()
  const { api, chain, account } = initParams

  // Deploy commerce contract
  const { abi, wasm } = await getDeploymentData('service')

  const listingTitle = 'Polkadot DOT Heavy Blend Hoodie Sweatshirt | Crypto'
  const listingDescription =
    'This heavy blend hooded sweatshirt is relaxation itself. Made with a thick blend of cotton and polyester, it feels plush, soft and warm, a perfect choice for any cold day. '
  const listingPhoto = 'https://i.ebayimg.com/images/g/~FAAAOSwy8xlP6TQ/s-l1600.webp'
  const listingPrice = '7'
  const listingQuantity = '100'
  const listingLocation = 'Austin Texas'
  const listingServiceType = 'Luxury'

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
    service,
  })
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
