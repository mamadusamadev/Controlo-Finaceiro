import { iternaServerError, badRequest, created } from '../helpers/http'
import { checkIfIdIsValid, invalidIdResponse } from '../helpers/users'
import validator from 'validator'
export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            // validar a requesiçao(campos obrigatorios e tamanhos da senha e email)
            const requiredFields = ['user_id', 'name', 'date', 'amount', 'type']

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({
                        message: `Missing param: ${field}`,
                    })
                }
            }

            const userIdIsValid = checkIfIdIsValid(params.user.id)

            if (!userIdIsValid) {
                return invalidIdResponse()
            }

            if (params.amount < 0) {
                return badRequest({
                    message: 'The amount mast to be greater than 0.',
                })
            }

            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_decimal: false,
                    decimal_separator: '.',
                },
            )

            if (!amountIsValid) {
                return badRequest({
                    message: 'The amount must to be a valid currency.',
                })
            }

            const type = params.type.trim().toUperCase()

            const typeValid = !['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type,
            )

            if (!typeValid) {
                return badRequest({
                    message:
                        'The  transaction type must to be "EARNING", "EXPENSE", or "INVESTMENT"',
                })
            }

            const transaction =
                await this.createTransactionUseCase.execute(params)
            return created({
                transactions: transaction,
                message: 'Transaction created succesfuly! ',
            })
        } catch (error) {
            console.error(error)
            return iternaServerError()
        }
    }
}
