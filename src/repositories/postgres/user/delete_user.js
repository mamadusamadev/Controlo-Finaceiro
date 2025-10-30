import { prisma } from '../../../../prisma/prisma.js'
export class PostgresDeleteUserRepository {
    async execute(userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        })

        return user
    }
}
