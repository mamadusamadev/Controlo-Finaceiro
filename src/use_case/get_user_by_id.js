export class GetUserByIdUseCase {
    constructor(postgresGetUserByIdRepository) {
        this.getUserByIdRepository = postgresGetUserByIdRepository
    }
    async execute(userId) {
        // chamar repository

        const user = await this.getUserByIdRepository.execute(userId)
        return user
    }
}
