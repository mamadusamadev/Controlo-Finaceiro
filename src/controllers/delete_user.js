import { GetUserByIdUseCase, DeleteUserUseCase } from '../use_case/index.js'

import { iternaServerError, notFound, noContent } from './helpers/http.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const deleteUserUseCase = new DeleteUserUseCase()
            const getUserByIdUseCase = new GetUserByIdUseCase()

            const userId = httpRequest.params.userId // ← pega o ID

            const user = await getUserByIdUseCase.execute(userId)

            if (!user || !userId) {
                return notFound({
                    message: 'The User is Not Found',
                })
            }

            const userDeleted = await deleteUserUseCase.execute(userId) // ← passa o ID, não user
            if (!userDeleted) {
                return notFound({
                    message: 'The User is Not Found',
                })
            }
            return noContent({
                body: {
                    message: 'Usuario Deletado com sucesso!',
                    userDeleted,
                },
            })
        } catch (error) {
            console.log(error)
            return iternaServerError()
        }
    }
}
