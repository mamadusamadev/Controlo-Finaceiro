import { z } from 'zod'

export const createUserShema = z.object({
    first_name: z
        .string({
            required_error: 'First name is required',
        })
        .trim()
        .min(1, 'First name is required'),
    last_name: z
        .string({
            required_error: 'Last name is required',
        })
        .trim()
        .min(1, 'Last name is required'),
    email: z.email('Invalid email format').trim(),
    password: z
        .string({ required_error: 'Password is required' })
        .trim()
        .min(6, 'Password must be at least 6 characters long'),
})

export const updateUserSchema = createUserShema.partial().strict({
    message: 'the provided data contains invalid fields',
})
