import { UserNotFounError } from '../../errors/index.js'
import { v4 as uuidv4 } from 'uuid'

export class CreateTransactionUseCase {
    constructor(
        postgresCreateTransactionRepository,
        postgresGetUserByIdRepository,
    ) {
        this.postgresCreateTransactionRepository =
            postgresCreateTransactionRepository
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
    }

    async execute(createTransactionParams) {
        // Pegar user_id
        const userId = createTransactionParams.user_id

        const user = await this.postgresGetUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFounError(userId)
        }

        // Gerar id de transactionId
        const transactionId = uuidv4()

        // Criar objeto da transação
        const transaction = {
            ...createTransactionParams,
            id: transactionId,
        }

        // Inserir transactionId no banco
        const createdTransaction =
            await this.postgresCreateTransactionRepository.execute(transaction)

        return createdTransaction
    }
}
