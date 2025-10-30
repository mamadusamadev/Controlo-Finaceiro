import { UserNotFounError } from '../../errors/user.js'
import { iternaServerError, ok } from '../helpers/http.js'

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase, getUserByIdUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase
        this.getUserByIdUseCase = getUserByIdUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const user = await this.getUserByIdUseCase.execute(userId)

            if (!userId) {
                throw new UserNotFounError(userId)
            }

            if (!user) {
                throw new UserNotFounError(userId)
            }

            const results = await this.getUserBalanceUseCase.execute(userId)

            return ok(results)
        } catch (error) {
            console.error(error)

            return iternaServerError()
        }
    }
}
