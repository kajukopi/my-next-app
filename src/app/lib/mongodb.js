import mongoose from "mongoose"

const MONGO_URI = process.env.DATABASE_URL

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URI environment variable inside .env.local")
}

let cachedClient = global.mongoose

if (!cachedClient) {
  cachedClient = global.mongoose = {conn: null, promise: null}
}

async function connectToDatabase() {
  if (cachedClient.conn) {
    return cachedClient.conn
  }

  if (!cachedClient.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cachedClient.promise = mongoose.connect(MONGO_URI, opts).then((client) => {
      return client
    })
  }

  cachedClient.conn = await cachedClient.promise
  return cachedClient.conn
}

export default connectToDatabase
