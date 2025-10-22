import { iternaServerError, badRequest, created } from '../helpers/http.js'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/users.js'
import { validateRequireFile } from '../helpers/validations.js'

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            // Validar campos obrigatórios
            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']

            validateRequireFile(params, requiredFields)

            // Validar user_id
            const userIdIsValid = checkIfIdIsValid(params.user_id)
            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            // Validar date (formato YYYY-MM-DD)
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/
            if (!dateRegex.test(params.date)) {
                return badRequest({
                    message:
                        'The date must be in the format YYYY-MM-DD (e.g., 2025-10-22).',
                })
            }

            // Validar se é uma data válida
            const date = new Date(params.date)
            if (isNaN(date.getTime())) {
                return badRequest({
                    message: 'The date is invalid.',
                })
            }

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
            const decimalPlaces = (amount.toString().split('.')[1] || '').length
            if (decimalPlaces > 2) {
                return badRequest({
                    message: 'The amount must have at most 2 decimal places.',
                })
            }

            // Validar type
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

            // Criar transação com dados validados
            const transactionParams = {
                ...params,
                amount: amount,
                type: type,
            }

            const transaction =
                await this.createTransactionUseCase.execute(transactionParams)

            return created({
                transaction: transaction,
                message: 'Transaction created successfully!',
            })
        } catch (error) {
            console.error('Error in CreateTransactionController:', error)
            return iternaServerError()
        }
    }
}
