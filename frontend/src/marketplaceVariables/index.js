// -------------------------------------------------------------------------------------
// SELF NOTES:
// 1. EACH MARKETPLACE CATEGORY (COMMERCE, SERVICES, DELIVERIES) WILL NEED ITS OWN LOGIC
// ... add more here
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
// IGNORE THIS CODE:
import dotenv from 'dotenv'

dotenv.config()
// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// CONFIGURATION FILE:

// Marketplace Variables
export const MARKETPLACE_TYPE = 'CLOTHES' // Type of Marketplace
export const MARKETPLACE_NAME = 'CLODA DOT' // Name of Marketplace
export const COMPANY = 'POLKADOT & ARTHUR LABS' // Name of Marketplace company
export const MARKETPLACE_HEADER = 'The Polkadot Clothes Marketplace' // Short header of company, used in Title and Header
export const MARKETPLACE_SERVICE_PROVIDER = 'clothes dealer' // Singular service provider type
export const MARKETPLACE_SERVICE_PROVIDERS = 'clothes' // Multiple service provider type
export const MARKETPLACE_TEMPLATE_TYPE = 'commerce' // commerce, services, deliveries (READ: USE ONE OF THE THREE SELECTED. THESE WILL CUSTOMIZE USER INPUTS)
export const MARKETPLACE_DESCRIPTION =
  'We connect you with the greatest clothes sellers and distributors in the world!' // Description of Marketplace

// Index Page
export const INDEX_HEADING = 'Welcome to the Clothes Dealer!'
export const INDEX_SUBHEADING = 'Buy and sell clothes with ease!'
export const INDEX_STATS = [
  { label: `Unique ${MARKETPLACE_SERVICE_PROVIDERS} listings`, value: '275' },
  { label: 'Different services available', value: '30+' },
  { label: 'Monthly transaction revenue', value: '250k' },
  { label: `Paid out to ${MARKETPLACE_SERVICE_PROVIDERS}`, value: '$7M' },
]

// Transaction Costs
export const SALE_PERCENTAGE_CHARGE = 0.025 // Format it as 0.025 (2.5%)
export const LOCAL_TAX_RATE = 0.0825 // Format it as 0.0825 (AUstin tax rate is 8.25%)

// Currency
export const CURRENCY = 'USD' // Used for currency formatting
export const CURRENCY_SYMBOL = '$' // Used for currency formatting

// Date Format
export const DATE_FORMAT = 'MM/DD/YY' // Used for date formatting

// Database Format
export const MONGODB_USER = 'watsonlr'
export const MONGODB_PASS = 'test'
export const MONGODB_ACCOUNTS_DATABASE = 'Accounts'
export const MONGODB_ACCOUNTS_COLLECTION = 'Accounts_001'
export const MONGODB_LISTINGS_DATABASE = 'Listings'
export const MONGODB_LISTINGS_COLLECTION = 'Listings_001'
export const MONGODB_REVIEWS_DATABASE = 'Reviews'
export const MONGODB_REVIEWS_COLLECTION = 'Reviews_001'
export const MONGODB_MESSAGES_DATABASE = 'Messages'
export const MONGODB_MESSAGES_COLLECTION = 'Messages_001'

export const dbConnect = process.env.MONGODB_URI

// Blockchain Format

// IMPORTANT - IF WEB3_FUNCTIONALITY is set to true, then go to `marketplaceVariables` in Hardhat and add contract logic
export const WEB3_FUNCTIONALITY = true // True or False (True adds details and Web3 functionality to the marketplace)
export const WEB3_CONTRACT_TYPE = 'Commerce' // Commerce, Services, Deliveries (READ: USE ONE OF THE THREE SELECTED. THESE ARE CUSTOM CONTRACTS FOR YOUR MARKETPLACE.)
export const WEB3_BLOCKCHAIN = 'Polkadot'
export const WEB3_NETWORK = 'Kusama'
export const WEB3_CONTRACT_ADDRESS = '0x0'
export const WEB3_CONTRACT_ABI = '0x0'
export const WEB3_CONTRACT_NAME = '0x0'

// -------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------
// SOCIAL MEDIA HANDLES:

// Media Variables (Do not share whole link otherwise errors occur)
export const TWITTER_HANDLE = 'https://twitter.com/locale' // Company Twitter Profile
export const FACEBOOK_HANDLE = 'https://facebook.com/locale' // Company Facebook Profile
export const INSTAGRAM_HANDLE = 'https://instagram.com/locale' // Company Instagram Profile
export const LINKEDIN_HANDLE = 'https://linkedin.com/in/locale' // Company LinkedIn Profile
// 13 more...

// Leave blank not required
