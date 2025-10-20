import { iternaServerError, notFound } from './helpers/http.js'

export class GetUserByIdController {
    // injetando a dependencia (passando a classe como parametro ao invez de importar)
    constructor(getUserByIdUseCase) {
        this.getuserByIdController = getUserByIdUseCase
    }
    async execute(httpRequest) {
        try {
            const user = await this.getuserByIdController.execute(
                httpRequest.params.userId,
            )
            if (!user) {
                return notFound({
                    message: 'The User is Not Found',
                })
            }
            return {
                statusCode: 200,
                body: user,
            }
        } catch (error) {
            console.log(error)
            return iternaServerError()
        }
    }
}
