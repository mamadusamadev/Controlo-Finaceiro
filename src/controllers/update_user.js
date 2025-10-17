import { badRequest, iternaServerError } from './helpers'
import validator from 'validator'
import { EmailAllradyExisted } from '../errors/user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const updateUserParams = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            if (!someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some Provide Field is not allowed ',
                })
            }

            if (updateUserParams.password) {
                const passwordIsNotValed = updateUserParams.password.length < 6

                if (passwordIsNotValed) {
                    return badRequest({
                        message: `Palavra passe deve ser maior ou igual a 6 caracteres`,
                    })
                }
            }

            if (updateUserParams.email) {
                const emailIsValed = validator.isEmail(updateUserParams.email)
                const emailPassed = updateUserParams.email
                if (!emailIsValed) {
                    return badRequest({
                        message: `Invalid email ${emailPassed}, please provide a valid one`,
                    })
                }
            }
        } catch (error) {
            if (error instanceof EmailAllradyExisted) {
                return badRequest({ message: error.message })
            }

            return iternaServerError({
                message: 'Internal server error',
            })
        }
    }
}
