import validator from 'validator'

import { badRequest, created, iternaServerError } from '../helpers/http.js'

import { invalidPasswordResponse } from '../helpers/index.js'
import { EmailAllradyExisted } from '../../errors/index.js'
import { validateRequireFile } from '../helpers/validations.js'

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }
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

            // chamar funçao que valida os campos

            validateRequireFile(params, requiredFields)

            const passwordIsNotValed = params.password.length < 6

            if (passwordIsNotValed) {
                invalidPasswordResponse()
            }

            const emailIsValed = validator.isEmail(params.email)
            const emailPassed = params.email
            if (!emailIsValed) {
                return badRequest({
                    message: `Invalid email ${emailPassed}, please provide a valid one`,
                })
            }

            // chamar use case

            const createdUser = await this.createUserUseCase.execute(params)
            // retornar a resposta para usuario (status code)

            return created({
                user: createdUser,
                message: 'user created succesfuly! ',
            })
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
