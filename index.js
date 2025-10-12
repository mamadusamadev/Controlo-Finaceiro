import 'dotenv/config.js'

import express from 'express'
import { PostgresHelper } from './src/db/postgres/helper.js'

const app = express()

app.get('/', async (req, res) => {
    const reults = await PostgresHelper.query('SELECT * FROM users;')

    res.send(JSON.stringify(reults))
})

app.listen(3000, () => console.log('Server is runing in port 3000'))
