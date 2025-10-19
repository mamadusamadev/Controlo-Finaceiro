import validator from 'validator'
import { badRequest, iternaServerError, notFound } from './helpers/http.js'
import { EmailAllradyExisted } from '../errors/user.js'

import { UpdateUserUsecase } from '../use_case/update_user.js'

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const updateUserParams = httpRequest.body
            const userId = httpRequest.params.userId

            if (!userId) {
                return notFound({
                    message: 'The User is Not Found',
                })
            }

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some Provide Field is not allowed ',
                })
            }

            const hasEmptyAllowedField = Object.keys(updateUserParams).some(
                (field) =>
                    allowedFields.includes(field) &&
                    updateUserParams[field] === '',
            )

            if (hasEmptyAllowedField) {
                return badRequest({
                    message: 'Some provided field is empty',
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

            const updateUserUseCase = new UpdateUserUsecase()

            const updateUser = await updateUserUseCase.execute(
                userId,
                updateUserParams,
            )
            return {
                statusCode: 200,
                body: updateUser,
            }
        } catch (error) {
            if (error instanceof EmailAllradyExisted) {
                return badRequest({ message: error.message })
            }
            console.log(error)
            return iternaServerError({
                message: 'Internal server error',
            })
        }
    }
}
