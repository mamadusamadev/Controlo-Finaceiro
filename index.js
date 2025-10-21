import 'dotenv/config.js'

import express from 'express'
import {
    makeGetUserByIdController,
    makeCreateUserController,
    makeUpdateUserController,
    makeDeleteUserController,
} from './src/factories/controllers/user.js'

const app = express()
app.use(express.json())

app.post('/api/users', async (request, response) => {
    const createUserController = makeCreateUserController()

    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = makeGetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(request)
    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = makeUpdateUserController()

    const { statusCode, body } = await updateUserController.execute(request)
    response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (req, res) => {
    // Controller
    const deleteUserController = makeDeleteUserController()

    // Executar
    const { statusCode, body } = await deleteUserController.execute(req)
    res.status(statusCode).send(body)
})

// The transactions endpoint

app.listen(process.env.PORT, () =>
    console.log(`Server is runing in port ${process.env.PORT}`),
)
