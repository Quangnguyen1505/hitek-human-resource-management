import mongoose from 'mongoose'
import configGlobal from '~/config/global.config'

const DATABASE_URL = configGlobal.dbUrl as string

console.log(DATABASE_URL)

class Database {
  private static instance: Database

  private constructor() {
    this.connect()
  }

  private connect(): void {
    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose
      .connect(DATABASE_URL)
      .then(() => {
        console.log('Connected to MongoDB successfully!')
      })
      .catch((error) => {
        console.error('MongoDB connection failed: ', error)
      })
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()

export default instanceMongodb
