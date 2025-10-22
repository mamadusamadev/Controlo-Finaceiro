import { CreateTransactionController } from '../../controllers/index.js'

import { CreateTransactionUseCase } from '../../use_case/transaction/create_transaction.js'
import { PostgresCreateTransactionRepository } from '../../repositories/postgres/transaction/create_transaction.js'
import { PostgresGetUserByIdRepository } from '../../repositories/index.js'

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
