import { prisma } from '../../../../prisma/prisma.js'

export class PostgresUpdateTransactionsRepository {
    async execute(transactionId, updateTransactionParams) {
        const updateTransaction = await prisma.transaction.update({
            where: {
                id: transactionId,
            },
            data: updateTransactionParams,
        })
        return updateTransaction
    }
}
