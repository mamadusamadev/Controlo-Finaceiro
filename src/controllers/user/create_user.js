import { ZodError } from 'zod'
import { badRequest, created, iternaServerError } from '../helpers/http.js'
import { EmailAllradyExisted } from '../../errors/index.js'
import { createUserShema } from '../../schemas/index.js'
export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body

            await createUserShema.parseAsync(params)

            const createdUser = await this.createUserUseCase.execute(params)

            return created({
                user: createdUser,
                message: 'User created successfully!',
            })
        } catch (error) {
            console.log('Error caught:', error)

            if (error instanceof ZodError) {
                return badRequest({
                    message: error.issues[0].message,
                })
            }

            if (error instanceof EmailAllradyExisted) {
                return badRequest({ message: error.message })
            }

            return iternaServerError({
                message: 'Internal server error',
            })
        }
    }
}
