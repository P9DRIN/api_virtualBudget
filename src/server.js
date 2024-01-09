
import express from 'express'

import db from './database.js'
import cors from 'cors'
import routes from './routes.js'

const app = express();

// const port = 3333

app.use(cors());
app.use(express.json())
db.connect()
app.use(routes)


// app.listen(port, () => {console.log(`🚀 Backend started at http://localhost:${port} `)})