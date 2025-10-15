export const badRequest = (body) => {
    return {
        statusCode: 400,
        body,
    }
}

export const created = (body) => {
    return {
        statusCode: 201,
        body,
    }
}

export const iternaServerError = (body) => {
    return {
        statusCode: 500,
        body,
    }
}

export const notFound = (body) => {
    return {
        statusCode: 404,
        body,
    }
}
