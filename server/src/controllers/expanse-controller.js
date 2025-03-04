const { StatusCodes } = require('http-status-codes');
const { ExpanseService } = require('../services');
const {ErrorResponse,SuccessResponse}= require('../utils/common');

async function createExpanses(req, res) {
    try {
        const expanse = await ExpanseService.addExpanse({
            amount: req.body.amount,
            category: req.body.category,
            Date: req.body.Date,
            Description: req.body.Description,
        });
        console.log(expanse);
        SuccessResponse.data = expanse
        return res.status(StatusCodes.CREATED).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}

async function getExpanses(req, res) {
    try {
        const expanse = await ExpanseService.getExpanses();
        SuccessResponse.data = expanse
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}

async function filterExpanses(req, res) {
    try {
        const expanse = await ExpanseService.filterExpanses(req.query);
        SuccessResponse.data = expanse
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse)
    }
}

async function getTotalExpenses(req, res) {
    try {
        console.log(req.query);
        const { start, end } = req.query;
        const total = await ExpanseService.getTotalExpenses(start, end);
       
        SuccessResponse.data = total ;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
module.exports = {  
    createExpanses,
    getExpanses,
filterExpanses,
getTotalExpenses
}