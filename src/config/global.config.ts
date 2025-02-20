import * as dotenv from 'dotenv'

dotenv.config()

const { DEV_PORT, DB_HOST, DB_PORT, MONGO_USER, MONGO_PASSWORD, MONGO_DB, DATABASE_URL } = process.env

interface ConfigDev {
  port: number
  dbHost: string
  dbPort: number
  mongoUser: string
  mongoPassword: string
  nameDb: string
  dbUrl: string
}

const config: ConfigDev = {
  port: Number(DEV_PORT) || 4200,
  dbHost: DB_HOST || 'localhost',
  dbPort: Number(DB_PORT) || 5432,
  mongoUser: MONGO_USER || 'user',
  mongoPassword: MONGO_PASSWORD || 'password',
  nameDb: MONGO_DB || 'hitek',
  dbUrl: DATABASE_URL || 'url://'
}

export default config
