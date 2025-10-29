import { badRequest, iternaServerError, notFound, ok } from '../helpers/http.js'
import { EmailAllradyExisted } from '../../errors/user.js'

import { updateUserSchema } from '../../schemas/index.js'
import { ZodError } from 'zod'
export class UpdateUserController {
    constructor(updateUserUsecase) {
        this.updateUserUseCase = updateUserUsecase
    }

    async execute(httpRequest) {
        try {
            const updateUserParams = httpRequest.body
            const userId = httpRequest.params.userId

            if (!userId) {
                return notFound({
                    message: 'The User is Not Found',
                })
            }
            // validar os dados de entrada usando o zod

            await updateUserSchema.parseAsync(updateUserParams)

            // chamar use case para executar

            const updateUser = await this.updateUserUseCase.execute(
                userId,
                updateUserParams,
            )

            if (!updateUser) {
                return badRequest({
                    message: 'User not found',
                })
            }
            return ok(updateUser)
        } catch (error) {
            if (error instanceof ZodError) {
                // Verificar se o erro é de campo não reconhecido (strict mode)
                const hasUnrecognizedKeys = error.issues.some(
                    (issue) => issue.code === 'unrecognized_keys',
                )

                if (hasUnrecognizedKeys) {
                    return badRequest({
                        message: 'The provided data contains invalid fields',
                    })
                }
                return badRequest({
                    message: error.issues[0].message,
                })
            }
            if (error instanceof EmailAllradyExisted) {
                return badRequest({ message: error.message })
            }
            console.log(error)
            return iternaServerError()
        }
    }
}
