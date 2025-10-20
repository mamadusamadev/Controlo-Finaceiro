import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        const updateFieds = []
        const updateValues = []

        Object.keys(updateUserParams).forEach((key) => {
            updateFieds.push(`${key} = $${updateValues.length + 1} `)
            updateValues.push(updateUserParams[key])
        })

        updateValues.push(userId)

        const updateQuery = ` 
        UPDATE users
        SET ${updateFieds.join(', ')}
        WHERE id = $${updateValues.length}
        RETURNING *

        `

        const updateUser = await PostgresHelper.query(updateQuery, updateValues)

        return updateUser[0]
    }
}
