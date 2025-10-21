import { badRequest } from './http.js'
import validator from 'validator'
export const invalidPasswordResponse = () => {
    return badRequest({
        message: `Palavra passe deve ser maior ou igual a 6 caracteres`,
    })
}

export const checkIfIdIsValid = (id) => validator.isUUID(id)

export const invalidIdResponse = () => {
    badRequest({
        message: 'The provided id Is not valid',
    })
}
