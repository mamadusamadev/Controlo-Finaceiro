import {
    CreateTransactionController,
    UpdateTransactionController,
} from '../../controllers/index.js'

import {
    CreateTransactionUseCase,
    GetTransactionsByUserIdUseCase,
    UpdateTransactionUseCase,
} from '../../use_case/index.js'

import {
    PostgresGetUserByIdRepository,
    PostgresGetTransactionByUserIdRepository,
    PostgresCreateTransactionRepository,
    PostgresUpdateTransactionsRepository,
} from '../../repositories/index.js'
import { GetTransactionsByUserIdController } from '../../controllers/transaction/get_transaction_by_user_id.js'

export const makeCreateTransactionController = () => {
    const postgresCreateTransactionRepository =
        new PostgresCreateTransactionRepository()

    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository(
        postgresCreateTransactionRepository,
    )

    const createTransactionUseCase = new CreateTransactionUseCase(
        postgresCreateTransactionRepository,
        postgresGetUserByIdRepository,
    )
    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}

export const makeGetTransactionByUserIdController = () => {
    const postgresGetTransactionByUserIdRepository =
        new PostgresGetTransactionByUserIdRepository()
    const postgresGetUserByIdRepository = new PostgresGetUserByIdRepository()

    const getTransactionByUserIdUseCase = new GetTransactionsByUserIdUseCase(
        postgresGetTransactionByUserIdRepository,
        postgresGetUserByIdRepository,
    )

    const getTransactionsByUserIdController =
        new GetTransactionsByUserIdController(getTransactionByUserIdUseCase)

    return getTransactionsByUserIdController
}

export const makeUpdateTransactionController = () => {
    const postgresUpdateTransactionsRepository =
        new PostgresUpdateTransactionsRepository()

    const updateTransactionUseCase = new UpdateTransactionUseCase(
        postgresUpdateTransactionsRepository,
    )

    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    )

    return updateTransactionController
}
