export class TransactionNotFounError extends Error {
    constructor(transactionId) {
        super(`The transaction with id: ${transactionId} Not Found`)
        this.name = TransactionNotFounError
    }
}

export const transactionNotFoundResponse = () => {
    return {
        statusCode: 404,
        body: {
            message: 'The Transaction is Not Found',
        },
    }
}
