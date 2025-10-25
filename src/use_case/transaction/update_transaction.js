import { UserNotFounError } from '../../errors/index.js'

export class UpdateTransactionUseCase {
    constructor(
        postgresUpdateTransactionsRepository,
        postgresGetUserByIdRepository,
    ) {
        this.postgresUpdateTransactionsRepository =
            postgresUpdateTransactionsRepository
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
    }
    async execute(params) {
        // pegar o user pelo id
        const user = await this.postgresGetUserByIdRepository.execute(
            params.userId,
        )

        if (!user) {
            throw new UserNotFounError()
        }

        // chamar o repositorio de update transaction
        const transaction =
            await this.postgresUpdateTransactionsRepository.execute(params)

        return transaction
    }
}
