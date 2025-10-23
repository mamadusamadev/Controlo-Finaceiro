import { userNotFoundResponse } from '../../controllers/helpers/users'

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
            return userNotFoundResponse()
        }

        const transaction = await this.postgresGetTransactionByUserId.execute(
            params.userId,
        )
        return transaction
    }
}
