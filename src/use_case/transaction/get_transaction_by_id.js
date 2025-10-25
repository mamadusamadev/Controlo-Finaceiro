export class GetTransactionByIdUseCase {
    constructor(postgresGetTransactionByIdRepository) {
        this.postgresGetTransactionByIdRepository =
            postgresGetTransactionByIdRepository
    }
    async execute(transactionId) {
        const transaction =
            await this.postgresGetTransactionByIdRepository.execute(
                transactionId,
            )
        return transaction
    }
}
