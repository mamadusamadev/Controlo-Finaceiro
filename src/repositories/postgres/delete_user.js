import { PostgresHelper } from '../../db/postgres/helper.js'

export class PostgresDeleteUserRepository {
    async execute(userId) {
        const deleteUser = await PostgresHelper.query(
            `
            DELETE FROM users 
            WHERE id = $1
            RETURNING *
            
            `,
            [userId],
        )

        deleteUser[0]
    }
}
