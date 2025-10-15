import { GetUserByIdUseCase } from '../use_case/get_user_by_id.js'
import { iternaServerError, notFound } from './helpers.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase()

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )
            if (!user) {
                return notFound({
                    body: 'The User is Not Found',
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
