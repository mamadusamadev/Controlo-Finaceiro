import { badRequest } from './http.js'

export const invalidPasswordResponse = () => {
    return badRequest({
        message: `Palavra passe deve ser maior ou igual a 6 caracteres`,
    })
}
