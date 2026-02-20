import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import lettersRouter from './routes/letters.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/letters', lettersRouter)

app.use(express.static(join(__dirname, '../client/dist')))

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../client/dist/index.html'))
})

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})