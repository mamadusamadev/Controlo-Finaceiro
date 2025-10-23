import {
    userNotFoundResponse,
    requiredFileIsMissingResponse,
    iternaServerError,
    checkIfIdIsValid,
    invalidIdResponse,
    ok,
} from '../helpers/index.js'

import { UserNotFounError } from '../../errors/index.js'

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase
    }

    async execute(httpResponse) {
        try {
            // verificar se user id for passado como parametro
            const userId = httpResponse.query.userId

            // verificar se o userid é um id valido

            if (!userId) {
                return requiredFileIsMissingResponse('userId')
            }

            const userIdIsValid = checkIfIdIsValid(userId)
            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            // chamar use case

            const transactions =
                await this.getTransactionsByUserIdUseCase.execute({
                    userId,
                })

            return ok(transactions)
        } catch (error) {
            console.error(error)
            if (error instanceof UserNotFounError) {
                return userNotFoundResponse()
            }
            return iternaServerError()
        }
    }
}
