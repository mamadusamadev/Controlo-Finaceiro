import { badRequest } from './http.js'

export const validateRequireFile = (params, requiredFields) => {
    // Validar campos obrigatórios

    for (const field of requiredFields) {
        if (!params[field]) {
            return badRequest({
                message: `Missing param: ${field}`,
            })
        }

        if (
            typeof params[field] === 'string' &&
            params[field].trim().length === 0
        ) {
            return badRequest({
                message: `Missing param: ${field}`,
            })
        }
    }
}
