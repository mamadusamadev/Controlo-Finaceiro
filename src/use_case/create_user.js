import { v4 as uuidv4 } from 'uuid'
import { PostgresCreateUserRepository } from '../repositories/postgres/create_user.js'
import bcrypt from 'bcrypt'

export class CreateUserUseCase {
    async execute(CreateUserParams) {
        // TODO verifica se o email já está em uso

        // gerar id de usuario
        const userId = uuidv4()

        // criptografar senha

        const hashedPassword = await bcrypt.hash(CreateUserParams.password, 10)

        // iserir usuario no banco
        const user = {
            ...CreateUserParams,
            id: userId,
            password: hashedPassword,
        }
        // chamar  Repositorio

        const postgresCreateUserRepository = new PostgresCreateUserRepository()

        const createUser = await postgresCreateUserRepository.execute(user)
        return createUser
    }
}
