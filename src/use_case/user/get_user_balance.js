export class GetUserBalanceUseCase {
    constructor(postgresGetUserBalanceRepository) {
        this.postgresGetUserBalanceRepository = postgresGetUserBalanceRepository
    }

    async execute(userId) {
        const balance =
            await this.postgresGetUserBalanceRepository.execute(userId)
        return balance
    }
}
