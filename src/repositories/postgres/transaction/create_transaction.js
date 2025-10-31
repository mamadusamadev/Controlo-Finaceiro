import { prisma } from '../../../../prisma/prisma.js'

export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        const createTransaction = await prisma.transaction.create({
            data: {
                id: createTransactionParams,
            },
        })
        return createTransaction
    }
}
