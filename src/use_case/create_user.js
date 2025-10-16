import { v4 as uuidv4 } from 'uuid'
import { PostgresCreateUserRepository } from '../repositories/postgres/create_user.js'
import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get_user_by_email.js'
import { EmailAllradyExisted } from '../errors/user.js'

export class CreateUserUseCase {
    async execute(CreateUserParams) {
        //verifica se o email já está em uso
        const postgresgetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const userWithProvidEmail =
            await postgresgetUserByEmailRepository.execute(
                CreateUserParams.email,
            )

        if (userWithProvidEmail) {
            throw new EmailAllradyExisted()
        }

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
