const dotenv = require('dotenv')
const { MongoClient, ServerApiVersion } = require('mongodb')

dotenv.config()

const uri = process.env.MONGODB_URI
if (!uri) {
  throw new Error('MONGODB_URI is not defined in the environment variables')
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    await client.connect()
    await client.db('admin').command({ ping: 1 })
    console.log('Successfully connected to the database')
  } finally {
    await client.close()
  }
}

run().catch(console.dir)
