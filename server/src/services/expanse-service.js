const {ExpanseModel} = require('../models');
const AppError = require('../utils/errors/app-errors');
const {StatusCodes} = require('http-status-codes');
async function addExpanse(data) {
    try {
        const exp = await ExpanseModel.create(data);
    return exp;
    } catch (error) {
        console.log(error);
        throw new AppError("Something went wrong in the addExpanse service",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getExpanses() {
    try {
        const exp = await ExpanseModel.find();
        return exp;
    } catch (error) {
        console.log(error);
        throw new AppError("Something went wrong in the getExpanses service",StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function filterExpanses(query) {
    try {
        const filter = {};
        if (query.category) {
            filter.category = query.category;
        }
        if (query.Date) {
            filter.Date = new Date(query.Date);
        }
        const exp = await ExpanseModel.find(filter);
        return exp;
    } catch (error) {
        console.log(error);
        throw new AppError("Something went wrong in the getExpanses service", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getTotalExpenses(start, end) {
    try {
        const filter = {
            Date: {
                $gte: new Date(start),
                $lte: new Date(end)
            }
        };
        console.log(filter);
        const expenses = await ExpanseModel.find(filter);
        return expenses;
    } catch (error) {
        console.log(error);
        throw new AppError("Something went wrong in the getTotalExpenses service", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    addExpanse,
    getExpanses,
    filterExpanses,
    getTotalExpenses
}