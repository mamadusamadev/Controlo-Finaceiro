import 'dotenv/config.js'

import express from 'express'
import { CreateUserController } from './src/controllers/create_user.js'
import { GetUserByIdController } from './src/controllers/get_user_by_id.js'
import { UpdateUserController } from './src/controllers/update_user.js'

const app = express()
app.use(express.json())

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()
    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = new GetUserByIdController()
    const { statusCode, body } = await getUserByIdController.execute(request)
    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = new UpdateUserController()
    const { statusCode, body } = await updateUserController.execute(request)
    response.status(statusCode).send(body)
})

app.listen(process.env.PORT, () =>
    console.log(`Server is runing in port ${process.env.PORT}`),
)
