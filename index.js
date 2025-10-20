import 'dotenv/config.js'

import express from 'express'
import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
} from './src/controllers/index.js'

import {
    GetUserByIdUseCase,
    DeleteUserUseCase,
    CreateUserUseCase,
} from './src/use_case/index.js'
import {
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
    PostgresDeleteUserRepository,
    PostgresCreateUserRepository,
} from './src/repositories/index.js'

const app = express()
app.use(express.json())

app.post('/api/users', async (request, response) => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository()
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()

    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    )

    const createUserController = new CreateUserController(createUserUseCase)
    const { statusCode, body } = await createUserController.execute(request)

    response.status(statusCode).send(body)
})

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserUseCase)

    const { statusCode, body } = await getUserByIdController.execute(request)
    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = new UpdateUserController()
    const { statusCode, body } = await updateUserController.execute(request)
    response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (req, res) => {
    // Repositórios
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository()
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository() // ← Adicionar

    // Use Cases
    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgresGetUserByIdRepository,
    ) // ← Passar repositório
    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    )

    // Controller
    const deleteUserController = new DeleteUserController(
        deleteUserUseCase,
        getUserByIdUseCase,
    )

    // Executar
    const { statusCode, body } = await deleteUserController.execute(req)
    res.status(statusCode).send(body)
})
app.listen(process.env.PORT, () =>
    console.log(`Server is runing in port ${process.env.PORT}`),
)
