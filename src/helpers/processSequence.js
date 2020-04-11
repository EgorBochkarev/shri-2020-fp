/**
 * @file Домашка по FP ч. 2
 * 
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 * 
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 * 
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import { compose, tap , pipe, ifElse, length, flip, curry, __, modulo } from 'ramda'
import { validate, isValid, getValue, getErrorMsg } from './stringValidator';

const api = new Api();

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
    const log = tap(writeLog);

    //Api functions
    const formDec2binPayload = (number) => {
        return {
            from: 10,
            to: 2,
            number
        }
    }
    const dec2bin = compose(api.get('https://api.tech/numbers/base'), formDec2binPayload)
    const getAnimal = (id) => api.get(`https://animals.tech/${id}`, {});
    const getResult = ({result}) => result;


    const operateWithNumber = pipe(
        Number.parseFloat,
        Math.floor,
        log,
        dec2bin
    )

    const qrt = curry(flip(Math.pow))(2);

    pipe(
        log,
        validate,
        ifElse(
            isValid,
            compose(operateWithNumber, getValue),
            compose((error) => Promise.reject(error), getErrorMsg)
        )
    )(value).then(
        pipe(
            getResult,
            log,
            String,
            length,
            log,
            qrt,
            log,
            modulo(__, 3),
            log,
            getAnimal
        )
    ).then(
        pipe(
            getResult,
            handleSuccess
        )
    ).catch(handleError);
}

export default processSequence;
