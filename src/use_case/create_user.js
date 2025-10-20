import { v4 as uuidv4 } from 'uuid'

import bcrypt from 'bcrypt'

import { EmailAllradyExisted } from '../errors/user.js'

export class CreateUserUseCase {
    constructor(
        postgresCreateUserRepository,
        postgresGetUserByEmailRepository,
    ) {
        this.postgresCreateUserRepository = postgresCreateUserRepository
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository
    }

    async execute(CreateUserParams) {
        //verifica se o email já está em uso

        const userWithProvidEmail =
            await this.postgresGetUserByEmailRepository.execute(
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

        const createUser = await this.postgresCreateUserRepository.execute(user)
        return createUser
    }
}
