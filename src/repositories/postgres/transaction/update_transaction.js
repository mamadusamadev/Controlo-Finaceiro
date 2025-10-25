import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresUpdateTransactionsRepository {
    async execute(userId, updateTransactionParams) {
        const updateFieds = []
        const updateValues = []

        Object.keys(updateTransactionParams).forEach((key) => {
            updateFieds.push(`${key} = $${updateValues.length + 1} `)
            updateValues.push(updateTransactionParams[key])
        })

        updateValues.push(userId)

        const updateQuery = ` 
        UPDATE transactions
        SET ${updateFieds.join(', ')}
        WHERE id = $${updateValues.length}
        RETURNING *

        `

        const updateTransaction = await PostgresHelper.query(
            updateQuery,
            updateValues,
        )

        return updateTransaction[0]
    }
}
