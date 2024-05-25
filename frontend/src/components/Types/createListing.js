'use server'

import { MongoClient } from 'mongodb'

import {
  MONGODB_LISTINGS_COLLECTION,
  MONGODB_LISTINGS_DATABASE,
} from '../../marketplaceVariables/index'

async function createListing(formData) {
  const uri = process.env.MONGODB_URI
  const dbName = `${MONGODB_LISTINGS_DATABASE}`
  const client = new MongoClient(uri)

  try {
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(`${MONGODB_LISTINGS_COLLECTION}`)
    const result = await collection.insertOne(formData)
    return result.insertedId
  } catch (error) {
    console.error('Error inserting data:', error)
    throw error
  } finally {
    await client.close()
  }
}

export default createListing
