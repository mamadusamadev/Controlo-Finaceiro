import { EmailAllradyExisted } from '../../errors/user.js'
import { v4 as uuidv4 } from 'uuid'
export class CreateTransactionUseCase {
    constructor(createTransactionRepository, getUserByIdRepository) {
        this.createTransactionRepository = createTransactionRepository
        this.getUserByIdRepository = getUserByIdRepository
    }
    async execute(createTRansactionParams) {
        // pegar id
        const userId = createTRansactionParams.userId

        const user = await this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new EmailAllradyExisted()
        }

        // gerar id de transactionId
        const transactionId = uuidv4()

        // iserir transactionId no banco
        const transaction = await this.createTransactionRepository.execute({
            ...createTRansactionParams,
            id: transactionId,
        })
        return transaction
    }
}
