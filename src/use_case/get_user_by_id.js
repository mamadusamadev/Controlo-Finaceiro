import { PostgresGetUserByIdRepository } from '../repositories/postgres/getuser_by_id.js'

export class GetUserByIdUseCase {
    async execute(userId) {
        // chamar repository

        const getUserByIdRepository = new PostgresGetUserByIdRepository()
        const user = await getUserByIdRepository.execute(userId)
        return user
    }
}
