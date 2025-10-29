import { UserNotFounError } from '../../errors/index.js'
import {
    badRequest,
    iternaServerError,
    isValidUUID,
    ok,
} from '../helpers/index.js'
import { updateTransactionSchema } from '../../schemas/index.js'
import { ZodError } from 'zod'
export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId
            const params = httpRequest.body

            // verificar se o ID da transação foi fornecido
            if (!transactionId) {
                return badRequest({ message: 'Transaction ID is required' })
            }

            // verificar se id da transaçao é valido
            if (!isValidUUID(transactionId)) {
                return badRequest({ message: 'Invalid Transaction ID' })
            }

            // validar os dados de entrada
            await updateTransactionSchema.parseAsync(params)

            // chamar o Use Case para atualizar a transação
            const transaction = await this.updateTransactionUseCase.execute(
                transactionId,
                params,
            )

            if (!transaction) {
                return badRequest({
                    message: 'Transaction not found',
                })
            }

            return ok(transaction)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }
            if (error instanceof UserNotFounError) {
                return badRequest({ message: error.message })
            }

            console.log(error)
            return iternaServerError({
                message: 'Internal server error',
            })
        }
    }
}
