import bcrypt from 'bcrypt'
import { EmailAllradyExisted } from '../../errors/index.js'

export class UpdateUserUsecase {
    constructor(
        postgresUpdateUserRepository,
        postgresGetUserByEmailRepository,
    ) {
        this.postgresUpdateUserRepository = postgresUpdateUserRepository
        this.postgresGetUserByEmailRepository = postgresGetUserByEmailRepository
    }

    async execute(userId, updateUserParams) {
        // Só verifica o email se ele estiver sendo atualizado
        if (updateUserParams.email) {
            const userWithProvidEmail =
                await this.postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidEmail && userWithProvidEmail.id !== userId) {
                throw new EmailAllradyExisted()
            }
        }

        const user = {
            ...updateUserParams,
        }

        // se a senha estiver sendo atualizada, criptografá-la
        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )

            user.password = hashedPassword
        }

        // chamar repository para atualizar usuario
        const updateUser = await this.postgresUpdateUserRepository.execute(
            userId,
            user,
        )
        return updateUser
    }
}
