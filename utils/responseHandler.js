// utils/responseHandler.js

exports.responseSuccessHandler = (res, data, message = "Success") => {
    res.status(200).send({
        success: true,
        message: message,
        data: data
    })
}

exports.responseErrorHandler = (res, statusCode = 500, message = "Internal Server Error") => {
    res.status(statusCode).send({
        success: false,
        message: message
    })
}

exports.responseNotFoundHandler = (res, message = "Not Found") => {
    res.status(404).send({
        success: false,
        message: message
    })
}

exports.responseValidationErrorHandler = (res, message = "Validation Error") => {
    res.status(400).send({
        success: false,
        message: message
    })
}
