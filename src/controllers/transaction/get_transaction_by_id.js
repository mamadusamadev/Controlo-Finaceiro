import {
    notFound,
    TransactionNotFounError,
    transactionNotFoundResponse,
    iternaServerError,
} from '../helpers/index.js'

export class GetTransactionByIdController {
    constructor(getTransactionByIdUseCase) {
        this.getTransactionByIdUseCase = getTransactionByIdUseCase
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId
            const transaction =
                await this.getTransactionByIdUseCase.execute(transactionId)
            if (!transaction) {
                return notFound({
                    message: 'The Transaction is Not Found',
                })
            }
            return {
                statusCode: 200,
                body: transaction,
            }
        } catch (error) {
            console.log(error)

            if (error instanceof TransactionNotFounError) {
                return transactionNotFoundResponse()
            }
            return iternaServerError()
        }
    }
}
