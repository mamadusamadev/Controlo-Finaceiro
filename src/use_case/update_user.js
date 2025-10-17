import bcrypt from 'bcrypt'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get_user_by_email.js'
import { EmailAllradyExisted } from '../errors/user.js'

import { PostgresUpdateUserRepository } from '../repositories/postgres/udate_user.js'

export class UpdateUserUsecase {
    async execute(userId, updateUserParams) {
        // se o email estiver sendo atualizado, verifica se ele está sendo em uso.

        const postgresgetUserByEmailRepository =
            new PostgresGetUserByEmailRepository()

        const userWithProvidEmail =
            await postgresgetUserByEmailRepository.execute(
                updateUserParams.email,
            )

        if (userWithProvidEmail && userWithProvidEmail.id !== userId) {
            throw new EmailAllradyExisted()
        }

        const user = {
            ...updateUserParams,
        }

        // se a senha estiver sendo atualiazado criptografá-la
        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }

        // chamar repository para atualizar usuario
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
        const updateUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        )
        return updateUser
    }
}
