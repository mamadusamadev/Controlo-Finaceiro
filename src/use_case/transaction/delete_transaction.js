export class DeleteTransactionUseCase {
    constructor(postgresDeleteTransactionRepository) {
        this.postgresDeleteTransactionRepository =
            postgresDeleteTransactionRepository
    }
    async execute(transactionId) {
        const deletedTransaction =
            await this.postgresDeleteTransactionRepository.execute(
                transactionId,
            )
        return deletedTransaction
    }
}
