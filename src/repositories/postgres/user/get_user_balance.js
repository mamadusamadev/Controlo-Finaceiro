import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const totalExpenses = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EXPENSE',
            },
            _sum: {
                amount: true,
            },
        })
        const totalEarnings = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'EARNING',
            },
            _sum: {
                amount: true,
            },
        })
        const tottalInvestments = await prisma.transaction.aggregate({
            where: {
                user_id: userId,
                type: 'INVESTMENT',
            },
            _sum: {
                amount: true,
            },
        })

        const expenses = totalExpenses._sum.amount || 0
        const earnings = totalEarnings._sum.amount || 0
        const investments = tottalInvestments._sum.amount || 0

        const balance = earnings - expenses - investments

        return {
            totalExpenses: expenses,
            totalEarnings: earnings,
            tottalInvestments: investments,
            balance,
        }
    }
}
