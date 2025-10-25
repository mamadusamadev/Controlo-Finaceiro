import { EmailAllradyExisted } from '../../errors/index.js'
import {
    badRequest,
    iternaServerError,
    isValidUUID,
    validateRequireFile,
    ok,
} from '../helpers/index.js'

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

            const allowedFields = ['name', 'date', 'amount', 'type']
            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return validateRequireFile(params, allowedFields)
            }

            const hasEmptyAllowedField = Object.keys(params).some(
                (field) =>
                    allowedFields.includes(field) && params[field] === '',
            )

            if (hasEmptyAllowedField) {
                return badRequest({
                    message: 'Some provided field is empty',
                })
            }

            if (params.amount) {
                // Validar amount
                const amount =
                    typeof params.amount === 'string'
                        ? parseFloat(params.amount)
                        : params.amount

                if (isNaN(amount) || amount <= 0) {
                    return badRequest({
                        message: 'The amount must be greater than 0.',
                    })
                }

                // Validar casas decimais (máximo 2)
                const decimalPlaces = (amount.toString().split('.')[1] || '')
                    .length
                if (decimalPlaces > 2) {
                    return badRequest({
                        message:
                            'The amount must have at most 2 decimal places.',
                    })
                }
            }

            // verificar type
            if (params.type) {
                const type = params.type.trim().toUpperCase()
                const typeValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                    type,
                )
                if (!typeValid) {
                    return badRequest({
                        message:
                            'The transaction type must be "EARNING", "EXPENSE", or "INVESTMENT"',
                    })
                }
            }

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
            if (error instanceof EmailAllradyExisted) {
                return badRequest({ message: error.message })
            }
            console.log(error)
            return iternaServerError({
                message: 'Internal server error',
            })
        }
    }
}
