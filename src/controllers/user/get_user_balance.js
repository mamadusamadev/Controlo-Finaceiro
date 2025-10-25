import { iternaServerError, ok } from '../helpers/http.js'
import { UserNotFounError } from '../../errors/user.js'

export class GetUserBalanceController {
    constructor(getUserBalanceUseCase) {
        this.getUserBalanceUseCase = getUserBalanceUseCase
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            if (!userId) {
                return UserNotFounError(userId)
            }
            const balance = await this.getUserBalanceUseCase.execute(userId)

            return ok({ balance })
        } catch (error) {
            console.error(error)

            return iternaServerError()
        }
    }
}
