import { prisma } from '../../../../prisma/prisma.js'
export class PostgresDeleteTransactionRepository {
    async execute(transactionId) {
        const deleteTransaction = await prisma.transaction.delete({
            where: {
                id: transactionId,
            },
        })
        return deleteTransaction
    }
}
