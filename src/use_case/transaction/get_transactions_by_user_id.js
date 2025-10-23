import { UserNotFounError } from '../../errors.js'

export class GetTransactionsByUserIdUseCase {
    constructor(postgresGetTransactionByUserId, postgresGetUserByIdRepository) {
        this.postgresGetTransactionByUserId = postgresGetTransactionByUserId
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
    }

    async execute(params) {
        const user = await this.postgresGetUserByIdRepository.execute(
            params.userId,
        )
        if (!user) {
            throw new UserNotFounError(params.userId)
        }

        const transaction = await this.postgresGetTransactionByUserId.execute(
            params.userId,
        )
        return transaction
    }
}
