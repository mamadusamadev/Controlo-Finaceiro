import { CreateUserUseCase } from '../use_case/create_user.js'
import validator from 'validator'

import { badRequest, created, iternaServerError } from './helpers.js'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            // validar a requesiçao(campos obrigatorios e tamanhos da senha e email)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({
                        message: `Missing param: ${field}`,
                    })
                }
            }

            const passwordIsValed = params.password.length < 6

            if (passwordIsValed) {
                return badRequest({
                    message: `Palavra passe deve ser maior ou igual a 6 caracteres`,
                })
            }

            const emailIsValed = validator.isEmail(params.email)
            const emailPassed = params.email
            if (!emailIsValed) {
                return badRequest({
                    message: `Invalid email ${emailPassed}, please provide a valid one`,
                })
            }

            // chamar use case
            const createUserUseCase = new CreateUserUseCase()
            const createdUser = await createUserUseCase.execute(params)
            // retornar a resposta para usuario (status code)

            return created({
                user: createdUser,
                message: 'user created succesfuly! ',
            })
        } catch (error) {
            console.log(error)

            return iternaServerError({
                message: 'Internal server error',
            })
        }
    }
}
