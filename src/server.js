
import express from 'express'

import db from './database.js'
import cors from 'cors'
import routes from './routes.js'

// import * as dotenv from 'dotenv'

// dotenv.config({ path: './.env.local'})

const app = express();

// const port = (process.env.PORT)

app.use(cors());
app.use(express.json())
db.connect()
app.use(routes)


// app.listen(port, () => {console.log(`🚀 Backend started at http://localhost:${port} `)})