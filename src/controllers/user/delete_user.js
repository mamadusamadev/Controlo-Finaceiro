import { iternaServerError, notFound, noContent } from '../helpers/http.js'

export class DeleteUserController {
    constructor(deleteUserUseCase, getUserByIdUseCase) {
        this.deleteUserUseCase = deleteUserUseCase
        this.getUserByIdUseCase = getUserByIdUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            // Verifica se o userId foi fornecido
            if (!userId) {
                return notFound({
                    message: 'User ID is required',
                })
            }

            // Verifica se o usuário existe ANTES de tentar deletar
            const user = await this.getUserByIdUseCase.execute(userId)

            if (!user) {
                return notFound({
                    message: 'The User is Not Found',
                })
            }

            // Se o usuário existe, deleta
            await this.deleteUserUseCase.execute(userId)

            // Retorna sucesso (204 No Content não deve ter body)
            return noContent()
        } catch (error) {
            console.log(error)
            return iternaServerError()
        }
    }
}
