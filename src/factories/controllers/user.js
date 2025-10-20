import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
} from '../../controllers/index.js'

import {
    GetUserByIdUseCase,
    DeleteUserUseCase,
    CreateUserUseCase,
    UpdateUserUsecase,
} from '../../use_case/index.js'
import {
    PostgresGetUserByIdRepository,
    PostgresGetUserByEmailRepository,
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/index.js'

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()

    const getUserUseCase = new GetUserByIdUseCase(getUserByIdRepository)

    const getUserByIdController = new GetUserByIdController(getUserUseCase)
    return getUserByIdController
}

export const makeCreateUserController = () => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository()
    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()

    const createUserUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    )
    const createUserController = new CreateUserController(createUserUseCase)
    return createUserController
}

export const makeUpdateUserController = () => {
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()

    const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()

    const updateUserUseCase = new UpdateUserUsecase(
        postgresUpdateUserRepository,
        postgresGetUserByEmailRepository,
    )

    const updateUserController = new UpdateUserController(updateUserUseCase)

    return updateUserController
}

export const makeDeleteUserController = () => {
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

    return deleteUserController
}
