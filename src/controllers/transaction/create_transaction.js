import { ZodError } from 'zod'
import { createTransactionSchema } from '../../schemas/index.js'
import { iternaServerError, created, badRequest } from '../helpers/http.js'
import { UserNotFounError } from '../../errors/index.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createTransactionSchema.parseAsync(params)

            const transaction =
                await this.createTransactionUseCase.execute(params)

            return created({
                transaction: transaction,
                message: 'Transaction created successfully!',
            })
        } catch (error) {
            console.error('Error in CreateTransactionController:', error)
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }
            if (error instanceof UserNotFounError) {
                return badRequest({
                    message: error.message,
                })
            }

            return iternaServerError()
        }
    }
}
