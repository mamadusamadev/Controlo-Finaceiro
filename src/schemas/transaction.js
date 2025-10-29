import { z } from 'zod'

export const createTransactionSchema = z.object({
    user_id: z.uuid({ message: 'User ID must to be Valid UUID.' }),
    name: z.string().min(1, { message: 'Name is required.' }),
    date: z.coerce.date({ invalid_type_error: 'Date must be a valid date.' }),
    amount: z
        .number({ invalid_type_error: 'Amount must be a number.' })
        .positive({ message: 'Amount must be greater than 0.' })
        .min(1, { message: 'Amount must be greater than 0' })
        .refine(
            (value) => {
                const decimalPlaces = (value.toString().split('.')[1] || '')
                    .length
                return decimalPlaces <= 2 // Retorna true/false
            },
            {
                message: 'The amount must have at most 2 decimal places.',
            },
        ),
    type: z.enum(['EARNING', 'EXPENSE', 'INVESTMENT'], {
        error: 'Type must be one of: EARNING, EXPENSE, INVESTMENT.',
    }),
})
