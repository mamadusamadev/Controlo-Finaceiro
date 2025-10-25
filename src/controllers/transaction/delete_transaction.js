import { notFound, noContent, iternaServerError } from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(deleteTransactionUseCase, getTransactionByIdUseCase) {
        this.deleteTransactionUseCase = deleteTransactionUseCase
        this.getTransactionByIdUseCase = getTransactionByIdUseCase
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId
            // Verifica se o transactionId foi fornecido
            if (!transactionId) {
                return notFound({
                    message: 'Transaction ID is required',
                })
            }
            // Verifica se a transação existe ANTES de tentar deletar
            const transaction =
                await this.getTransactionByIdUseCase.execute(transactionId)
            if (!transaction) {
                return notFound({
                    message: 'The Transaction is Not Found',
                })
            }
            // Se a transação existe, deleta
            await this.deleteTransactionUseCase.execute(transactionId)
            // Retorna sucesso (204 No Content não deve ter body)

            return noContent()
        } catch (error) {
            console.log(error)
            return iternaServerError()
        }
    }
}
