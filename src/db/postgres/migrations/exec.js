import 'dotenv/config.js'
import fs from 'fs'
import { pool } from '../helper.js'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const execMigrations = async () => {
    const client = await pool.connect()

    try {
        const files = fs
            .readdirSync(__dirname)
            .filter((file) => file.endsWith('.sql'))

        for (const file of files) {
            const filePath = path.join(__dirname, file)
            const script = fs.readFileSync(filePath, 'utf-8')

            await client.query(script)
            console.log(`Executed migration for file: ${file}`)
        }

        console.log('migrations was execcuted successfull')
    } catch (error) {
        console.log(error)
    } finally {
        await client.release()
    }
}
execMigrations()
