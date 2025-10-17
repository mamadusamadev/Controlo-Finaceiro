import { PostgresHelper } from '../../db/postgres/helper'

export class DeleteUserRepository {
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
