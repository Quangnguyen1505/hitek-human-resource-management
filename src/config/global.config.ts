import * as dotenv from 'dotenv'

dotenv.config()

const { DEV_PORT, DB_HOST, DB_PORT, MONGO_DB, DB_AUTH } = process.env

interface Config {
  port: number
  dbHost: string
  dbPort: number
  nameDb: string
  auth: string
}

const config: Config = {
  port: Number(DEV_PORT) || 3000,
  dbHost: DB_HOST || 'localhost',
  dbPort: Number(DB_PORT) || 27017,
  nameDb: MONGO_DB || 'hitek',
  auth: DB_AUTH || 'admin'
}

export default config
