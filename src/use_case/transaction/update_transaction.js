export class UpdateTransactionUseCase {
    constructor(postgresUpdateTransactionsRepository) {
        this.postgresUpdateTransactionsRepository =
            postgresUpdateTransactionsRepository
    }
    async execute(transactionId, params) {
        // chamar o repositorio de update transaction
        const transaction =
            await this.postgresUpdateTransactionsRepository.execute(
                transactionId,
                params,
            )

        return transaction
    }
}
