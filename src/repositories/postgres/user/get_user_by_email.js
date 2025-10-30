import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserByEmailRepository {
    async execute(email) {
        console.log('🔍 Email recebido:', email)
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        })
        return user
    }
}
