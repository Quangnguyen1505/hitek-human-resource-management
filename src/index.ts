import app from './app'
import globalConfig from './config/global.config'
const PORT = globalConfig.port

app.listen(PORT, () => {
  console.log(`Server running is port ${PORT}`)
})
