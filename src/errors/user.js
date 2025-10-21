export class EmailAllradyExisted extends Error {
    constructor() {
        super('The  provider e-mail is already in use')
        this.name = EmailAllradyExisted
    }
}

export class UserNotFounError extends Error {
    constructor(userId) {
        super(`The user with id: ${userId} Not Found`)
        this.name = UserNotFounError
    }
}
