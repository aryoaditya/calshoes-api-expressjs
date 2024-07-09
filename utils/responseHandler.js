exports.successResponse = (res, data = null, message = "Success", statusCode = 200) => {
    res.status(statusCode).send({
        success: true,
        message: message,
        data: data
    })
}

exports.serverErrorResponse = (res, message = "Internal Server Error", statusCode = 500) => {
    res.status(statusCode).send({
        success: false,
        message: message
    })
}

exports.clientErrorResponse = (res, message = "Validation Error", statusCode = 400) => {
    res.status(statusCode).send({
        success: false,
        message: message
    })
}

exports.loginResponse = (res, token, message = "Successfully logged in") => {
    res.status(200).send({
        success: true,
        message: message,
        token: token
    })
}
